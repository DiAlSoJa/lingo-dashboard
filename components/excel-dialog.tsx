
'use client';

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";
import { toast } from 'sonner'; // Asegúrate de que 'sonner' esté correctamente instalado y configurado
import axios from 'axios'; // Asegúrate de que 'axios' esté instalado
import * as XLSX from "xlsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useRouter } from 'next/navigation';

interface ExcelDialogProps {
  url: string;
}

export function ExcelDialog({ url }: ExcelDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState("");
  const router = useRouter();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const workSheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(selectedFile);
    }
  }

  async function handleSend() {
    if (!jsonData) {
      toast.error("No data to send");
      return;
    }

    try {
      const response = await axios.post(url, JSON.parse(jsonData), {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.status === 201) {
        toast.success("File uploaded successfully!");
        router.push("/words")
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error:any) {
      toast.error("Error uploading file: " + error.message);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"excel"}>
          <FileX />
          <span className='ml-3'>Upload</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload the excel</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription></AlertDialogDescription>
        <Tabs defaultValue="upload" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <div className="flex items-center justify-center w-full">
              <form className="w-full">
                <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept='.xls,.xlsx'
                    onChange={handleFileChange}
                  />
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Excel only</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{file?.name || 'No file selected'}</p>
                    </div>
                  </label>
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <pre className='bg-slate-200 rounded h-[300px] overflow-auto p-3'>
              {jsonData ? jsonData : "no data"}
            </pre>
          </TabsContent>
        </Tabs>
        <AlertDialogFooter className='mt-4'>
          <AlertDialogCancel className="bg-red-800 text-white hover:bg-red-600 hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="primary" disabled={!file} onClick={handleSend}>
              Send
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}