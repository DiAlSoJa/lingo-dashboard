"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: {
    container: [
      [{ 'header': [2, 3, 4, false] }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
    handlers: {
      image: function () {

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files ? input.files[0] : null;
          if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
              const response = await axios.post("/api/upload", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });

              const {secure_url,public_id}=response.data;
              //@ts-ignore
              const quill = this.quill;
              const range = quill.getSelection();
              quill.insertEmbed(range.index, 'image', secure_url);
            } catch (error) {
              console.error("Error uploading image:", error);
            }
          }
        };

      },
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

interface EditorProps {
  onChange: (value: string) => void;
  value?: string;
}

const Editor = ({
  onChange,
  value
}: EditorProps) => {

  const quillRef = useRef<any>(null);

  // Detect image removal
  // useEffect(() => {
  //   const quill = quillRef.current.getEditor();

  //   quill.on('text-change', function (delta:any, oldDelta:any, source:any) {
  //     if (source === 'user') {
  //       const oldImages = oldDelta.ops.filter((op:any) => op.insert && op.insert.image).map((op:any) => op.insert.image);
  //       const newImages = quill.getContents().ops.filter((op:any) => op.insert && op.insert.image).map((op:any) => op.insert.image);

  //       const deletedImages = oldImages.filter((image:any) => !newImages.includes(image));
  //       console.log("wevos")
  //       // if (deletedImages.length > 0) {
  //       //   deletedImages.forEach(async (imageUrl:String) => {
  //       //     try {
  //       //       await axios.post('/api/delete-image', { url: imageUrl });
  //       //       console.log(`Image deleted: ${imageUrl}`);
  //       //     } catch (error) {
  //       //       console.error("Error deleting image:", error);
  //       //     }
  //       //   });
  //       // }
  //     }
  //   });
  // }, []);

  return (
    <div className="border">
      <ReactQuill ref={quillRef} theme="snow" value={value} onChange={onChange} modules={modules} />
    </div>
  );
};

export default Editor;