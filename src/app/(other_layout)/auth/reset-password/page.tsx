"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetNewPass } from "@/hooks/auth.hook";
import { SubmitHandler, useForm } from "react-hook-form";


const ResetPassword = () => {
    const searchParams = useSearchParams(); // Access query params
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
 
    const { mutate: changePassword } = useSetNewPass();
  
    const onSubmit:SubmitHandler<any> = async (data: any) => {
      if (data.password !== data.confirmpassword) {
        toast.error("Password not matched.");
      } else {
        changePassword(
          { token: token as string, password: data.password },
          {
            onSuccess: () => {
              toast.success("Password reset successful.");
              router.push(`/auth/signin`);
            },
            onError: (error: { message: string | undefined; }) => {
              throw new Error(error.message);
            },
          }
        );
      }
    };  
  
    if (!token || !email) {
      router.push(`/`);
      return null; 
    }

    return (
        <div className="max-w-lg border w-full mx-auto mt-[35vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <form onSubmit={handleSubmit(onSubmit)} className="my-8" >
          <div className="h-10 bg-black font-semibold text-white text-2xl flex items-center justify-center mb-10">
          <p>Reset Password</p>
        </div>
         <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" required
                  {...register("password", { required: "Password is required" })} />
                  </LabelInputContainer>
         <LabelInputContainer className="mb-4">
                    <Label htmlFor="confirmpassword">Confirm Password</Label>
                    <Input id="confirmpassword" placeholder="••••••••" type="password" 
                            required {...register("confirmpassword", { required: "Confirm Password is required" })}/>
                  </LabelInputContainer>
          
          <button
            className="bg-gradient-to-br mt-3 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Change Password
            <BottomGradient />
          </button>
          </form>
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

export default ResetPassword;