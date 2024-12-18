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
import { useUpdateProduct } from "@/hooks/product.hook";
import { IProduct } from "@/interface/product.interface";
import { Modalbox } from "@/components/common/modal/Modalbox";
import { useAllCategoryDashboard } from "@/hooks/category.hook";


const EditProduct = ({ product }: { product: IProduct }) => {
  const { data } = useAllCategoryDashboard();
  const { mutate, isPending } = useUpdateProduct();
  const { data: shopData } = useVendorShop();

  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (fileList: FileList) => {
  const fileArray = Array.from(fileList); 
  setFiles(fileArray);
};
  const { register, handleSubmit, formState: { errors } } = useForm<any>();

  const onSubmit: SubmitHandler<any>  = async (data: any) => {
    
    const { ...otherData } = data;
    let imageUrl = null;
    if (!!data) {
      if (files) {
        imageUrl = await uploadImagesToCloudinary(files);
      }
      mutate(
        {
          data: { ...otherData, ...(imageUrl && { images: imageUrl }) },
          id: product.productId,
        },
        {
          onSuccess: () => {
            toast.success("Product updated.");
            window.location.reload();
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
      <div className="p-6">
         <Modalbox
      size="icon"
      variant="outline"
      title="Edit Product Data"
      btncss="hover:text-green-500"
      btnIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      }
    >
     <div className=" bg-slate-200 border w-full mx-auto rounded-none md:rounded-2xl p-4  shadow-input hover:bg-white dark:bg-black">
                  <form onSubmit={handleSubmit(onSubmit)} className="" >
                            
        <div className="flex gap-3">
 <LabelInputContainer className="mb-4">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your Shop Name" defaultValue={product?.name} type="text" {...register("name", { required: "Name is required" })}
                          required/>
  </LabelInputContainer>
 <LabelInputContainer className="mb-4">
     <Label htmlFor="stock">Stock</Label>
   <Input id="stock" placeholder="Your product stock" defaultValue={product?.stock} type="number" min={1} {...register("stock", { required: "Stock is required" })}
    required/>
  </LabelInputContainer>
                      </div>
                       <div className="flex gap-3">
                       <LabelInputContainer className="mb-4">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" placeholder="Your product price" defaultValue={product?.price} type="number" min={1} {...register("price", { required: "Price is required" })}
                          required/>
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="discounts">Discount Percent</Label>
                            <Input id="discounts" defaultValue={product?.discounts} placeholder="Your product discounts" min={0} type="number" {...register("discounts")}
                         />
                          </LabelInputContainer>
                       </div>
                          <div className="flex gap-3">
                          <LabelInputContainer className="mb-4">
                             <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="categoryId">Select Category</Label>
                                      <select id="categoryId" defaultValue={product?.categoryId} className="border rounded p-2" required {...register("categoryId", { required: "Category is required" })}>
                                        {
                                           data?.data?.map((info) => (<option key={info?.name} value={info?.categoryId}>{info?.name}</option>))
                                        }
                                      </select>
                                    </div>
                                    </LabelInputContainer>
                          <LabelInputContainer className="mb-4">
                             <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="shopId">Select Shop</Label>
                                      <select id="shopId" className="border rounded p-2" defaultValue={product?.shopId} required {...register("shopId", { required: "Shop is required" })}>
                                        {
                                           shopData?.data?.map((info) => (<option key={info?.name} value={info?.shopId}>{info?.name}</option>))
                                        }
                                      </select>
                                    </div>
                                    </LabelInputContainer>
                          </div>
                                    <LabelInputContainer className="mb-4">
                                    <Label htmlFor="description">Description</Label>
                              <textarea
                                id="description"
                                defaultValue={product?.description}
                                rows={5}
                                maxLength={256}
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
                            Edit Product
                            <BottomGradient />
                          </button>
                        </form>
                        </div></Modalbox>
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

export default EditProduct;