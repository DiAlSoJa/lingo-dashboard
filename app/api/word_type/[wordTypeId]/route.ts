import {  NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import WordType from '@/models/word-types';

export const GET = async (req: Request, { params }: { params: { wordTypeId: string } }) => {
  try {

    const wordType = await WordType.findById(params.wordTypeId);
    if (!wordType) {
      return NextResponse.json({ message: 'WordType not found' }, { status: 404 });
    }
    return NextResponse.json(wordType);
  } catch (error) {
    return NextResponse.json({ message: "Error getting the wordType", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { wordTypeId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const { name,languageId } = await req.json();
    const updatedWordType = await WordType.findByIdAndUpdate(params.wordTypeId, { name,languageId }, { new: true });

    if (!updatedWordType) {
      return NextResponse.json({ message: 'WordType no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedWordType);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar el wordType", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { wordTypeId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const deletedWordType = await WordType.findByIdAndDelete(params.wordTypeId);

    if (!deletedWordType) {
      return NextResponse.json({ message: 'WordType no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'WordType eliminado con éxito' });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el WordType", error }, { status: 500 });
  }
};