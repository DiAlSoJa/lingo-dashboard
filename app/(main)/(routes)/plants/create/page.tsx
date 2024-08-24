'use client';
import React, { useState } from 'react';
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
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  src: z.string().min(1, {
    message: "Image is required"
  }),
  imageId: z.string().optional(),
  basePrice: z.number().min(10, {
    message: "Base price must be at least 10"
  }),
});

const CreateLanguage = () => {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<{ secure_url: string, public_id: string } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      src: '',
      basePrice: 0,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const uploadResponse = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const { secure_url, public_id } = uploadResponse.data;
        setUploadedImage({ secure_url, public_id });
        form.setValue('src', secure_url);
        form.setValue('imageId', public_id);
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error('Image upload failed');
      }
    }
  };

  const handleImageRemove = async () => {
    if (uploadedImage?.public_id) {
      try {
        await axios.delete(`/api/upload/${uploadedImage.public_id.replace("/", "_")}`);
        setUploadedImage(null);
        form.setValue('src', '');
        form.setValue('imageId', '');
        toast.success('Image deleted successfully');
      } catch (error) {
        toast.error('Failed to delete the image');
      }
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/plants', data);
      toast.success('Language created successfully');
      router.push('/plants');
    } catch (error) {
      toast.error('There was an error creating the language');
      console.error('Error creating the language:', error);
    }
  };

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Evitar letras en el input del precio
    const value = e.target.value.replace(/\D/g, '');
    form.setValue('basePrice', parseFloat(value || '0'));
  };

  return (
    <div className=''>
      <Card className='max-w-[500px] mx-auto'>
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
                        placeholder='Enter name'
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
                name="basePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Base Price</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                        placeholder='Enter base price'
                        {...field}
                        type='text'
                        onChange={handlePriceInput}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="src"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          handleImageUpload(e);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    {uploadedImage && (
                      <div className="relative h-[300px] w-[300px] mx-auto">
                        <Image src={uploadedImage.secure_url} alt="Uploaded Image" fill />
                        <button
                          type="button"
                          onClick={handleImageRemove}
                          className="absolute -bottom-6 -right-6 bg-red-500 p-2 hover:scale-95 rounded-full transition-opacity"
                        >
                          <Trash2 className="text-white" />
                        </button>
                      </div>
                    )}
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