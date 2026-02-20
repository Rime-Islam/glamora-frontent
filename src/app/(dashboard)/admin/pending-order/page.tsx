"use client";
import OrderTable from "@/components/common/Order/OrderTable";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { usePendingOrder } from "@/hooks/order.hook";
import React, { useState } from "react";
import { Clock, AlertCircle, ShieldCheck, Activity } from "lucide-react";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = usePendingOrder(currentPage);

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
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-sm border border-amber-100">
                        <Clock className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 mb-1">Queue Management</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Pending Authorizations</h1>
                    </div>
                </div>
                <p className="text-sm font-medium text-gray-400 max-w-xl">
                    Transactions awaiting administrative validation or fulfillment status updates. Prioritize queue clearance to maintain platform liquidity.
                </p>
            </div>

            <div className="flex items-center gap-6 p-2 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Queue Depth: {data?.meta?.total || 0} Criticals</span>
                </div>
            </div>
        </div>

        {/* ─── Table Section ─── */}
        <div className="relative">
            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="h-20 bg-white/50 animate-pulse rounded-3xl border border-gray-50" />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden min-h-[60vh]">
                    {data?.data && data.data.length > 0 ? (
                        <OrderTable action={true} orderData={data.data} />
                    ) : (
                        <div className="py-32 flex flex-col items-center justify-center text-center">
                            <ShieldCheck className="w-16 h-16 text-emerald-100 mb-6" />
                            <h3 className="text-xl font-black text-gray-900 mb-1">Queue Synchronized</h3>
                            <p className="text-sm font-medium text-gray-400">All commercial authorizations are current. Primary ledger is clear.</p>
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