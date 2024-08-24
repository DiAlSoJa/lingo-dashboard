import {  NextResponse } from 'next/server';
import Language from '@/models/language';
import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';

export const GET = async (req: Request, { params }: { params: { lngId: string } }) => {
  try {

    const idioma = await Language.findById(params.lngId);
    if (!idioma) {
      return NextResponse.json({ message: 'Idioma no encontrado' }, { status: 404 });
    }
    return NextResponse.json(idioma);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener el idioma", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { lngId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const { name,locale } = await req.json();
    const updatedIdioma = await Language.findByIdAndUpdate(params.lngId, { name,locale }, { new: true });

    if (!updatedIdioma) {
      return NextResponse.json({ message: 'Idioma no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedIdioma);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar el idioma", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { lngId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const deletedIdioma = await Language.findByIdAndDelete(params.lngId);

    if (!deletedIdioma) {
      return NextResponse.json({ message: 'Idioma no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Idioma eliminado con éxito' });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el idioma", error }, { status: 500 });
  }
};