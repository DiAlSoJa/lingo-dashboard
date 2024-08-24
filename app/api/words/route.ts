import { NextRequest, NextResponse } from 'next/server';


import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Word from '@/models/word';


export const GET = async () => {
  try {
    await connectDB();
    const Words = await Word.find();
    return NextResponse.json(Words);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los Word", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    console.log("no authenticated")
    return new NextResponse("No authenticated", { status: 404 });
  }

  try {
    await connectDB();
    const { title,typeId,languageId } = await req.json();
    const newWord = new Word({
      title,
      ...(typeId ? { typeId } : {}),  // Include typeId only if it's not empty
      languageId
    });
    
    await newWord.save();
    return NextResponse.json(newWord, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error al crear el Word", error }, { status: 500 });
  }
};