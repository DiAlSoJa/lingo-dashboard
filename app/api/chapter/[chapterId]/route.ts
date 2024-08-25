import {  NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Chapter from '@/models/chapter';


export const GET = async (req: Request, { params }: { params: { chapterId: string } }) => {
  try {

    const chapter = await Chapter.findById(params.chapterId);

    if (!chapter) {
      return NextResponse.json({ message: 'Chapter no encontrado' }, { status: 404 });
    }
    return NextResponse.json(chapter);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener el Chapter", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { chapterId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const { title,courseId } = await req.json();
    const updatedChapter = await Chapter.findByIdAndUpdate(params.chapterId, {title,courseId }, { new: true });

    if (!updatedChapter) {
      return NextResponse.json({ message: 'Chapter no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedChapter);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar el Chapter", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { chapterId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const deletedChapter = await Chapter.findByIdAndDelete(params.chapterId);

    if (!deletedChapter) {
      return NextResponse.json({ message: 'Chapter no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Chapter eliminado con éxito' });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el Chapter", error }, { status: 500 });
  }
};