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
  chapterId: z.string().min(1,{
    message: "course is required"
  }),
  description: z.string().min(1,{
    message: "course is required"
  }),
});
const EditLesson = () => {

  const router = useRouter();
  const { lessonId } = useParams();
  const [chapters, setChapters] = useState<{ value: string, label: string }[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      chapterId:'',
      description:''
    },
  });
  
  

  useEffect(() => {
    if (lessonId) {
      // Cargar los datos del lenguaje si hay un lessonId
      axios.get(`/api/lessons/${lessonId}`).then(response => {
 
        form.reset({
          title: response.data.title,
          chapterId: response.data.chapterId || '',
          description:response.data.description
          
        });
        setSelectedCourse(response.data.courseId || null);
      }).catch(error => {
        toast.error('Error al cargar el lesson');
        console.error('Error al cargar el lesson:', error);
        router.push("/lessons");
      });
    }
  }, [lessonId, form, router]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const { data } = await axios.get('/api/chapter');
        const options = data.map((course: { _id: string, title: string }) => ({
          value: course._id,
          label: course.title,
        }));
        setChapters(options);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        toast.error('Failed to load chapters');
      }
    };
    fetchChapters();
  }, []);



  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!lessonId) {
      toast.error('Course not found');
      return;
    }

    try {
      await axios.put(`/api/lessons/${lessonId}`, {
        title: data.title,
        chapterId: data.chapterId,
        description:data.description
      });
      toast.success('Word edited successfully');
      router.push('/lessons'); // Redirect to courses page or wherever necessary
    } catch (error) {
      toast.error('Error editing lesson');
      console.error('Error editing lessons:', error);
    }
  };

  const handleChapterChange = (selectedOption: { value: string, label: string } | null) => {
    setSelectedCourse(selectedOption?.value || null);
    form.setValue('chapterId', selectedOption?.value || '');
  };


  return (
    <div className=''>
      <Card className='max-w-[500px] mx-auto'>
        <CardHeader>
          <CardTitle>Edit Lesson</CardTitle>
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
                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                            placeholder='Enter title'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 
              <FormField
                    control={form.control}
                    name="chapterId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Chapter</FormLabel>
                        <FormControl>
                          <Select
                            className='basic-single'
                            classNamePrefix='select'
                            options={chapters}
                            onChange={handleChapterChange}
                            placeholder="Select chapter"
                            value={chapters.find(option => option.value === field.value)}
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

export default EditLesson;
