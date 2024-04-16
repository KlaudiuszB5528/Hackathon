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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { FileX } from 'lucide-react';
import { toast } from 'sonner';

interface ConfirmAlertProps {
  callbackFunction: (fileId: number) => Promise<void>;
  fileId: number;
}

export default function ConfirmAlert({
  callbackFunction,
  fileId,
}: ConfirmAlertProps) {
  const handleClick = async () => {
    try {
      await callbackFunction(fileId);
      toast.success('File deleted successfully');
    } catch (error) {
      toast.error('Error deleting file');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <FileX className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your file
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleClick} variant="destructive">
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
