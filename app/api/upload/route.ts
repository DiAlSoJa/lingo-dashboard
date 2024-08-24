import cloudinary from "@/lib/cloudinary";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  try {
    const data = await req.formData();
    const image = data.get("file");

    if (!image || !(image instanceof Blob)) {
      return NextResponse.json("No se ha subido ninguna imagen", {
        status: 400,
      });
    }

    // Convertir el Blob a un Buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear una función que retorne una promesa para manejar upload_stream
    const uploadImage = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'lingo',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(buffer);
      });

    try {
      const response: any = await uploadImage();

      return NextResponse.json({
        public_id: response.public_id,
        secure_url: response.secure_url,
      });

    } catch (error) {
      console.error("Error subiendo imagen:", error);
      return NextResponse.json({ error: "Error subiendo imagen" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error subiendo imagen:", error);
    return NextResponse.json({ error: "Error subiendo imagen" }, { status: 500 });
  }
}