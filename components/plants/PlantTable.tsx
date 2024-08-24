import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TableActions from './TableActions';
import mongoose from 'mongoose';
import { Language } from '@/types/languages';
import { WordType } from '@/types/word-type';
import Plant from '@/models/plant';
import Image from 'next/image';

interface IPlant {
  _id: mongoose.Types.ObjectId;
  title: string;
  type?: WordType; // Make type optional
  language: Language;
}

interface PlantTableProps {
  limit?: number;
  title?: string;
}

const PlantTable = async ({ limit, title }: PlantTableProps) => {
  const plants: any[] = await Plant.find()

  return (
    <div className="mt-10 shadow-md rounded-md dark:border dark:border-slate-700">
      <h3 className="text-2xl mb-4 font-semibold p-5">{title ? title : 'plants'}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            {/* <TableHead>Type</TableHead> */}
            <TableHead>Name</TableHead>
            <TableHead>price</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {plants.map(word => (
            <TableRow
              key={word._id.toString()}
            >
              <TableCell>
                <Image
                src={word.src}
                alt={word.name}
                width={50}
                height={50}
                />
              </TableCell>
              {/* <TableCell  className={!word.typeId ? 'bg-yellow-100' : ''}>{word.typeId ? word.typeId.name : 'No Type'}</TableCell> Display placeholder if no type */}
              <TableCell>{word.name}</TableCell>
              <TableCell>{word.basePrice}</TableCell>
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

export default PlantTable;