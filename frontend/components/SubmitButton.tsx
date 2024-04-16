import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

interface Props {
  text: string;
  classNames: string;
  isSubmitting?: boolean;
}

function SubmitButton({ text, classNames, isSubmitting }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={classNames}
      disabled={pending || isSubmitting}
    >
      {pending || isSubmitting ? <Loader className="animate-loading" /> : text}
    </Button>
  );
}

export default SubmitButton;
