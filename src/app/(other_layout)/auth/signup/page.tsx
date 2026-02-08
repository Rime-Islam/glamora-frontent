"use client"

import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import {
  IconBrandGoogle
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { useUserRegistration } from "@/hooks/auth.hook";
import {  SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "@/providers/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { IUserToken } from "@/interface/token.interface";
import { ICreateUser } from "@/interface/user.interface";



const Signup = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateUser>();
  const { mutate, isPending } = useUserRegistration();
  const auth = useContext(AuthContext);
 
  const onSubmit: SubmitHandler<ICreateUser> = async (data: any) => {
    mutate(data, {
      onSuccess: async (data) => {
        const decode = (await jwtDecode(data?.data as string)) as IUserToken;
        toast.success("User has been created");
        if (decode?.role === "VENDOR") {
          auth?.setIsLoading(true);
          router.push(`/${(decode?.role as string).toLowerCase()}/manage-shop`);
        } else {
          router.push("/login");
        }
      },
      onError: (error) => {
        console.log(error);
        toast.success("Something Went Wrong");
      },
    });
  };
  
    return (
        <div className="max-w-lg border w-full mx-auto mt-[10vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold lg:text-2xl xl:text-3xl text-neutral-800 dark:text-neutral-200">
          Welcome to Glamora
        </h2>
        <p className="text-neutral-600 lg:text-sm xl:text-lg mt-2 dark:text-neutral-300">
        By creating and/or using your account, you agree to our <Link href='/terms-of-use' className="text-blue-500 hover:underline">Terms of Use</Link>  and <Link href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
        </p>
   
        <form onSubmit={handleSubmit(onSubmit)}  className="my-8" >
         
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name" className="lg:text-sm xl:text-lg"> name</Label>
              <Input id="name" placeholder="tailor"  {...register("name", { required: "Name is required" })}
        required type="text" />
            </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="lg:text-sm xl:text-lg">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email", { required: "Email is required" })}
          required />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="lg:text-sm xl:text-lg">Password</Label>
            <Input id="password" placeholder="••••••••" type="password"  {...register("password", { required: "Password is required" })}
          required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4" >
              <Label htmlFor="address" className="lg:text-sm xl:text-lg"> Address</Label>
              <Input id="address" type="text" placeholder="dhaka, bangladesh"  {...register("address", { required: "Address is required" })}
          required/>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="mobile" className="lg:text-sm xl:text-lg"> Phone</Label>
              <Input id="mobile" type="number"  placeholder="245657890" {...register("mobile", { required: "Phone is required" })}
          required/>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="Select Account Type" className="lg:text-sm xl:text-lg">Select Account Type</Label>
            <select id="accountType" className="border bg-white rounded p-2" required {...register("accountType", { required: "Account Type is required" })}>
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Seller</option>
            </select>
          </div>
            </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 lg:text-base xl:text-lg dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 "
            type="submit"
          >
            Sign up
            <BottomGradient />
          </button>
   
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
   
          {/* <div className="flex flex-col space-y-4">
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          
          </div> */}
        </form>
        <div className="lg:text-sm xl:text-lg text center">Already have an account? <Link href="/auth/signin" className="text-blue-500 hover:underline">Log in Now</Link></div>
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

export default Signup;