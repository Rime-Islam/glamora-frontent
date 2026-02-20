"use client";
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
import { 
    Package, 
    Tag, 
    Database, 
    Store, 
    AlignLeft, 
    Image as ImageIcon, 
    PlusCircle, 
    Loader2, 
    ArrowRight 
} from "lucide-react";

const AddProduct = () => {
    const { data: categoryData } = useAllCategoryDashboard();
    const { mutate, isPending } = useAddProduct();
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
        try {
            const imageUrl = await uploadImagesToCloudinary(files);

            if (imageUrl) {
                mutate(
                    { ...formData, images: imageUrl },
                    {
                        onSuccess: () => {
                            toast.success("Product successfully added to catalog! ✨");
                            setTimeout(() => window.location.reload(), 1000);
                        },
                        onError: () => {
                            toast.error("An error occurred. Check for duplicate listings.");
                        },
                        onSettled: () => setIsUploading(false)
                    }
                );
            } else {
                toast.error("Please provide at least one product visual.");
                setIsUploading(false);
            }
        } catch (error) {
            toast.error("Asset upload failed. Please try again.");
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* ─── Left Column: Specifications ─── */}
                    <div className="space-y-8">
                        {/* Core Details */}
                        <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 space-y-6">
                            <div className="flex items-center gap-3">
                                <Package className="w-5 h-5 text-rose-500" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Core Listing Details</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold text-gray-600 ml-1">Product Title</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Classic Leather Sneakers v2"
                                        className="h-14 rounded-2xl border-gray-100 bg-white focus:ring-rose-500 transition-all font-medium"
                                        {...register("name", { required: "Name is required" })}
                                        required
                                    />
                                    {errors.name && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.name.message as string}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className="text-xs font-bold text-gray-600 ml-1">Price (৳)</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            placeholder="2,400"
                                            className="h-14 rounded-2xl border-gray-100 bg-white"
                                            {...register("price", { required: "Price is required" })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="discounts" className="text-xs font-bold text-gray-600 ml-1">Discount %</Label>
                                        <Input
                                            id="discounts"
                                            type="number"
                                            placeholder="15"
                                            className="h-14 rounded-2xl border-gray-100 bg-white"
                                            {...register("discounts")}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stock" className="text-xs font-bold text-gray-600 ml-1">Initial Stock Count</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        placeholder="100"
                                        className="h-14 rounded-2xl border-gray-100 bg-white"
                                        {...register("stock", { required: "Stock is required" })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Classification */}
                        <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 space-y-6">
                            <div className="flex items-center gap-3">
                                <Database className="w-5 h-5 text-rose-500" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Classification</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="categoryId" className="text-xs font-bold text-gray-600 ml-1">Market Category</Label>
                                    <select
                                        id="categoryId"
                                        className="w-full h-14 rounded-2xl border border-gray-100 bg-white px-4 text-sm font-bold focus:ring-2 focus:ring-rose-500/20 outline-none appearance-none cursor-pointer"
                                        {...register("categoryId", { required: "Category is required" })}
                                        required
                                    >
                                        <option value="" disabled selected>Choose Category</option>
                                        {categoryData?.data?.map((info) => (
                                            <option key={info?.name} value={info?.categoryId}>{info?.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="shopId" className="text-xs font-bold text-gray-600 ml-1">Distributing Shop</Label>
                                    <select
                                        id="shopId"
                                        className="w-full h-14 rounded-2xl border border-gray-100 bg-white px-4 text-sm font-bold focus:ring-2 focus:ring-rose-500/20 outline-none appearance-none cursor-pointer"
                                        {...register("shopId", { required: "Shop is required" })}
                                        required
                                    >
                                        <option value="" disabled selected>Assign to Shop</option>
                                        {shopData?.data?.map((info) => (
                                            <option key={info?.name} value={info?.shopId}>{info?.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── Right Column: Presentation ─── */}
                    <div className="space-y-8">
                        {/* Narrative */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <AlignLeft className="w-5 h-5 text-rose-500" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 ml-1">Product Narrative</h2>
                            </div>
                            <textarea
                                id="description"
                                rows={8}
                                placeholder="Describe the craftsmanship, materials, and unique selling points..."
                                className="w-full rounded-[2rem] border border-gray-100 bg-gray-50/50 p-6 text-base font-medium focus:bg-white focus:ring-2 focus:ring-rose-500/20 outline-none transition-all resize-none"
                                {...register("description", { required: "Description is required" })}
                                required
                            />
                        </div>

                        {/* Media */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <ImageIcon className="w-5 h-5 text-rose-500" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 ml-1">Primary Imagery</h2>
                            </div>
                            <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-dashed border-gray-100 bg-gray-50/30 hover:bg-white hover:border-rose-300 transition-all p-2">
                                <FileUpload onChange={(fileList) => handleFileUpload(fileList as unknown as FileList)} />
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] text-center mt-4">
                                Highest priority image will be used as thumbnail
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── Action Section ─── */}
                <div className="pt-10 border-t border-gray-50 flex justify-end">
                    <button
                        disabled={isPending || isUploading}
                        type="submit"
                        className="w-full lg:w-max min-w-[300px] h-16 rounded-2xl bg-gray-900 text-white font-black text-lg hover:bg-rose-500 disabled:bg-gray-100 disabled:text-gray-400 transition-all shadow-xl hover:shadow-rose-100 flex items-center justify-center gap-4 active:scale-95 px-10"
                    >
                        {isPending || isUploading ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
                                {isUploading ? "Uploading Brand Assets..." : "Creating Listing..."}
                            </>
                        ) : (
                            <>
                                <PlusCircle className="w-6 h-6" />
                                Publish to Storefront
                                <ArrowRight className="w-5 h-5 opacity-50 ml-2" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;