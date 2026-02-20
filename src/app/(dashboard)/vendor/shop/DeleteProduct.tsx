"use client";
import { Modalbox } from "@/components/common/modal/Modalbox";
import { DialogClose } from "@/components/ui/dialog";
import { useDeleteProduct } from "@/hooks/product.hook";
import { toast } from "sonner";
import { Trash2, AlertTriangle, X, Trash } from "lucide-react";

const DeleteProduct = ({ id }: { id: string }) => {
    const { mutate, isPending } = useDeleteProduct();

    const handleDelete = () => {
        mutate(id, {
            onSuccess: () => {
                toast.success("Product removed from inventory. 🗑️");
                setTimeout(() => window.location.reload(), 1000);
            },
            onError: () => {
                toast.error("Unable to delete product. Access denied.");
            },
        });
    };

    return (
        <div>
            <Modalbox
                title="Permanent Deletion"
                descrip="This action cannot be undone. Are you absolutely sure you want to remove this product from your shop?"
                variant="ghost"
                btncss="p-2 hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-all rounded-xl border border-gray-100 shadow-sm"
                btnIcon={<Trash2 className="w-5 h-5" />}
            >
                <div className="mt-6 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6 animate-pulse">
                        <AlertTriangle className="w-8 h-8" />
                    </div>

                    <div className="flex gap-4 w-full">
                        <DialogClose className="flex-1">
                            <button className="w-full py-3.5 rounded-2xl bg-gray-50 text-gray-500 font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                                <X className="w-4 h-4" />
                                Preserve
                            </button>
                        </DialogClose>
                        <DialogClose className="flex-1" onClick={handleDelete}>
                            <button 
                                disabled={isPending}
                                className="w-full py-3.5 rounded-2xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 flex items-center justify-center gap-2"
                            >
                                <Trash className="w-4 h-4" />
                                {isPending ? "Removing..." : "Delete Permanently"}
                            </button>
                        </DialogClose>
                    </div>
                </div>
            </Modalbox>
        </div>
    );
};

export default DeleteProduct;