import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TableActions from './TableActions';
import WordType from '@/models/word-types';
import Language from '@/models/language';  // Importa el modelo Language
import mongoose from 'mongoose';

interface IWordType {
  _id: mongoose.Types.ObjectId;
  name: string;
  languageId: { name: string; locale: string };  // Asegúrate que la relación con el modelo Language sea correcta
}

interface WordTypeTableProps {
  limit?: number;
  title?: string;
}

const WordTypeTable = async ({ limit, title }: WordTypeTableProps) => {
  // Asegúrate de usar populate con el nombre correcto del campo
  const wordsTypes: any[] = await WordType.find().populate('languageId');

  return (
    <div className="mt-10 shadow-md rounded-md dark:border dark:border-slate-700">
      <h3 className="text-2xl mb-4 font-semibold p-5">{title ? title : 'WordsTypes'}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wordsTypes.map(word => (
            <TableRow key={word._id.toString()}>
              <TableCell>{word.name}</TableCell>
              <TableCell>{word.languageId.locale}</TableCell>  {/* Asegúrate de que locale esté en el documento relacionado */}
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

export default WordTypeTable;
