"use client";
import AddProduct from "./AddProduct";
import { PackagePlus } from "lucide-react";

const ManageProduct = () => {
    return (
        <div className="animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* ─── Page Header ─── */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-sm">
                            <PackagePlus className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Inventory Management</p>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Expand Your Listing</h1>
                        </div>
                    </div>
                </div>

                {/* ─── Main Form ─── */}
                <AddProduct />
            </div>
        </div>
    );
};

export default ManageProduct;