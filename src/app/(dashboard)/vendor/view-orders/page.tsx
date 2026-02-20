"use client";
import React, { useState } from "react";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";
import OrderTable from "@/components/common/Order/OrderTable";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVendorSingleShopOrders } from "@/hooks/order.hook";
import { 
    ShoppingBag, 
    Filter, 
    Box, 
    Truck, 
    CheckCircle2, 
    Clock,
    LayoutGrid,
    Search
} from "lucide-react";

const Page = () => {
  const [page, setPage] = useState(1);
  const [delivaryStatus, setDelivaryStatus] = useState("PENDING");
  const { data, isLoading } = useVendorSingleShopOrders(delivaryStatus, page);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
        case "PENDING": return <Clock className="w-4 h-4 text-amber-500" />;
        case "ONGOING": return <Truck className="w-4 h-4 text-blue-500" />;
        case "DELIVERED": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
        default: return <LayoutGrid className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ─── Page Header ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-sm">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Order Fulfillment</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Purchase History</h1>
                    </div>
                </div>
                <p className="text-sm font-medium text-gray-400 max-w-md">
                    Monitor and manage incoming customer demands across all your active storefronts.
                </p>
            </div>

            {/* ─── Filter Section ─── */}
            <div className="flex flex-wrap items-center gap-4 p-2 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Logistics Filter</span>
                </div>
                
                <Select
                    value={delivaryStatus || "reset"}
                    onValueChange={(value) =>
                        setDelivaryStatus(value === "reset" ? "" : value)
                    }
                >
                    <SelectTrigger className="w-[200px] h-12 rounded-2xl border-none bg-white shadow-sm ring-0 font-bold text-gray-700">
                        <div className="flex items-center gap-2">
                           {getStatusIcon(delivaryStatus)}
                           <SelectValue placeholder="All Shipments" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-gray-100 shadow-2xl">
                        <SelectItem value="reset" className="font-bold py-3">All Active Logs</SelectItem>
                        <SelectItem value="PENDING" className="font-bold py-3 text-amber-600">Pending Verification</SelectItem>
                        <SelectItem value="ONGOING" className="font-bold py-3 text-blue-600">Dispatched / Ongoing</SelectItem>
                        <SelectItem value="DELIVERED" className="font-bold py-3 text-emerald-600">Successfully Delivered</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        {/* ─── Main Content Table ─── */}
        <div className="relative">
            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-white/50 animate-pulse h-24 rounded-3xl border border-gray-50" />
                    ))}
                </div>
            ) : (
                <div className="min-h-[60vh]">
                    {data?.data && data.data.length > 0 ? (
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                            <OrderTable orderData={data.data} />
                        </div>
                    ) : (
                        <div className="py-32 flex flex-col items-center justify-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
                            <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-sm mb-6">
                                <Box className="w-8 h-8 text-gray-200" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">No shipments recorded</h3>
                            <p className="text-sm font-medium text-gray-400">Orders matching this criteria will appear here.</p>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* ─── Pagination ─── */}
        <div className="mt-12 flex justify-center">
            {data?.meta && data.meta.totalPage > 1 && (
                <div className="bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50">
                    <DynamicPagination
                        onPageChange={handlePageChange}
                        meta={data?.meta}
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Page;