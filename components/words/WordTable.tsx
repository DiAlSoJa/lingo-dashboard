import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TableActions from './TableActions';
import mongoose from 'mongoose';
import Word from '@/models/word';
import { Language } from '@/types/languages';
import { WordType } from '@/types/word-type';

interface IWord {
  _id: mongoose.Types.ObjectId;
  title: string;
  type?: WordType; // Make type optional
  language: Language;
}

interface WordTableProps {
  limit?: number;
  title?: string;
}

const WordTable = async ({ limit, title }: WordTableProps) => {
  const words: any[] = await Word.find()
    .populate('typeId')  // Populate typeId instead of 'WordType'
    .populate('languageId'); // Populate languageId instead of 'Language'

  return (
    <div className="mt-10 shadow-md rounded-md dark:border dark:border-slate-700">
      <h3 className="text-2xl mb-4 font-semibold p-5">{title ? title : 'Words'}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            {/* <TableHead>Type</TableHead> */}
            <TableHead>Language</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map(word => (
            <TableRow
              key={word._id.toString()}
            >
              <TableCell>{word.title}</TableCell>
              {/* <TableCell  className={!word.typeId ? 'bg-yellow-100' : ''}>{word.typeId ? word.typeId.name : 'No Type'}</TableCell> Display placeholder if no type */}
              <TableCell>{word.languageId.name}</TableCell>
              <TableCell>
                <TableActions id={word._id.toString()} />
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </div>
  );
}

export default WordTable;