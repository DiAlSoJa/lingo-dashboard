import { NextRequest, NextResponse } from 'next/server';


import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import List from '@/models/list';
import WordList from '@/models/word-list';
import Word from '@/models/word';



export const GET = async () => {
  try {
    await connectDB();
    const lists = await List.find();
    return NextResponse.json(lists);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los Word", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    console.log("Not authenticated");
    return new NextResponse("Not authenticated", { status: 403 });
  }

  try {
    await connectDB();
    const { name, languageId, words = [] } = await req.json();

    const newList = new List({
      name,
      languageId,
    });

    // Guarda el nuevo List primero
    const savedList = await newList.save();

    if (words.length > 0) {
      const listId = savedList._id;

      await Promise.all(
        words.map(async (word: string) => {
          const existWord = await Word.findById(word);
          if (!existWord) {
            console.log(`Word with ID ${word} not found`);
            return;
          }
          const newWordList = new WordList({
            listId,
            wordId: word,
          });
          await newWordList.save();
        })
      );
    }

    return NextResponse.json(savedList, { status: 201 });
  } catch (error) {
    console.error("Error creating list:", error);
    return NextResponse.json({ message: "Error creating the list", error }, { status: 500 });
  }
};