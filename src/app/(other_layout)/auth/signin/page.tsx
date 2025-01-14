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
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useUserlogin } from "@/hooks/auth.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateUser } from "@/interface/user.interface";
import config from "@/config";



const Signin = () => {
  const authData = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateUser>();
  const router = useRouter();
  const { mutate, isPending } = useUserlogin();

  const onSubmit: SubmitHandler<ICreateUser>  = async (data: ICreateUser) => {
    mutate(data, {
      onSuccess: async () => {
        authData?.setIsLoading(true);
        toast.success("Welcome To Glamora.");
        router.push(`/`);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Something Went Wrong!! Try again.");
      },
    });
  };

  const handleUser  = async () => {
    const {user_email, user_password} = config;
    const data = {
      email: user_email,
      password: user_password
    }

    mutate(data, {
      onSuccess: async () => {
        authData?.setIsLoading(true);
        toast.success("Welcome To Glamora.");
        router.push(`/customer/dashboard`);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Something Went Wrong!! Try again.");
      },
    });
  };

  const handleAdmin  = async () => {
    const {admin_email, user_password} = config;
    const data = {
      email: admin_email,
      password: user_password
    }

    mutate(data, {
      onSuccess: async () => {
        authData?.setIsLoading(true);
        toast.success("Welcome To Glamora.");
        router.push(`/admin/dashboard`);

      },
      onError: (error: Error) => {
        toast.error(error.message || "Something Went Wrong!! Try again.");
      },
    });
  };

  const handleVendor  = async () => {
    const {vendor_email, user_password} = config;
    const data = {
      email: vendor_email,
      password: user_password
    }

    mutate(data, {
      onSuccess: async () => {
        authData?.setIsLoading(true);
        toast.success("Welcome To Glamora.");
        router.push(`/vendor/dashboard`);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Something Went Wrong!! Try again.");
      },
    });
  };

    return (
        <div className="max-w-lg border w-full mx-auto mt-[20vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-center lg:text-2xl xl:text-3xl text-neutral-800 dark:text-neutral-200">
          Login to Glamora
        </h2>
        <p className="text-center my-3 xl:text-lg">or</p>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-8 h-[1px] w-full"></div>

        <div className=" flex justify-evenly">
            <button onClick={handleUser} className="bg-gradient-to-br text-sm md:text-base xl:text-lg p-2 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800  text-white rounded-md">User Login</button>
            <button onClick={handleAdmin} className="bg-gradient-to-br text-sm md:text-base xl:text-lg p-2 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800  text-white rounded-md">Admin Login</button>
            <button onClick={handleVendor} className="bg-gradient-to-br text-sm md:text-base xl:text-lg p-2 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800  text-white rounded-md">Vendor Login</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8" >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="lg:text-sm xl:text-lg">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email", { required: "Email is required" })}
          required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="lg:text-sm xl:text-lg">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" {...register("password", { required: "Password is required" })}
          required/>
          </LabelInputContainer>
          <div>
          <Link href="/auth/forget-password"
                className="lg:text-sm 2xl:text-lg text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </Link>
          </div>
   
          <button
            className="bg-gradient-to-br mt-3 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 lg:text-base xl:text-lg "
            type="submit"
          >
            Sign in
            <BottomGradient />
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="flex flex-col ">
            {/* <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button> */}
          
          </div>
        </form>
        <div className="lg:text-sm 2xl:text-lg text center">New to Glamora? <Link href="/auth/signup" className="text-blue-500 hover:underline">Create an Account</Link></div>
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

export default Signin;