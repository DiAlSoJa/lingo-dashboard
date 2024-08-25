import {  NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Lesson from '@/models/lesson';


export const GET = async (req: Request, { params }: { params: { lessonId: string } }) => {
  try {

    const lesson = await Lesson.findById(params.lessonId);

    if (!lesson) {
      return NextResponse.json({ message: 'lesson no encontrado' }, { status: 404 });
    }
    return NextResponse.json(lesson);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener el lesson", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { lessonId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const {  title,chapterId,description } = await req.json();
    const updatedlesson = await Lesson.findByIdAndUpdate(params.lessonId, { title,chapterId,description }, { new: true });

    if (!updatedlesson) {
      return NextResponse.json({ message: 'lesson no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedlesson);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar el lesson", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { lessonId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const deletedlesson = await Lesson.findByIdAndDelete(params.lessonId);

    if (!deletedlesson) {
      return NextResponse.json({ message: 'lesson no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'lesson eliminado con éxito' });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el lesson", error }, { status: 500 });
  }
};