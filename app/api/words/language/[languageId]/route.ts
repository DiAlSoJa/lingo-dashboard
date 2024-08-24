import Word from "@/models/word";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { languageId: string } }) => {
    try {
  
      const word = await Word.find({languageId:params.languageId});
      if (!word) {
        return NextResponse.json({ message: 'word not found' }, { status: 404 });
      }
      return NextResponse.json(word);
    } catch (error) {
      return NextResponse.json({ message: "Error getting the word", error }, { status: 500 });
    }
  };
  