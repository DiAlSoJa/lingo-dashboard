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
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  src: z.string().min(1, {
    message: "Image URL is required"
  }),
  imageId: z.string().optional(),
  basePrice: z.number().min(10, {
    message: "Base price must be at least 10"
  }),
});

const EditPlant = () => {
  const router = useRouter();
  const { plantId } = useParams();
  const [uploadedImage, setUploadedImage] = useState<{ secure_url:string | null, public_id: string } | null>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      src: '',
      basePrice: 0,
    },
  });

  useEffect(() => {
    if (plantId) {
      // Cargar los datos de la planta si hay un plantId
      axios.get(`/api/plants/${plantId}`).then(response => {
        const { name, src, imageId, basePrice } = response.data;
        form.reset({ name, src, basePrice });
        if (src && imageId) {
          setUploadedImage({ secure_url: src, public_id: imageId });
        }
      }).catch(error => {
        toast.error('Error al cargar la planta');
        console.error('Error al cargar la planta:', error);
        router.push("/plants");
      });
    }
  }, [plantId, form, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const uploadResponse = await axios.put(`/api/upload/${uploadedImage?.public_id.replace("/", "_")}`, formData, {
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

      form.setValue('src', '');
      form.setValue('imageId', '');
      setUploadedImage((prev:any)=>{
        console.log(prev)
        const {public_id}=prev;
        const newUploaded={
          public_id,
          secure_url:null
        }
        console.log(newUploaded)
        return newUploaded
      });
    }
  };

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Evitar letras en el input del precio
    const value = e.target.value.replace(/\D/g, '');
    form.setValue('basePrice', parseFloat(value || '0'));
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!plantId) {
      toast.error('Planta no encontrada');
      return;
    }

    try {
      await axios.put(`/api/plants/${plantId}`, data);
      toast.success('Planta editada con éxito');
      router.push('/plants');
    } catch (error) {
      toast.error('Hubo un error al editar la planta');
      console.error('Error al editar la planta:', error);
    }
  };

  return (
    <div className=''>
      <Card className='max-w-[500px] mx-auto'>
        <CardHeader>
          <CardTitle>Edit Plant</CardTitle>
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
                render={() => (
                  <FormItem>
                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImageUpload}
                      />
                    </FormControl>
                    {uploadedImage?.secure_url && (
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

export default EditPlant;
