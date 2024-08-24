'use client';
import React, { useEffect } from 'react';
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

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Name is required"
  })
});

const EditLanguage = () => {
  const router = useRouter();
  const {lngId} = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  useEffect(() => {
    if (lngId) {
      // Cargar los datos del lenguaje si hay un lngId
      axios.get(`/api/language/${lngId}`).then(response => {
        form.reset({ title: response.data.lng }); // Prellenar el formulario con los datos del lenguaje
      }).catch(error => {
        toast.error('Error al cargar el lenguaje');
        console.error('Error al cargar el lenguaje:', error);
        router.push("/languages");
      });
    }
  }, [lngId, form,router]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!lngId) {
      toast.error('Lenguaje no encontrado');
      return;
    }

    try {
      await axios.put(`/api/language/${lngId}`, { lng: data.title });
      toast.success('Lenguaje editado con éxito');
      router.push('/languages'); // Redirige a la página de lenguajes o donde sea necesario
    } catch (error) {
      toast.error('Hubo un error al editar el lenguaje');
      console.error('Error al editar el lenguaje:', error);
    }
  };

  return (
    <div className=''>
      <Card className='max-w-[500px] mx-auto'>
        <CardHeader>
          <CardTitle>Edit Language</CardTitle>
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