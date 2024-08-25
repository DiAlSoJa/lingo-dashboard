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
  courseId: z.string().min(1,{
    message: "course is required"
  }),
});
const EditChapter = () => {

  const router = useRouter();
  const { chapterId } = useParams();
  const [courses, setCourses] = useState<{ value: string, label: string }[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      courseId:'',
    },
  });
  

  useEffect(() => {
    if (chapterId) {
      // Cargar los datos del lenguaje si hay un chapterId
      axios.get(`/api/chapter/${chapterId}`).then(response => {
 
        form.reset({
          title: response.data.title,
          courseId: response.data.courseId || '',
          
        });
        setSelectedCourse(response.data.courseId || null);
      }).catch(error => {
        toast.error('Error al cargar el chapter');
        console.error('Error al cargar el chapter:', error);
        router.push("/chapter");
      });
    }
  }, [chapterId, form, router]);

  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const { data } = await axios.get('/api/courses');
        const options = data.map((course: { _id: string, title: string }) => ({
          value: course._id,
          label: course.title,
        }));
        setCourses(options);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error('Failed to load courses');
      }
    };
    fetchcourses();
  }, []);



  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!chapterId) {
      toast.error('Course not found');
      return;
    }

    try {
      await axios.put(`/api/chapter/${chapterId}`, {
        title: data.title,
        courseId: data.courseId,
      });
      toast.success('Word edited successfully');
      router.push('/chapter'); // Redirect to courses page or wherever necessary
    } catch (error) {
      toast.error('Error editing chapter');
      console.error('Error editing chapter:', error);
    }
  };

  const handleCourseChange = (selectedOption: { value: string, label: string } | null) => {
    setSelectedCourse(selectedOption?.value || null);
    form.setValue('courseId', selectedOption?.value || '');
  };


  return (
    <div className=''>
      <Card className='max-w-[500px] mx-auto'>
        <CardHeader>
          <CardTitle>Edit Chapter</CardTitle>
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
                    name="courseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Course</FormLabel>
                        <FormControl>
                          <Select
                            className='basic-single'
                            classNamePrefix='select'
                            options={courses}
                            onChange={handleCourseChange}
                            placeholder="Select course"
                            value={courses.find(option => option.value === field.value)}
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

export default EditChapter;
