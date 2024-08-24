import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TableActions from './TableActions';
import mongoose from 'mongoose';
import Language from '@/models/language';

interface ILanguage {
  _id: mongoose.Types.ObjectId;
  name: string;
  locale:string;
}

interface LanguageTableProps {
  limit?: number;
  title?: string;
}

const LanguageTable = async ({ limit, title }: LanguageTableProps) => {
  const languages: ILanguage[] = await Language.find();
  const filteredLanguages = limit ? languages.slice(0, limit) : languages;

  return (
    <div className="mt-10 shadow-md rounded-md dark:border dark:border-slate-700">
      <h3 className="text-2xl mb-4 font-semibold p-5">{title ? title : 'Languages'}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Locale</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLanguages.map(language => (
            <TableRow key={language._id.toString()}>
              <TableCell>{language.name}</TableCell>
              <TableCell>{language.locale}</TableCell>

              <TableCell>
                <TableActions id={language._id.toString()} />
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </div>
  );
}

export default LanguageTable;