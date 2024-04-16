import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface TooltipProps {
  asChild?: boolean;
  trigger: React.JSX.Element;
  content: React.JSX.Element;
}

export default function TooltipComponent({
  asChild = false,
  trigger,
  content,
}: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{trigger}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
