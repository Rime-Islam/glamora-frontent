"use client";
import OrderTable from "@/components/common/Order/OrderTable";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { useAllOrder } from "@/hooks/order.hook";
import React, { useState } from "react";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";
import { ShoppingBag, Search, Filter, Activity } from "lucide-react";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAllOrder(currentPage);
  
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
                        <ShoppingBag className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-1">Global Trade</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Transmission Ledger</h1>
                    </div>
                </div>
                <p className="text-sm font-medium text-gray-400 max-w-xl">
                    Comprehensive audit trail for all platform transactions. Monitor commercial velocity and fulfillment integrity across the global marketplace.
                </p>
            </div>

            <div className="flex items-center gap-6 p-2 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Global Volume: {data?.meta?.total || 0} Orders</span>
                </div>
            </div>
        </div>

        {/* ─── Table Section ─── */}
        <div className="relative">
            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="h-20 bg-white/50 animate-pulse rounded-3xl border border-gray-50" />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden min-h-[60vh]">
                    {data?.data && <OrderTable orderData={data.data} />}
                    {!data?.data?.length && (
                        <div className="py-32 flex flex-col items-center justify-center text-center">
                            <ShoppingBag className="w-16 h-16 text-gray-100 mb-6" />
                            <h3 className="text-xl font-black text-gray-900 mb-1">Null Transaction State</h3>
                            <p className="text-sm font-medium text-gray-400">No commercial records found in the primary ledger.</p>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* ─── Pagination ─── */}
        <div className="mt-12 flex justify-center">
            {data?.meta && data.meta.totalPage > 1 && (
                <div className="bg-white px-8 py-4 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
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

export default Page;