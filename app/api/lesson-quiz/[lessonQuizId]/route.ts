import {  NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import LessonQuiz from '@/models/lesson-quiz';




export const GET = async (req: Request, { params }: { params: { lessonQuizId: string } }) => {
  try {

    const lessonQuiz = await LessonQuiz.findById(params.lessonQuizId);

    if (!lessonQuiz) {
      return NextResponse.json({ message: 'lessonQuiz no encontrado' }, { status: 404 });
    }
    return NextResponse.json(lessonQuiz);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener el lessonQuiz", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { lessonQuizId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const { title,lessonId} = await req.json();
    const updatedlessonQuiz = await LessonQuiz.findByIdAndUpdate(params.lessonQuizId, {title,lessonId}, { new: true });

    if (!updatedlessonQuiz) {
      return NextResponse.json({ message: 'lessonQuiz no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedlessonQuiz);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar el lessonQuiz", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { lessonQuizId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const deletedlessonQuiz = await LessonQuiz.findByIdAndDelete(params.lessonQuizId);

    if (!deletedlessonQuiz) {
      return NextResponse.json({ message: 'lessonQuiz no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'lessonQuiz eliminado con éxito' });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el lessonQuiz", error }, { status: 500 });
  }
};