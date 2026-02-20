"use client";

import React, { useState } from "react";
import { useSigleUserAllOrder } from "@/hooks/order.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import OrderTable from "@/components/common/Order/OrderTable";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";
import { ListOrdered, Search, Filter, ShoppingBag } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [delivaryStatus, setDelivaryStatus] = useState("");
  const { data, isLoading } = useSigleUserAllOrder(currentPage, delivaryStatus);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
            History
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Order History
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your past orders, track deliveries, and view receipts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
            <Select
              value={delivaryStatus || "reset"}
              onValueChange={(value) =>
                setDelivaryStatus(value === "reset" ? "" : value)
              }
            >
              <SelectTrigger className="w-[180px] pl-9 h-11 rounded-xl border-gray-100 bg-white hover:border-rose-200 transition-all shadow-sm">
                <SelectValue placeholder="Delivery Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 shadow-xl py-1">
                <SelectItem value={"reset"} className="py-2 text-sm font-medium">All Orders</SelectItem>
                <SelectItem value={"PENDING"} className="py-2 text-sm font-medium">Pending</SelectItem>
                <SelectItem value={"ONGOING"} className="py-2 text-sm font-medium">Ongoing</SelectItem>
                <SelectItem value={"DELIVERED"} className="py-2 text-sm font-medium">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="min-h-[60vh]">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="h-4 w-32 bg-gray-100 rounded-full" />
                  <div className="h-4 w-20 bg-gray-100 rounded-full" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-3/4 bg-gray-50 rounded-full" />
                  <div className="h-3 w-1/2 bg-gray-50 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {data?.data && data.data.length > 0 ? (
              <OrderTable orderData={data.data} />
            ) : (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
                  <ListOrdered className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-400 text-sm max-w-xs mb-8">
                  {delivaryStatus 
                    ? `You don't have any orders with status "${delivaryStatus.toLocaleLowerCase()}".`
                    : "You haven't placed any orders yet. Start shopping to see your history!"}
                </p>
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-rose-500 transition-colors duration-300 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── Pagination ─── */}
      <div className="flex justify-center mt-10 pb-8">
        {data?.meta && data && (
          <DynamicPagination
            meta={data.meta}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Page;