"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateCupon } from "@/hooks/cupon.hook";
import { useVendorShop } from "@/hooks/shop.hook";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
    Fingerprint, 
    Percent, 
    Calendar, 
    Store, 
    PlusCircle, 
    Loader2, 
    Sparkles 
} from "lucide-react";

const AddCoupon = () => {
    const { mutate, isPending } = useCreateCupon();
    const { data: shopData } = useVendorShop();
    const { register, handleSubmit, formState: { errors } } = useForm<any>();

    const onSubmit = async (data: any) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Marketing coupon successfully deployed! ✨");
                setTimeout(() => window.location.reload(), 1500);
            },
            onError: () => {
                toast.error("Code definition error. Please try a unique phrase.");
            },
        });
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 p-8 md:p-12 relative overflow-hidden group">
            {/* Background Decorative Sparkle */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                <Sparkles className="w-32 h-32 text-gray-900" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Coupon Code */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 ml-1">
                            <Fingerprint className="w-4 h-4 text-rose-500" />
                            <Label htmlFor="code" className="text-xs font-black uppercase tracking-widest text-gray-500">Unique Code</Label>
                        </div>
                        <Input
                            id="code"
                            placeholder="GLAMORA20"
                            type="text"
                            className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-rose-500 text-lg font-black tracking-widest uppercase placeholder:font-bold placeholder:text-gray-300"
                            {...register("code", { required: "Identify code required" })}
                            required
                        />
                    </div>

                    {/* Discount Value */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 ml-1">
                            <Percent className="w-4 h-4 text-rose-500" />
                            <Label htmlFor="discount" className="text-xs font-black uppercase tracking-widest text-gray-500">Discount Amount (%)</Label>
                        </div>
                        <Input
                            id="discount"
                            placeholder="20"
                            type="number"
                            min={1}
                            max={100}
                            className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-rose-500 text-lg font-black"
                            {...register("discount", { required: "Discount value required" })}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Expiry Date */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 ml-1">
                            <Calendar className="w-4 h-4 text-rose-500" />
                            <Label htmlFor="expiresAt" className="text-xs font-black uppercase tracking-widest text-gray-500">Expiration Date</Label>
                        </div>
                        <Input
                            id="expiresAt"
                            type="date"
                            className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-rose-500 font-bold"
                            {...register("expiresAt", { required: "Expiry target required" })}
                            required
                        />
                    </div>

                    {/* Shop Select */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 ml-1">
                            <Store className="w-4 h-4 text-rose-500" />
                            <Label htmlFor="shopId" className="text-xs font-black uppercase tracking-widest text-gray-500">Target Storefront</Label>
                        </div>
                        <select
                            id="shopId"
                            className="w-full h-14 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white px-4 text-sm font-bold focus:ring-2 focus:ring-rose-500/20 outline-none appearance-none cursor-pointer"
                            {...register("shopId", { required: "Selection required" })}
                            required
                        >
                            <option value="" disabled selected>Select Active Shop</option>
                            {shopData?.data?.map((info) => (
                                <option key={info?.name} value={info?.shopId}>{info?.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Submit Section */}
                <div className="pt-6">
                    <button
                        disabled={isPending}
                        type="submit"
                        className="w-full h-16 rounded-2xl bg-gray-900 text-white font-black text-base hover:bg-rose-500 disabled:bg-gray-100 disabled:text-gray-400 transition-all shadow-xl hover:shadow-rose-100 flex items-center justify-center gap-4 active:scale-95"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
                                Processing Deployment...
                            </>
                        ) : (
                            <>
                                <PlusCircle className="w-6 h-6" />
                                Activate Promotional Coupon
                            </>
                        )}
                    </button>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] text-center mt-6">
                        Changes will reflect globally upon activation
                    </p>
                </div>
            </form>
        </div>
    );
};

export default AddCoupon;