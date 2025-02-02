"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { FileUpload } from "@/components/ui/file-upload";
import { useVendorShop } from "@/hooks/shop.hook";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageArray";
import { useAddProduct } from "@/hooks/product.hook";
import { useAllCategoryDashboard } from "@/hooks/category.hook";


const AddProduct = () => {
  const { data } = useAllCategoryDashboard();
  const { mutate, isPending } = useAddProduct();
  const { data: shopData } = useVendorShop();

  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (fileList: FileList) => {
  const fileArray = Array.from(fileList); 
  setFiles(fileArray);
};
  const { register, handleSubmit, formState: { errors } } = useForm<any>();

  const onSubmit: SubmitHandler<any>  = async (data: any) => {
    const { ...otherData } = data;
    const imageUrl = await uploadImagesToCloudinary(files);

    if (imageUrl) {
      mutate(
        { ...otherData, images: imageUrl },
        {
          onSuccess: () => {
            toast.success("Product added.");
            window.location.reload();
          },
          onError: () => {
           
            toast.error("Duplicate product! Try again.");
          },
        }
      );
    } else {
      toast.error("Something went wrong! Try again.");
    }
  };
    return (
      <div >
            <h1 className="mb-8 text-3xl text-center font-bold">Create A Product</h1>
  <div className=" bg-slate-200 border w-full mx-auto mt-[5vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input hover:bg-white dark:bg-black">
        <form onSubmit={handleSubmit(onSubmit)} className="my-8" >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Product Name" type="text" {...register("name", { required: "Name is required" })}
          required/>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="price">Price</Label>
            <Input id="price" placeholder="Your product price" type="number" min={1} {...register("price", { required: "Price is required" })}
          required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="discounts">Discount %</Label>
            <Input id="discounts" placeholder="Your product discounts" min={0} type="number" {...register("discounts")}
         />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" placeholder="Your product stock" type="number" min={1} {...register("stock", { required: "Stock is required" })}
          required/>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
             <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="categoryId">Select Category</Label>
                      <select id="categoryId" className="border bg-white rounded p-2" required {...register("categoryId", { required: "Category is required" })}>
                        {
                           data?.data?.map((info) => (<option key={info?.name} value={info?.categoryId}>{info?.name}</option>))
                        }
                      </select>
                    </div>
                    </LabelInputContainer>
          <LabelInputContainer className="mb-4">
             <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="shopId">Select Shop</Label>
                      <select id="shopId" className="border bg-white rounded p-2" required {...register("shopId", { required: "Shop is required" })}>
                        {
                           shopData?.data?.map((info) => (<option key={info?.name} value={info?.shopId}>{info?.name}</option>))
                        }
                      </select>
                    </div>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                    <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                rows={5}
                maxLength={506}
                required
                {...register("description", { required: "Description is required" })}
                className="rounded-lg p-4 mt-2 bg-black/5 border-2 border-solid border-black/10 font-mono font-medium text-sm"
              />
           </LabelInputContainer>

          <LabelInputContainer className="mb-4">
          <Label htmlFor="image">Image</Label>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          <FileUpload onChange={(fileList) => handleFileUpload(fileList as unknown as FileList)} />
        </div></LabelInputContainer>
          <button
            className="bg-gradient-to-br mt-8 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Create Product
            <BottomGradient />
          </button>
            
        </form>
      </div>
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

export default AddProduct;