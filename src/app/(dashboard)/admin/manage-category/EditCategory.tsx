"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUpdateCategory } from "@/hooks/category.hook";
import { Settings2, ArrowRight, X, Edit3 } from "lucide-react";

const EditCategory = ({ category }: { category: any }) => {
    const { mutate: updateCategory, isPending } = useUpdateCategory();

    const handleEdit = async (e: any) => {
        e.preventDefault();
        const categoryName = e.target.name.value;

        updateCategory(
            { id: category.categoryId, name: categoryName },
            {
                onSuccess: () => {
                    toast.success("Structural naming synchronized. ✨");
                },
                onError: () => {
                    toast.error("Operation failed. Access denied.");
                },
            }
        );
    };

    return (
        <div className="flex items-center justify-center w-full">
            <Modal>
                <ModalTrigger className="w-full bg-gray-900 text-white flex items-center justify-center group/modal-btn rounded-xl h-9 overflow-hidden relative">
                  <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 text-[10px] font-black uppercase tracking-widest">
                    Edit 
                  </span>
                  <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-rose-400 z-20">
                    <Edit3 className="h-4 w-4"/>
                  </div>
                </ModalTrigger>
                <ModalBody className="rounded-[3rem] border-gray-100 shadow-3xl">
                    <ModalContent>
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                                    <Settings2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Update</p>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Modify Category</h2>
                                </div>
                            </div>

                            <form onSubmit={handleEdit} className="space-y-8">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">New Classification Key</Label>
                                    <Input 
                                        id="name" 
                                        name="name" 
                                        defaultValue={category.name} 
                                        className="h-14 rounded-2xl border-gray-100 focus:border-rose-500 focus:ring-rose-500 transition-all font-bold"
                                        required
                                    />
                                </div>

                                <button
                                    disabled={isPending}
                                    className="w-full h-14 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-600 transition-all duration-300 shadow-xl shadow-gray-100 flex items-center justify-center gap-3 disabled:opacity-50 group/btn"
                                    type="submit"
                                >
                                    {isPending ? "Updating..." : (
                                        <>
                                            Update Registry
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </ModalContent>
                    <ModalFooter className="p-8 pt-0 gap-4">
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mr-auto">System ID: {category.categoryId.slice(0, 8)}</p>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default EditCategory;