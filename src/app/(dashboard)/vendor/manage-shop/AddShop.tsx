"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FileUpload } from "@/components/ui/file-upload";
import { useAddShop } from "@/hooks/shop.hook";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageArray";


const AddShop = () => {
    const [files, setFiles] = useState<File[]>([]);

 const handleFileUpload = (fileList: FileList) => {
  const fileArray = Array.from(fileList); // Convert FileList to File[]
  setFiles(fileArray);
  console.log("Uploaded files:", fileArray);
};

  const { mutate, isPending } = useAddShop(); 
  const { register, handleSubmit, formState: { errors } } = useForm<any>();
  const router = useRouter();


  const onSubmit: SubmitHandler<any>  = async (data: any) => {
    const { images: imageFiles, ...otherData } = data;
    console.log(imageFiles)
    const imageUrl = await uploadImagesToCloudinary(files);

    if (imageUrl) {
      mutate(
        { ...otherData, images: imageUrl },
        {
          onSuccess: () => {
            toast.success("Shop added.");
          },
          onError: () => {
            toast.error("Something went wrong! Try again.");
          },
        }
      );
    } else {
      toast.error("Something went wrong! Try again.");
    }
  };
    return (
        <div className="max-w-lg border w-full mx-auto mt-[20vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <form onSubmit={handleSubmit(onSubmit)} className="my-8" >
            <h1 className="mb-8 text-xl font-bold">Create A Shop</h1>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Shop Name</Label>
            <Input id="name" placeholder="Your Shop Name" type="text" {...register("name", { required: "Name is required" })}
          required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="location">Shop Location</Label>
            <Input id="location" placeholder="Your Shop Location" type="location" {...register("location", { required: "Location is required" })}
          required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
          <Label htmlFor="image">Shop Image</Label>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div></LabelInputContainer>
          <button
            className="bg-gradient-to-br mt-8 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Create Shop
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

export default AddShop;