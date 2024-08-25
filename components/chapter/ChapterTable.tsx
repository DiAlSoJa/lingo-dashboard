import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TableActions from './TableActions';
import mongoose from 'mongoose';
import { Language } from '@/types/languages';
import { WordType } from '@/types/word-type';
import Plant from '@/models/plant';
import Image from 'next/image';
import Chapter from '@/models/chapter';

interface IPlant {
  _id: mongoose.Types.ObjectId;
  title: string;
  type?: WordType; // Make type optional
  language: Language;
}

interface ChapterTableProps {
  limit?: number;
  title?: string;
}

const ChapterTable = async ({ limit, title }: ChapterTableProps) => {
  const chapters: any[] = await Chapter.find().populate("courseId")

  return (
    <div className="mt-10 shadow-md rounded-md dark:border dark:border-slate-700">
      <h3 className="text-2xl mb-4 font-semibold p-5">{title ? title : 'chapters'}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Course</TableHead>

            
          </TableRow>
        </TableHeader>
        <TableBody>
          {chapters.map(course => (
            <TableRow
              key={course._id.toString()}
            >
    

              <TableCell>{course.title}</TableCell>
              <TableCell>{course.courseId.title}</TableCell>
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

export default ChapterTable;