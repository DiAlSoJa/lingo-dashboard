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
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  languageId: z.string().min(1, {
    message: "Language is required"
  })
});

const EditWordType = () => {
  const router = useRouter();
  const { wordTypeId } = useParams(); // Obtenemos el ID del tipo de palabra de la URL
  const [languages, setLanguages] = useState([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      languageId: ''
    },
  });

  // Fetch languages and populate the select dropdown
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

  // Fetch the word type to be edited
  useEffect(() => {
    if (wordTypeId) {
      axios.get(`/api/word_type/${wordTypeId}`).then(response => {
        const wordType = response.data;
        form.reset({
          name: wordType.name,
          languageId: wordType.languageId
        });
      }).catch(error => {
        toast.error('Error loading word type');
        console.error('Error loading word type:', error);
        router.push("/word_type");
      });
    }
  }, [wordTypeId, form, router]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!wordTypeId) {
      toast.error('Word type not found');
      return;
    }

    try {
      await axios.put(`/api/word_type/${wordTypeId}`, {
        name: data.name,
        languageId: data.languageId
      });
      toast.success('Word type updated successfully');
      router.push('/word_type');
    } catch (error) {
      toast.error('There was an error updating the word type');
      console.error('Error updating the word type:', error);
    }
  };

  return (
    <div className=''>
      <Card className='max-w-[500px] mx-auto'>
        <CardHeader>
          <CardTitle>Edit Word Type</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name="name"
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
                        onChange={(option: any) => field.onChange(option?.value)}
                        value={languages.find((option:any) => option.value === field.value)}
                        placeholder="Select language"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className='w-full dark:bg-slate-800 dark:text-white'>
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditWordType;