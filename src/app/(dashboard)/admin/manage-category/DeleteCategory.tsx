"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { toast } from "sonner";
import { useDeleteCategory } from "@/hooks/category.hook";
import { Trash2, AlertTriangle, X, ShieldAlert } from "lucide-react";

export function DeleteCategory({ category }: { category: any }) {
    const { mutate: deleteCategory, isPending } = useDeleteCategory();

    const deleteCategoryInfo = (id: string) => {
        deleteCategory(id, {
            onSuccess: () => {
                toast.success("Classification purged successfully.");
            },
            onError: () => {
                toast.error("Cleanup intercepted. Dependent objects exist.");
            },
        });
    };

    return (
        <div className="flex items-center justify-center w-full">
            <Modal>
                <ModalTrigger className="w-full bg-rose-50 text-rose-500 flex items-center justify-center group/modal-btn rounded-xl h-9 overflow-hidden relative border border-rose-100">
                  <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 text-[10px] font-black uppercase tracking-widest">
                    Delete
                  </span>
                  <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                    <Trash2 className="h-4 w-4 text-rose-600"/>
                  </div>
                </ModalTrigger>
                <ModalBody className="rounded-[3rem] border-gray-100 shadow-3xl">
                    <ModalContent>
                        <div className="p-8 py-12 text-center">
                            <div className="w-20 h-20 rounded-[2.5rem] bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-8 border border-rose-100 animate-in zoom-in duration-500">
                                <ShieldAlert className="w-10 h-10" />
                            </div>
                            
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-2">Security Override Required</p>
                            <h4 className="text-2xl font-black text-gray-900 tracking-tight mb-4">
                                Purge {category?.name}?
                            </h4>
                            <p className="text-sm font-medium text-gray-400 max-w-xs mx-auto leading-relaxed">
                                This action is permanent. All products associated with this classification may lose structural organization.
                            </p>
                        </div>
                    </ModalContent>
                    <ModalFooter className="p-8 gap-4">
                        <button 
                            className="flex-1 h-12 bg-gray-50 text-gray-500 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                            onClick={() => {}}
                        >
                            Cancel
                        </button>
                        <button 
                            disabled={isPending}
                            onClick={() => deleteCategoryInfo(category?.categoryId)} 
                            className="flex-1 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-gray-100 disabled:opacity-50"
                        >
                            {isPending ? "Purging..." : "Confirm Purge"}
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}
