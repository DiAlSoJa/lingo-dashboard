import { NextRequest, NextResponse } from 'next/server';


import { connectDB } from '@/lib/mongoDb';
import { auth } from '@clerk/nextjs/server';
import Plant from '@/models/plant';



export const GET = async () => {
  try {
    await connectDB();
    const plants = await Plant.find();
    return NextResponse.json(plants);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los Plant", error }, { status: 500 });
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
    const {name,basePrice,src,imageId} = await req.json();

    const newPlant = new Plant({name,basePrice,src,imageId});
    
    await newPlant.save();
    return NextResponse.json(newPlant, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error al crear el Plant", error }, { status: 500 });
  }
};