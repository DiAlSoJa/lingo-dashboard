'use client';
import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { toast } from 'sonner';
import Select from 'react-select';
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
const EditLanguage = () => {

  const router = useRouter();
  const { courseId } = useParams();
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
    if (courseId) {
      // Cargar los datos del lenguaje si hay un courseId
      axios.get(`/api/courses/${courseId}`).then(response => {
        form.reset({
          title: response.data.title,
          description: response.data.description || '',
          languageId: response.data.languageId || ''
        });
        setSelectedLanguage(response.data.languageId || null);
      }).catch(error => {
        toast.error('Error al cargar el lenguaje');
        console.error('Error al cargar el lenguaje:', error);
        router.push("/courses");
      });
    }
  }, [courseId, form, router]);

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
    if (!courseId) {
      toast.error('Course not found');
      return;
    }

    try {
      await axios.put(`/api/courses/${courseId}`, {
        title: data.title,
        description: data.description,
        languageId: data.languageId
      });
      toast.success('Word edited successfully');
      router.push('/courses'); // Redirect to courses page or wherever necessary
    } catch (error) {
      toast.error('Error editing word');
      console.error('Error editing word:', error);
    }
  };

  const handleLanguageChange = (selectedOption: { value: string, label: string } | null) => {
    setSelectedLanguage(selectedOption?.value || null);
    form.setValue('languageId', selectedOption?.value || '');
  };


  return (
    <div className=''>
      <Card className='max-w-[500px] mx-auto'>
        <CardHeader>
          <CardTitle>Edit Course</CardTitle>
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
                Edit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditLanguage;
