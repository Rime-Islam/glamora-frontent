"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAddCategory } from "@/hooks/category.hook";
import { ICategory } from "@/interface/category.interface";
import { DeleteCategory } from "./DeleteCategory";
import EditCategory from "./EditCategory";
import { 
    PlusCircle, 
    Layers, 
    Calendar, 
    RefreshCcw, 
    Shapes,
    ArrowRight,
    Zap
} from "lucide-react";

const AddCategory = ({ categories }: { categories: ICategory[] }) => {
    const { mutate, isPending } = useAddCategory();

    const addCategory = async (e: any) => {
        e.preventDefault();
        mutate(e.target.name.value, {
            onSuccess: () => {
                toast.success("New classification deployment successful. ✨");
                e.target.reset();
            },
            onError: () => {
                toast.error("Naming conflict detected. Verification required.");
            },
        });
    };

    return (
        <div className="space-y-20">
            {/* ─── Creation Section ─── */}
            <div className="max-w-xl mx-auto">
                <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                        <PlusCircle className="w-40 h-40" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-200">
                                <PlusCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Deploy Category</h2>
                        </div>

                        <form onSubmit={addCategory} className="space-y-8">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Official Assignment Name</Label>
                                <Input 
                                    id="name" 
                                    name="name" 
                                    placeholder="e.g. Advanced Logistics, Premium Apparel..." 
                                    className="h-14 rounded-2xl border-gray-100 focus:border-rose-500 focus:ring-rose-500 transition-all text-sm font-bold placeholder:font-medium"
                                    required
                                />
                            </div>

                            <button
                                disabled={isPending}
                                className="w-full h-14 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-600 transition-all duration-300 shadow-xl shadow-gray-100 flex items-center justify-center gap-3 disabled:opacity-50 group/btn"
                                type="submit"
                            >
                                {isPending ? "Syncing..." : (
                                    <>
                                        Authorize Creation
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* ─── Registry Section ─── */}
            <div className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                        <Shapes className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Global Taxonomy Archive</h3>
                </div>

                {!categories || categories.length === 0 ? (
                    <div className="py-24 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                        <Zap className="w-12 h-12 text-gray-200 mb-4" />
                        <h4 className="text-lg font-black text-gray-900 mb-1">Archive Empty</h4>
                        <p className="text-sm font-medium text-gray-400">No organizational classifications detected.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <div key={category?.categoryId} className="group bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/40 hover:border-rose-200 hover:shadow-rose-100/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
                                {/* Ghost Typography */}
                                <div className="absolute -top-4 -right-4 opacity-[0.02] rotate-12 group-hover:rotate-6 transition-transform duration-700">
                                    <Layers className="w-40 h-40" />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-rose-50 group-hover:text-rose-500 transition-all">
                                            <Layers className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-black text-gray-900 tracking-tight mb-8 group-hover:text-rose-600 transition-colors">
                                        {category?.name}
                                    </h4>

                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center gap-3">
                                        <div className="flex-1">
                                            <EditCategory category={category} />
                                        </div>
                                        <div className="flex-1">
                                            <DeleteCategory category={category}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddCategory;