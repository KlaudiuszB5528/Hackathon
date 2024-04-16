'use client';

import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { IAuthContext } from '../../Interfaces/IAuthContext';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Package, FileText, Download } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import AddFile from './AddFile';
import { toast } from 'sonner';
import { getCookie } from 'cookies-next';
import ConfirmAlert from './ConfirmAlert';

const CardFilesDetails = () => {
  const { teamDataLoading, teamFiles, setTeamFiles } = useContext(
    AuthContext,
  ) as IAuthContext;
  // If loading then show loading spinner
  if (teamDataLoading) {
    return (
      <div className="flex flex-col space-y-6 w-full p-6 border border-gray-200 rounded-lg">
        <Skeleton className="h-8 w-1/2 rounded-xl " />
        <Skeleton className="h-4 w-[250px] rounded-xl" />

        <div className="flex gap-2 items-center">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-[175px] rounded-xl" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-[175px] rounded-xl" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-[175px] rounded-xl" />
        </div>
        <Skeleton className="mt-4 h-10 w-[200px] rounded-xl" />
      </div>
    );
  }

  const deleteFile = async (fileId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      if (response.ok && teamFiles) {
        const newFiles = teamFiles.filter((file) => file.id !== fileId);
        setTeamFiles(newFiles);
      }
    } catch (error) {
      toast.error('Error deleting file');
    }
  };

  const downloadFile = async (filename: string, name: string) => {
    try {
      const response = await fetch(`http://localhost:8000/files/${filename}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      if (response.ok) {
        console.log('ok');

        const data = await response.blob();
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      }
    } catch (error) {
      toast.error('Error downloading file');
    }
  };

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="border-b border-gray-200 mb-2">
          <CardTitle className="flex gap-2 items-center">
            <Package className="h-8 w-8" />
            Files
          </CardTitle>
          <CardDescription>Summary of your team files</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="sr-only">Team Members Information</span>
          {teamFiles?.length === 0 && (
            <p className="font-semibold">No files uploaded yet</p>
          )}
          {teamFiles?.map((file) => {
            const formattedDate = new Date(file.createdAt).toLocaleDateString(
              'pl-PL',
              {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              },
            );
            return (
              <ul
                key={file.id}
                className="flex flex-col items-start gap-1 py-2 w-full flex-wrap"
              >
                <li className="flex flex-row gap-2 items-center">
                  <FileText className="h-5 w-5" />
                  <p className="font-semibold">{file.name}</p>
                  <ConfirmAlert
                    callbackFunction={deleteFile}
                    fileId={file.id}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => downloadFile(file.filename, file.name)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </li>
                <li>{(file.size / 1024).toFixed(2)} kB</li>
                <li>{formattedDate}</li>
              </ul>
            );
          })}
        </CardContent>
        <CardFooter className="mt-auto">
          <AddFile />
        </CardFooter>
      </Card>
    </>
  );
};

export default CardFilesDetails;
