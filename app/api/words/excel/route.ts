
import { connectDB } from "@/lib/mongoDb";
import Language from "@/models/language";
import Word from "@/models/word";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
  const { userId } = auth(); // Verificamos la autenticación del usuario

  // Comprobamos que el usuario esté autenticado y sea el administrador
  if (userId !== process.env.ADMIN_ID) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // Conectamos a la base de datos
    await connectDB();

    // Obtenemos los datos del cuerpo de la solicitud
    const jsonData = await req.json();

    console.log(jsonData, typeof jsonData)
    // Iteramos sobre las filas del jsonData
    for (const row of jsonData) {
      const { Word: title, "Language locale": locale } = row;

      // Validamos que `title` y `locale` existan
      if (!title || !locale) {
        console.warn(`Row skipped due to missing title or locale:`, row);
        continue;
      }

      // Buscamos el idioma basado en el `locale`
      const language = await Language.findOne({ locale });

      if (language) {
        // Creamos y guardamos la nueva palabra
        const newWord = new Word({ title, languageId: language._id });
        await newWord.save();
      } else {
        console.warn(`Language with locale "${locale}" not found. Skipping word "${title}".`);
      }
    }

    // Devolvemos una respuesta de éxito
    return NextResponse.json({ message: "Words saved successfully" }, { status: 201 });

  } catch (error:any) {
    console.error("Error saving words:", error);
    return NextResponse.json({ message: "Error saving words", error: error.message }, { status: 500 });
  }
};