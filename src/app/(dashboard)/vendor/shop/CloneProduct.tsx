"use client";
import { Modalbox } from "@/components/common/modal/Modalbox";
import { DialogClose } from "@/components/ui/dialog";
import { useCloneProduct } from "@/hooks/product.hook";
import { IProduct } from "@/interface/product.interface";
import React from "react";
import { toast } from "sonner";
import { Copy, Check, X, AlertCircle } from "lucide-react";

const CloneProduct = ({ data }: { data: Partial<IProduct> }) => {
  const { mutate, isPending } = useCloneProduct();

  const handleClone = () => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Product successfully duplicated! ✨");
        setTimeout(() => window.location.reload(), 1000);
      },
      onError: () => {
        toast.error("Duplication failed. Please try again.");
      },
    });
  };

  return (
    <div>
      <Modalbox
        title="Duplicate Listing"
        descrip="Are you sure you want to create a copy of this product? All specifications will be inherited."
        variant="ghost"
        btncss="p-2 hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-all rounded-xl border border-gray-100 shadow-sm"
        btnIcon={<Copy className="w-5 h-5" />}
      >
        <div className="mt-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8" />
            </div>
            
            <div className="flex gap-4 w-full">
                <DialogClose className="flex-1">
                    <button className="w-full py-3.5 rounded-2xl bg-gray-50 text-gray-500 font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                        <X className="w-4 h-4" />
                        Cancel
                    </button>
                </DialogClose>
                <DialogClose className="flex-1" onClick={handleClone}>
                    <button 
                        disabled={isPending}
                        className="w-full py-3.5 rounded-2xl bg-gray-900 text-white font-bold hover:bg-rose-500 transition-all shadow-lg hover:shadow-rose-100 flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Confirm
                    </button>
                </DialogClose>
            </div>
        </div>
      </Modalbox>
    </div>
  );
};

export default CloneProduct;