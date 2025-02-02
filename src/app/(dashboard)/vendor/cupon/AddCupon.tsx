"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateCupon } from "@/hooks/cupon.hook";
import { useVendorShop } from "@/hooks/shop.hook"; // Fetch vendor shops
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AddCoupon = () => {
  const { mutate, isPending } = useCreateCupon();
  const { data: shopData } = useVendorShop();
  const { register, handleSubmit, formState: { errors } } = useForm<any>();

  const onSubmit = async (data: any) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Coupon created successfully.");
      },
      onError: () => {
        toast.error("Failed to create coupon. Please try again.");
      },
    });
  };

  return (
   <div>
    <div className=" bg-slate-200 border max-w-3xl mx-auto mt-[5vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input hover:bg-white dark:bg-black">
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 " >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="code">Cupon Code</Label>
            <Input id="code" placeholder="Your Cupon Code" type="text" {...register("code", { required: "Coupon is required" })}
          required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="discount">Discount</Label>
            <Input id="discount" placeholder="Your coupon discount" type="number" min={1} {...register("discount", { required: "discount is required" })}
          required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="expiresAt">Expiry Date</Label>
            <Input id="expiresAt" placeholder="Your cupon expiry date" type="date" min={1} {...register("expiresAt", { required: "Expiry date is required" })}
          required/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="shopId">Select shop</Label>
            <select id="shopId" className="border bg-white rounded p-2" required {...register("shopId", { required: "Select shop is required" })}>
                        {
                           shopData?.data?.map((info) => (<option key={info?.name} value={info?.shopId}>{info?.name}</option>))
                        }
                      </select>
          </LabelInputContainer>
       
          <button
            className="bg-gradient-to-br mt-8 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {
        isPending ? "Creating..." : "Create Cupon"}
            <BottomGradient />
          </button>
          </form>
      </div>
   </div>
  );
};

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

export default AddCoupon;