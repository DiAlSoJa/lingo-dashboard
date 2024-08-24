import {  NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Word from '@/models/word';
import WordList from '@/models/word-list';


export const GET = async (req: Request, { params }: { params: { wordId: string } }) => {
  try {

    const word = await Word.findById(params.wordId);
    if (!word) {
      return NextResponse.json({ message: 'word not found' }, { status: 404 });
    }
    return NextResponse.json(word);
  } catch (error) {
    return NextResponse.json({ message: "Error getting the word", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { wordId: string } }) => {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    return new NextResponse("No authenticated", { status: 404 });
  }

  try {
    await connectDB();

    const { title, typeId, languageId } = await req.json();

    // Construir el objeto de actualización de manera condicional
    const updateData: any = { title };
    if (typeId) updateData.typeId = typeId;
    if (languageId) updateData.languageId = languageId;

    const updatedWord = await Word.findByIdAndUpdate(params.wordId, updateData, { new: true });

    if (!updatedWord) {
      return NextResponse.json({ message: 'Word no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedWord);
  } catch (error) {
    console.error("Error al actualizar el Word:", error);
    return NextResponse.json({ message: "Error al actualizar el Word", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { wordId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const deletedWord = await Word.findByIdAndDelete(params.wordId);

    if (!deletedWord) {
      return NextResponse.json({ message: 'Word no encontrado' }, { status: 404 });
    }

    await WordList.deleteMany({wordId:deletedWord._id});
    return NextResponse.json({ message: 'Word eliminado con éxito' });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el Word", error }, { status: 500 });
  }
};