"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVendorShop, useVendorSingleShop } from "@/hooks/shop.hook";
import React, { useEffect, useState } from "react";
import ShopDetails from "./ShopDetailts";
import Link from "next/link";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Store, PlusCircle, LayoutGrid, AlertCircle, ShoppingBag } from "lucide-react";

const Shop = () => {
    const { data, isLoading } = useVendorShop();
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(data?.data[0]?.shopId || "");
    
    const {
      data: { data: singleShop } = {},
      isLoading: isShopDetailsLoading,
    } = useVendorSingleShop(selected, page);
  
    useEffect(() => {
      if (data?.data && data.data.length > 0 && !selected) {
        setSelected(data?.data[0]?.shopId);
      }
    }, [data, selected]);

    return (
        <div className="animate-in fade-in duration-500">
            {/* ─── Header Section ─── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 mb-2">Management</p>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <Store className="w-8 h-8 md:w-10 md:h-10 text-gray-900" />
                        My Shops
                    </h1>
                </div>

                {data?.data && data.data.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Switch Shop</label>
                        <Select
                            onValueChange={(shopId) => setSelected(shopId)}
                            value={selected}
                            disabled={!data || data?.data.length <= 0}
                        >
                            <SelectTrigger className="w-full md:w-[280px] h-12 rounded-xl border-gray-100 bg-white shadow-sm hover:border-rose-100 transition-all font-bold text-gray-700">
                                <SelectValue placeholder="Choose Your Shop" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-gray-100 shadow-xl font-medium">
                                {data?.data.map((option, i) => (
                                    <SelectItem key={i} value={option?.shopId} className="focus:bg-rose-50 focus:text-rose-600 rounded-lg">
                                        {option?.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {/* ─── Content Section ─── */}
            <div className="min-h-[60vh]">
                {isShopDetailsLoading || isLoading ? (
                    <div className="space-y-8">
                        <div className="h-48 w-full bg-gray-100 rounded-3xl animate-pulse" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <CardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {singleShop ? (
                            <ShopDetails shop={singleShop!} />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[2.5rem] border border-dashed border-gray-200 text-center animate-in zoom-in duration-300">
                                <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300 mb-6">
                                    <ShoppingBag className="w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">No Shops Found</h2>
                                <p className="text-gray-500 max-w-xs mx-auto mb-8 font-medium">
                                    You haven't established any storefronts yet. Launch your first shop to start items!
                                </p>
                                <Link 
                                    href="/vendor/manage-shop"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-rose-500 transition-all active:scale-95 shadow-lg shadow-gray-200 hover:shadow-rose-100"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    Create My First Shop
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Shop;
