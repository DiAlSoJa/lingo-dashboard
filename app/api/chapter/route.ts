import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Chapter from '@/models/chapter';


export const GET = async () => {
  try {
    await connectDB();
    const chapters = await Chapter.find({});
    return NextResponse.json(chapters);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los chapters", error }, { status: 500 });
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
    const { title,courseId } = await req.json();
    const newChapter = new Chapter({ title,courseId });
    await newChapter.save();
    return NextResponse.json(newChapter, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el Chapter", error }, { status: 500 });
  }
};