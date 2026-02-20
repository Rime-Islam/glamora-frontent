"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { FileUpload } from "@/components/ui/file-upload";
import { useAddShop } from "@/hooks/shop.hook";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageArray";
import { Store, MapPin, Image as ImageIcon, PlusCircle, ArrowRight, Loader2 } from "lucide-react";

const AddShop = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = (fileList: FileList) => {
        const fileArray = Array.from(fileList);
        setFiles(fileArray);
    };

    const { mutate, isPending } = useAddShop();
    const { register, handleSubmit, formState: { errors } } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        setIsUploading(true);
        try {
            const imageUrl = await uploadImagesToCloudinary(files);

            if (imageUrl && imageUrl.length > 0) {
                mutate(
                    { ...data, images: imageUrl },
                    {
                        onSuccess: () => {
                            toast.success("Congratulations! Your shop has been created. 🏪");
                        },
                        onError: () => {
                            toast.error("You already have a shop registered!");
                        },
                        onSettled: () => setIsUploading(false)
                    }
                );
            } else {
                toast.error("Please upload at least one shop image.");
                setIsUploading(false);
            }
        } catch (error) {
            toast.error("Image upload failed. Please try again.");
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* ─── Header Section ─── */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 mb-6 shadow-sm">
                    <Store className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                    Launch Your <span className="text-rose-500">Shop</span>
                </h1>
                <p className="text-gray-500 font-medium max-w-md mx-auto">
                    Fill in the details below to create your professional storefront and start selling.
                </p>
            </div>

            {/* ─── Main Form Card ─── */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        {/* Shop Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                <Store className="w-4 h-4 text-rose-500" />
                                Shop Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. Premium Footwear Elite"
                                className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-rose-500 transition-all text-base font-medium"
                                {...register("name", { required: "Shop name is required" })}
                                required
                            />
                            {errors.name && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.name.message as string}</p>}
                        </div>

                        {/* Shop Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-rose-500" />
                                Store Location
                            </Label>
                            <Input
                                id="location"
                                placeholder="e.g. Manhattan, New York"
                                className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-rose-500 transition-all text-base font-medium"
                                {...register("location", { required: "Location is required" })}
                                required
                            />
                            {errors.location && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.location.message as string}</p>}
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-4 mb-10">
                        <Label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-rose-500" />
                            Storefront Branding
                        </Label>
                        <div className="group relative overflow-hidden rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50/30 hover:bg-white hover:border-rose-300 transition-all p-2">
                            <FileUpload onChange={(fileList) => handleFileUpload(fileList as unknown as FileList)} />
                        </div>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest text-center mt-2">
                            Recommended size: 1200x800px • Max 5MB
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={isPending || isUploading}
                        type="submit"
                        className="w-full h-16 rounded-[1.5rem] bg-gray-900 text-white font-bold text-lg hover:bg-rose-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-rose-200 flex items-center justify-center gap-3 active:scale-95"
                    >
                        {isPending || isUploading ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                {isUploading ? "Uploading Brand Assets..." : "Establishing Your Store..."}
                            </>
                        ) : (
                            <>
                                <PlusCircle className="w-6 h-6" />
                                Create My Professional Shop
                                <ArrowRight className="w-5 h-5 ml-1 opacity-50" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Tip */}
                <div className="bg-gray-50/80 px-12 py-6 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <p className="text-xs text-gray-500 font-medium">
                            Once created, you can manage products, view analytics, and handle orders from your dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddShop;