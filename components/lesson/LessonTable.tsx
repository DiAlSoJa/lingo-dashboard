import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TableActions from './TableActions';
import mongoose from 'mongoose';
import { Language } from '@/types/languages';
import { WordType } from '@/types/word-type';
import Lesson from '@/models/lesson';

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
  const lessons: any[] = await Lesson.find().populate("chapterId")

  return (
    <div className="mt-10 shadow-md rounded-md dark:border dark:border-slate-700">
      <h3 className="text-2xl mb-4 font-semibold p-5">{title ? title : 'lessons'}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>description</TableHead>
            <TableHead>chapter</TableHead>


            
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons.map(course => (
            <TableRow
              key={course._id.toString()}
            >
    

              <TableCell>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{course.chapterId.title}</TableCell>

              <TableCell>
                <TableActions id={course._id.toString()} />
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </div>
  );
}

export default LessonTable;