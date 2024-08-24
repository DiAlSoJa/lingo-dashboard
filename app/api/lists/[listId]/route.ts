import {  NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import List from '@/models/list';
import WordList from '@/models/word-list';
import Word from '@/models/word';



export const GET = async (req: Request, { params }: { params: { listId: string } }) => {
  try {

    const list = await List.findById(params.listId);
    if (!list) {
      return NextResponse.json({ message: 'lists not found' }, { status: 404 });
    }
    const wordListExisted = await WordList.find({listId:params.listId}).populate("wordId");

    const wordList = wordListExisted.map(word=>word.wordId._id);
    const response = {
      list,
      wordList
    };
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: "Error getting the List", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { listId: string } }) => {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    return new NextResponse("No authenticated", { status: 404 });
  }

  try {
    await connectDB();

    const { name, languageId, words = []} = await req.json();

    const updatedList = await List.findByIdAndUpdate(params.listId, {name,languageId}, { new: true });

    if (!updatedList) {
      return NextResponse.json({ message: 'Lists no encontrado' }, { status: 404 });
    }


    await WordList.deleteMany({ listId: params.listId });
    if (words.length > 0) {

      await Promise.all(
        words.map(async (word: string) => {
          const existWord = await Word.findById(word);
          if (!existWord) {
            return;
          }
          const newWordList = new WordList({
            listId:params.listId,
            wordId: word,
          });
          await newWordList.save();
        })
      );
    }

    return NextResponse.json(updatedList);
  } catch (error) {
    console.error("Error al actualizar el Lists:", error);
    return NextResponse.json({ message: "Error al actualizar el Lists", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { listId: string } }) => {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    return new NextResponse("Not authenticated", { status: 403 });
  }

  try {
    await connectDB();

    // Eliminar el List
    const deletedList = await List.findByIdAndDelete(params.listId);

    if (!deletedList) {
      return NextResponse.json({ message: 'List not found' }, { status: 404 });
    }

    await WordList.deleteMany({ listId: params.listId });

    return NextResponse.json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error("Error deleting the list:", error);
    return NextResponse.json({ message: "Error deleting the list", error }, { status: 500 });
  }
};