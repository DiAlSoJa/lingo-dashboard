import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import LessonQuiz from '@/models/lesson-quiz';



export const GET = async () => {
  try {
    await connectDB();
    const lessonQuizzes = await LessonQuiz.find({});
    return NextResponse.json(lessonQuizzes);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los lessonQuizzes", error }, { status: 500 });
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
    const { title,lessonId } = await req.json();
    const newLQ = new LessonQuiz({ title,lessonId });
    await newLQ.save();
    return NextResponse.json(newLQ, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el Chapter", error }, { status: 500 });
  }
};