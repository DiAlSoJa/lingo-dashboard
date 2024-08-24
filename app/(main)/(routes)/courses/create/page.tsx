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
import { Description } from '@radix-ui/react-dialog';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Name is required"
  }),
  description: z.string().min(1,{
    message: "decription is required"
  }),
  languageId: z.string().min(1,{
    message:"language is required"
  })
});

const CreateCourse = () => {
  const router = useRouter();
  const [languages, setLanguages] = useState<{ value: string, label: string }[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description:'',
      languageId:''
    },
  });
  

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data } = await axios.get('/api/language');
        const options = data.map((language: { _id: string, name: string }) => ({
          value: language._id,
          label: language.name,
        }));
        setLanguages(options);
      } catch (error) {
        console.error("Error fetching languages:", error);
        toast.error('Failed to load languages');
      }
    };
    fetchLanguages();
  }, []);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/courses', {
        title: data.title,
        description: data.description,
        languageId: data.languageId
      });
      toast.success('courses created successfully');
      router.push('/courses'); // Redirect to the description page or wherever needed
    } catch (error) {
      toast.error('There was an error creating the courses');
      console.error('Error creating the courses:', error);
    }
  };

  

  const handleLanguageChange = (selectedOption: { value: string, label: string } | null) => {
    setSelectedLanguage(selectedOption?.value || null);
    form.setValue('languageId', selectedOption?.value || '');
  };



    return (
      <div className='h-screen flex items-center justify-center flex-col'>
        <div className='max-w-[500px] w-full'>
          
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Create courses</CardTitle>
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Name</FormLabel>
                        <FormControl>
                          <Textarea
                            className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                            placeholder='Enter Description'
                            {...field}
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

export default CreateCourse;