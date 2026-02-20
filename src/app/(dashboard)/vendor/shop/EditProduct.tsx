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
import { 
  Pencil, 
  Package, 
  Database, 
  Tag, 
  Store, 
  AlignLeft, 
  Image as ImageIcon, 
  ArrowRight,
  Loader2
} from "lucide-react";

const EditProduct = ({ product }: { product: IProduct }) => {
  const { data: categoryData } = useAllCategoryDashboard();
  const { mutate, isPending } = useUpdateProduct();
  const { data: shopData } = useVendorShop();

  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (fileList: FileList) => {
    const fileArray = Array.from(fileList); 
    setFiles(fileArray);
  };
  
  const { register, handleSubmit, formState: { errors } } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    setIsUploading(true);
    let imageUrl = null;
    
    try {
      if (files.length > 0) {
        imageUrl = await uploadImagesToCloudinary(files);
      }
      
      mutate(
        {
          data: { ...formData, ...(imageUrl && { images: imageUrl }) },
          id: product.productId,
        },
        {
          onSuccess: () => {
            toast.success("Product updated successfully! 🚀");
            setTimeout(() => window.location.reload(), 1000);
          },
          onError: () => {
            toast.error("An error occurred. Please try again.");
          },
          onSettled: () => setIsUploading(false)
        }
      );
    } catch (error) {
      toast.error("Failed to upload images.");
      setIsUploading(false);
    }
  };

  return (
    <div className="">
      <Modalbox
        title="Refine Product Listing"
        descrip="Update specifications, pricing, and availability for your item."
        variant="ghost"
        maxWidth="md:max-w-5xl"
        btncss="p-2 hover:bg-rose-50 text-gray-500 hover:text-rose-600 transition-all rounded-xl border border-gray-100 shadow-sm"
        btnIcon={<Pencil className="w-5 h-5" />}
      >
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* ─── Column Left: Information ─── */}
              <div className="space-y-6">
                {/* ─── Basic Information ─── */}
                <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-rose-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Core Details</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-bold text-gray-700 ml-1">Product Title</Label>
                      <Input 
                        id="name" 
                        defaultValue={product?.name} 
                        className="h-12 rounded-xl border-gray-100 bg-white"
                        {...register("name", { required: "Required" })} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock" className="text-xs font-bold text-gray-700 ml-1">Available Stock</Label>
                      <Input 
                        id="stock" 
                        type="number" 
                        defaultValue={product?.stock} 
                        className="h-12 rounded-xl border-gray-100 bg-white"
                        {...register("stock", { required: "Required" })} 
                      />
                    </div>
                  </div>
                </div>

                {/* ─── Pricing & Classification ─── */}
                <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-rose-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Value & Grouping</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-xs font-bold text-gray-700 ml-1">Price (৳)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        defaultValue={product?.price} 
                        className="h-12 rounded-xl border-gray-100 bg-white"
                        {...register("price", { required: "Required" })} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discounts" className="text-xs font-bold text-gray-700 ml-1">Discount %</Label>
                      <Input 
                        id="discounts" 
                        type="number" 
                        defaultValue={product?.discounts} 
                        className="h-12 rounded-xl border-gray-100 bg-white"
                        {...register("discounts")} 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="categoryId" className="text-xs font-bold text-gray-700 ml-1 flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-rose-500" />
                        Market Category
                      </Label>
                      <select 
                        id="categoryId" 
                        defaultValue={product?.categoryId} 
                        className="w-full h-12 rounded-xl border border-gray-100 bg-white px-3 text-sm font-medium focus:ring-2 focus:ring-rose-500/20 outline-none appearance-none cursor-pointer"
                        {...register("categoryId")}
                      >
                        {categoryData?.data?.map((cat) => (
                          <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shopId" className="text-xs font-bold text-gray-700 ml-1 flex items-center gap-2">
                        <Store className="w-3.5 h-3.5 text-rose-500" />
                        Assign to Shop
                      </Label>
                      <select 
                        id="shopId" 
                        defaultValue={product?.shopId} 
                        className="w-full h-12 rounded-xl border border-gray-100 bg-white px-3 text-sm font-medium focus:ring-2 focus:ring-rose-500/20 outline-none appearance-none cursor-pointer"
                        {...register("shopId")}
                      >
                        {shopData?.data?.map((shop) => (
                          <option key={shop.shopId} value={shop.shopId}>{shop.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Column Right: Presentation ─── */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-rose-500" />
                    Product Story
                  </Label>
                  <textarea
                    id="description"
                    defaultValue={product?.description}
                    rows={6}
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-rose-500/20 outline-none transition-all resize-none"
                    {...register("description")}
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-xs font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-rose-500" />
                    Item Visuals (Updates Catalog)
                  </Label>
                  <div className="rounded-[2.5rem] border-2 border-dashed border-gray-100 bg-gray-50/30 p-2 hover:border-rose-300 hover:bg-white transition-all">
                    <FileUpload onChange={(fileList) => handleFileUpload(fileList as unknown as FileList)} />
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center mt-3">
                    Supported: JPG, PNG • Max 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Submit Action ─── */}
            <div className="pt-4 border-t border-gray-50">
              <button
                disabled={isPending || isUploading}
                type="submit"
                className="w-full h-16 rounded-2xl bg-gray-900 text-white font-black text-base hover:bg-rose-500 disabled:bg-gray-100 disabled:text-gray-400 transition-all shadow-xl hover:shadow-rose-100 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isPending || isUploading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {isUploading ? "Processing Brand Assets..." : "Updating Listing..."}
                  </>
                ) : (
                  <>
                    Confirm & Publish Updates
                    <ArrowRight className="w-5 h-5 opacity-50" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </Modalbox>
    </div>
  );
};

export default EditProduct;
