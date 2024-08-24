import { NextRequest, NextResponse } from 'next/server';

import Language from '@/models/language';
import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';

export const GET = async () => {
  try {
    await connectDB();
    const idiomas = await Language.find({});
    return NextResponse.json(idiomas);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los idiomas", error }, { status: 500 });
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
    const { name,locale } = await req.json();
    const newIdioma = new Language({ name,locale });
    await newIdioma.save();
    return NextResponse.json(newIdioma, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el idioma", error }, { status: 500 });
  }
};