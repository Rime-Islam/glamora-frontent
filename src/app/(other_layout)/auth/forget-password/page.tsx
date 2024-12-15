
"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useResetPass } from "@/hooks/auth.hook";



const ForgetPassword = () => {
  const router = useRouter();
  const { mutate: resetPassword, isPending } = useResetPass();
  const [email, setEmail] = useState("");
  
  const handleSend = () => {
    resetPassword(
      { email: email },
      {
        onSuccess: () => {
          toast.success("Reset link sent to email.");
          router.push(`/auth/signin`);
        },
        onError: () => {
          toast.error("Something went wrong.");
        },
      }
    );
    setEmail("");
  };

    return (
        <div className="max-w-lg border w-full mx-auto mt-[35vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
       
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email"  value={email} // Bind the input value to state
        onChange={(e) => setEmail(e.target.value)}/>
          </LabelInputContainer>
          
          <button
            className="bg-gradient-to-br mt-3 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              disabled={isPending}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !isPending && handleSend();
        }}
          >
            Send
            <BottomGradient />
          </button>
      </div>
    );
  }
   
  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
   
  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    )
};

export default ForgetPassword;