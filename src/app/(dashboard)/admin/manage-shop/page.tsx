"use client";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { useAllVendorShop } from "@/hooks/shop.hook";
import React, { useState } from "react";
import ShopData from "./ShopData";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";
import { Store, ShieldCheck, Activity } from "lucide-react";

const ManageShop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAllVendorShop(currentPage, "");
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ─── Page Header ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-sm border border-rose-100">
                        <Store className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-1">Business Oversight</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Marketplace Establishments</h1>
                    </div>
                </div>
                <p className="text-sm font-medium text-gray-400 max-w-xl">
                    Monitor global storefront health, verify vendor credentials, and enforce platform standards across all active business units.
                </p>
            </div>

            <div className="flex items-center gap-6 p-2 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Census: {data?.meta?.total || 0} Shops</span>
                </div>
            </div>
        </div>

        {/* ─── Main Content Content ─── */}
        <div className="relative">
            {isLoading ? (
                <div className="grid gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="h-32 bg-white/50 animate-pulse rounded-[2.5rem] border border-gray-100" />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden min-h-[60vh]">
                    {data?.data && <ShopData Data={data?.data} />}
                </div>
            )}
        </div>

        {/* ─── Pagination ─── */}
        <div className="mt-12 flex justify-center">
            {data?.meta && data.meta.totalPage > 1 && (
                <div className="bg-white px-8 py-4 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50">
                    <DynamicPagination
                        meta={data.meta}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ManageShop;