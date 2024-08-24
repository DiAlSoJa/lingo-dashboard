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
  }),
  words: z.array(z.string()).optional(),
});

const EditList = () => {
  const router = useRouter();
  const { listId } = useParams(); // Obtenemos el ID de la lista de la URL
  const [languages, setLanguages] = useState([]);
  const [words, setWords] = useState([]);
  const [first,setFirst] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      languageId: '',
      words: [],
    },
  });

  // Fetch languages on component mount
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

  // Fetch list data by listId and pre-fill the form
  useEffect(() => {
    if (listId) {
      axios.get(`/api/lists/${listId}`)
        .then(response => {
          const data = response.data;
          form.reset({
            name: data.list.name,
            languageId: data.list.languageId,
            words:data.wordList

          });
        })
        .catch(error => {
          toast.error('Error loading list');
          console.error('Error loading list:', error);
          router.push("/lists");
        });
    }
  }, [listId, form, router]);

  useEffect(() => {
    const fetchWords = async () => {
      const languageId = form.getValues("languageId");

      if(first && words.length!==0){
        setFirst(false)
      }else if(!first){
        form.setValue("words", []);
      }
      setWords([]); 

      if (!languageId) return;

      try {
        const { data } = await axios.get(`/api/words/language/${languageId}`);
        const options = data.map((word: { _id: string, title: string }) => ({
          value: word._id,
          label: word.title,
        }));
        setWords(options);
      } catch (error) {
        console.error("Error fetching words:", error);
        toast.error('Failed to load words');
      }
    };

    fetchWords();
  }, [form.watch("languageId")]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!listId) {
      toast.error('List not found');
      return;
    }

    try {
      await axios.put(`/api/lists/${listId}`, {
        name: data.name,
        languageId: data.languageId,
        words: data.words, // Send the selected words array
      });
      toast.success('List updated successfully');
      router.push('/lists');
    } catch (error) {
      toast.error('There was an error updating the list');
      console.error('Error updating the list:', error);
    }
  };
  console.log(form.getValues("words"))

  return (
    <div className=''>
      <Card className='max-w-[500px] mx-auto'>
        <CardHeader>
          <CardTitle>Edit List</CardTitle>
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
              {words.length > 0 && (
                <FormField
                  control={form.control}
                  name="words"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Words</FormLabel>
                      <FormControl>
                      <Select
                          className='basic-multi-select'
                          classNamePrefix='select'
                          options={words}
                          isMulti
                          value={words.filter((option:any) =>  field.value?.includes(option.value))}
                          onChange={(options: any) => field.onChange(options.map((option: any) => option.value))}
                          placeholder="Select words"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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

export default EditList;
