import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TableActions from './TableActions';
import mongoose from 'mongoose';
import { Language } from '@/types/languages';
import { WordType } from '@/types/word-type';
import LessonQuiz from '@/models/lesson-quiz';


interface IPlant {
  _id: mongoose.Types.ObjectId;
  title: string;
  type?: WordType; // Make type optional
  language: Language;
}

interface LessonTableProps {
  limit?: number;
  title?: string;
}

const LessonTable = async ({ limit, title }: LessonTableProps) => {
  const lessonQuizes: any[] = await LessonQuiz.find().populate("lessonId")

  return (
    <div className="mt-10 shadow-md rounded-md dark:border dark:border-slate-700">
      <h3 className="text-2xl mb-4 font-semibold p-5">{title ? title : 'lesson Quizes'}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Lesson</TableHead>


            
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessonQuizes.map(lessonQuiz => (
            <TableRow
              key={lessonQuiz._id.toString()}
            >
    

              <TableCell>{lessonQuiz.title}</TableCell>
              <TableCell>{lessonQuiz.lessonId.title}</TableCell>

              <TableCell>
                <TableActions id={lessonQuiz._id.toString()} />
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </div>
  );
}

export default LessonTable;