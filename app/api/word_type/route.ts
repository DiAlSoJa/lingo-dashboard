import { NextRequest, NextResponse } from 'next/server';


import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import WordType from '@/models/word-types';

export const GET = async () => {
  try {
    await connectDB();
    const wordTypes = await WordType.find();
    return NextResponse.json(wordTypes);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los wordType", error }, { status: 500 });
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
    const { name,languageId } = await req.json();
    const newWordType = new WordType({ name,languageId });
    await newWordType.save();
    return NextResponse.json(newWordType, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el wordtype", error }, { status: 500 });
  }
};