import cloudinary from "@/lib/cloudinary";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { uploadId: string } }) {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
  const { uploadId } = params;

  try {
    // Eliminar la imagen de Cloudinary usando el uploadId
    const result = await cloudinary.uploader.destroy(uploadId.replace("_","/"));

    if (result.result === "ok") {
      return NextResponse.json({ message: "Imagen eliminada correctamente" });
    } else {
      return NextResponse.json({ error: "Error eliminando la imagen" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error eliminando la imagen:", error);
    return NextResponse.json({ error: "Error eliminando la imagen" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { uploadId: string } }) {
  const {userId}=auth();

  if(userId!==process.env.ADMIN_ID){
    return new NextResponse("No authenticated", { status: 404 });
  }
 
  const { uploadId } = params;

  try {
    // Eliminar la imagen existente de Cloudinary usando el uploadId
    const deleteResult = await cloudinary.uploader.destroy(uploadId.replace("_", "/"));

    // if (deleteResult.result !== "ok") {
    //   return NextResponse.json({ error: "Error eliminando la imagen existente" }, { status: 500 });
    // }

    // Subir la nueva imagen
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

    const uploadResult: any = await uploadImage();

    return NextResponse.json({
      message: "Imagen actualizada correctamente",
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
    });

  } catch (error) {
    console.error("Error actualizando imagen:", error);
    return NextResponse.json({ error: "Error actualizando imagen" }, { status: 500 });
  }
}