'use client';
import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {Download, FileX } from 'lucide-react';
import { ExcelDialog } from '@/components/excel-dialog';
import Select from 'react-select';

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Name is required"
  }),
  typeId: z.string().optional(),
  languageId: z.string().min(1,{
    message:"language is required"
  })
});

const CreateWord = () => {
  const router = useRouter();
  const [languages, setLanguages] = useState<{ value: string, label: string }[]>([]);
  const [types, setTypes] = useState<{ value: string, label: string }[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      typeId:'',
      languageId:''
    },
  });
  
  useEffect(() => {
    // Fetch languages from API
    axios.get('/api/language')
      .then(response => {
        const options = response.data.map((lang: { _id: string, name: string }) => ({
          value: lang._id,
          label: lang.name
        }));
        setLanguages(options);
      })
      .catch(error => {
        console.error('Error fetching languages:', error);
        toast.error('Failed to load languages');
      });
  }, []);
  
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/words', {
        title: data.title,
        typeId: data.typeId,
        languageId: data.languageId
      });
      toast.success('Word created successfully');
      router.push('/words'); // Redirect to the words page or wherever needed
    } catch (error) {
      toast.error('There was an error creating the word');
      console.error('Error creating the word:', error);
    }
  };

  

  const handleLanguageChange = (selectedOption: { value: string, label: string } | null) => {
    setSelectedLanguage(selectedOption?.value || null);
    form.setValue('languageId', selectedOption?.value || '');
  };

  const handleTypeChange = (selectedOption: { value: string, label: string } | null) => {
    form.setValue('typeId', selectedOption?.value || '');
  };

    return (
      <div className='h-screen flex items-center justify-center flex-col'>
        <div className='max-w-[500px] w-full'>
          <div className='w-full mb-3 flex justify-between'>
            <ExcelDialog url='/api/words/excel' />
            <Button variant={"primary"}>
              <Download />
              <span className='ml-3'>Template</span>
            </Button>
          </div>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Create Word</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Name</FormLabel>
                        <FormControl>
                          <Input
                            className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                            placeholder='Enter title'
                            {...field}
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="languageId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Language</FormLabel>
                        <FormControl>
                          <Select
                            className='basic-single'
                            classNamePrefix='select'
                            options={languages}
                            onChange={handleLanguageChange}
                            placeholder="Select language"
                            value={languages.find(option => option.value === field.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {selectedLanguage && (
                    <FormField
                      control={form.control}
                      name="typeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Type</FormLabel>
                          <FormControl>
                            <Select
                              className='basic-single'
                              classNamePrefix='select'
                              options={types}
                              onChange={handleTypeChange}
                              placeholder="Select type"
                              value={types.find(option => option.value === field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <Button type="submit" className='w-full dark:bg-slate-800 dark:text-white'>
                    Create
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
}

export default CreateWord;