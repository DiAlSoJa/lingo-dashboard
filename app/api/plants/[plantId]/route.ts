import {  NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Plant from '@/models/plant';
import cloudinary from '@/lib/cloudinary';



export const GET = async (req: Request, { params }: { params: { plantId: string } }) => {
  try {

    const plant = await Plant.findById(params.plantId);
    if (!plant) {
      return NextResponse.json({ message: 'plant not found' }, { status: 404 });
    }
    return NextResponse.json(plant);
  } catch (error) {
    return NextResponse.json({ message: "Error getting the plant", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { plantId: string } }) => {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    return new NextResponse("No authenticated", { status: 404 });
  }

  try {
    await connectDB();

    const {name,basePrice,src,imageId} = await req.json();


    const updatedplant = await Plant.findByIdAndUpdate(params.plantId, {name,basePrice,src,imageId}, { new: true });

    if (!updatedplant) {
      return NextResponse.json({ message: 'plant no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedplant);
  } catch (error) {
    console.error("Error al actualizar el plant:", error);
    return NextResponse.json({ message: "Error al actualizar el plant", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { plantId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const deletedplant = await Plant.findByIdAndDelete(params.plantId);

    if (!deletedplant) {
      return NextResponse.json({ message: 'plant no encontrado' }, { status: 404 });
    }
    const result = await cloudinary.uploader.destroy(deletedplant.imageId.replace("_","/"));
    
    return NextResponse.json({ message: 'plant eliminado con éxito' });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el plant", error }, { status: 500 });
  }
};