'use client';
import React from 'react';
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

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  locale:z.string().min(1,{
    message: "Locale is required"
  })
});

const CreateLanguage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      locale:""
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/language', { name: data.name,locale:data.locale });
      toast.success('Language created successfully');
      router.push('/languages'); // Redirige a la página de idiomas o a donde sea necesario
    } catch (error) {
      toast.error('There was an error creating the language');
      console.error('Error creating the language:', error);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
     <Card className='max-w-[500px] w-full'>
        <CardHeader>
          <CardTitle>Create Language</CardTitle>
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
                        placeholder='Language name'
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
                name="locale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Locale</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                        placeholder='Locale code (e.g., en, es)'
                        {...field}
                        type='text'
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
  );
}

export default CreateLanguage;