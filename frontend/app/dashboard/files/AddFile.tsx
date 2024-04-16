'use client';
import { AuthContext } from '@/app/context/AuthContext';
import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';
import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

const AddFile = () => {
  const { teamFiles, setTeamFiles, teamData } = useContext(
    AuthContext,
  ) as IAuthContext;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  });

  const sendFile = async (file: File) => {
    const formData = new FormData();
    formData.append('teamId', '1');
    formData.append('files', file);
    try {
      const response = await fetch('http://localhost:8000/files/upload', {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data[0]);
        if (teamFiles !== null) {
          setTeamFiles([...teamFiles, data[0]]);
        } else {
          setTeamFiles([data[0]]);
        }
        acceptedFiles.pop();
        toast.success('File uploaded successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section id="addNewFile" className="flex flex-col">
      <h1 className="transition-all text-foreground text-lg font-semibold dark:text-grayGray-100">
        Add new file
      </h1>
      {isDragReject ? (
        <h2 className="text-sm pb-2 text-red-500 dark:text-red-400 ">
          File must be of .pdf type
        </h2>
      ) : (
        <h2
          className={`text-sm pb-2 ${
            fileRejections.length > 0
              ? 'text-red-500'
              : 'text-[#828282] dark:text-grayGray-500'
          }`}
        >
          File should be of .pdf type with max size of 5MB
        </h2>
      )}

      <div
        {...getRootProps({
          className: 'dropzone',
        })}
        className={`mb-4 transition-all dragNDrop cursor-pointer w-full flex flex-col items-center justify-center bg-[#F6F8FB] dark:bg-dp03 rounded-[12px] p-12 space-y-12 border border-dashed border-[#97BEF4]  dark:border-opacity-40 ${
          acceptedFiles.length > 0 ? 'border-fuchsia-700' : ''
        } ${
          isDragAccept
            ? 'ring-2 ring-fuchsia-700 dark:ring-fuchsia-600 border-transparent dark:border-transparent'
            : ''
        } ${
          isDragReject
            ? 'ring-2 ring-red-500 dark:ring-red-400 border-transparent dark:border-transparent'
            : ''
        }`}
      >
        <span className="text-[#BDBDBD] dark:text-grayGray-500 flex max-w-xs text-center truncate">
          {acceptedFiles.length > 0
            ? acceptedFiles[0].name
            : 'Click or Drag & Drop your file here'}
        </span>
      </div>

      <input {...getInputProps()} />

      <Button
        onClick={() => sendFile(acceptedFiles[0])}
        className="bg-fuchsia-700"
        disabled={acceptedFiles.length === 0}
      >
        Upload file
      </Button>
    </section>
  );
};

export default AddFile;
