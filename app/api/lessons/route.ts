import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Lesson from '@/models/lesson';



export const GET = async () => {
  try {
    await connectDB();
    const lessons = await Lesson.find({});
    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los lessons", error }, { status: 500 });
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
    const { title,chapterId,description } = await req.json();
    const newlesson = new Lesson({ title,chapterId,description });
    await newlesson.save();
    return NextResponse.json(newlesson, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el leson", error }, { status: 500 });
  }
};