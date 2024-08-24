import {  NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Course from '@/models/course';

export const GET = async (req: Request, { params }: { params: { courseId: string } }) => {
  try {

    const course = await Course.findById(params.courseId);
    if (!course) {
      return NextResponse.json({ message: 'course no encontrado' }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener el course", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { courseId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const { title,description,languageId } = await req.json();
    const updatedcourse = await Course.findByIdAndUpdate(params.courseId, { title,description,languageId }, { new: true });

    if (!updatedcourse) {
      return NextResponse.json({ message: 'course no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updatedcourse);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar el course", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { courseId: string } }) => {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    await connectDB();
    const deletedcourse = await Course.findByIdAndDelete(params.courseId);

    if (!deletedcourse) {
      return NextResponse.json({ message: 'course no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'course eliminado con éxito' });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el course", error }, { status: 500 });
  }
};