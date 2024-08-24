import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Course from '@/models/course';

export const GET = async () => {
  try {
    await connectDB();
    const courses = await Course.find({});
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los courses", error }, { status: 500 });
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
    const { title,description,languageId } = await req.json();
    const newCourse = new Course({ title,description,languageId });
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el course", error }, { status: 500 });
  }
};