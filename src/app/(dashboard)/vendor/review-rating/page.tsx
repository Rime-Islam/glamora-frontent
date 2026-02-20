"use client";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { useGetReviewByShop } from "@/hooks/rating.hook";
import React, { useState } from "react";
import ReviewTable from "./ReviewTable";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";
import { Star, MessageSquareQuote } from "lucide-react";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetReviewByShop(currentPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ─── Page Header ─── */}
        <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-sm border border-rose-100">
                    <Star className="w-7 h-7 fill-rose-500" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-1">Reputation Management</p>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Customer Feedbacks</h1>
                </div>
            </div>
            <p className="text-sm font-medium text-gray-400 max-w-xl">
                Engage with your customers through reviews and ratings. Building trust is the key to expanding your storefront visibility.
            </p>
        </div>

        {/* ─── Main Content ─── */}
        <div className="relative">
            {isLoading ? (
                <div className="grid gap-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="h-32 bg-white/50 animate-pulse rounded-[2rem] border border-gray-100" />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden min-h-[60vh]">
                    {data?.data && data.data.length > 0 ? (
                        <ReviewTable reviews={data.data} />
                    ) : (
                        <div className="py-32 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-[2rem] bg-gray-50 flex items-center justify-center mb-8 border border-gray-100">
                                <MessageSquareQuote className="w-10 h-10 text-gray-200" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">No Feedbacks Yet</h3>
                            <p className="text-sm font-medium text-gray-400 max-w-xs">
                                Patiently wait for your customers to share their shopping experiences.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* ─── Pagination ─── */}
        <div className="mt-12 flex justify-center">
            {data?.meta && data.meta.totalPage > 1 && (
                <div className="bg-white px-8 py-4 rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-100/50">
                    <DynamicPagination
                        meta={data?.meta}
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