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
import Select from 'react-select';

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Name is required"
  }),
  courseId: z.string().min(1,{
    message: "course is required"
  }),
});

const CreateCourse = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<{ value: string, label: string }[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      courseId:'',
    },
  });
  

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
    try {
      await axios.post('/api/chapter', {
        title: data.title,
        courseId: data.courseId,
      });
      toast.success('chapter created successfully');
      router.push('/chapter'); // Redirect to the description page or wherever needed
    } catch (error) {
      toast.error('There was an error creating the chapter');
      console.error('Error creating the courses:', error);
    }
  };

  

  const handleCourseChange = (selectedOption: { value: string, label: string } | null) => {
    setSelectedLanguage(selectedOption?.value || null);
    form.setValue('courseId', selectedOption?.value || '');
  };



    return (
      <div className='h-screen flex items-center justify-center flex-col'>
        <div className='max-w-[500px] w-full'>
          
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Create Chapter</CardTitle>
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