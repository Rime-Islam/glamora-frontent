import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modalbox({
  btncss,
  title,
  descrip,
  children,
  btnIcon,
  btnText,
  isOpen = false,
  variant = "default",
  size = "default",
  maxWidth = "md:max-w-xl",
}: {
  btncss?: string;
  btnText?: string;
  descrip?: string;
  title: string;
  children: ReactNode;
  btnIcon?: ReactNode;
  isOpen?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  maxWidth?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
}) {
  return (
    <Dialog defaultOpen={isOpen}>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={btncss}>
          {btnIcon}
          {btnText}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px] rounded-3xl border-none shadow-2xl overflow-hidden p-0 bg-white", maxWidth)}>
        <div className="px-8 py-8">
          <DialogHeader className="mb-6">
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-xl font-black text-gray-900 tracking-tight">
                {title}
              </DialogTitle>
              {descrip && (
                <DialogDescription className="text-sm font-medium text-gray-400">
                  {descrip}
                </DialogDescription>
              )}
            </div>
          </DialogHeader>
          <div className="mt-2">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}