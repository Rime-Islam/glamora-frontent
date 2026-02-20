"use client";
import React from "react";
import Image from "next/image";
import { IReview } from "@/interface/review.interface";
import AvarageRating from "@/components/Rating/AvarageRating";
import Reply from "./Reply";
import { MessageSquare, User, ShoppingBag } from "lucide-react";

interface ReviewTableProps {
  reviews: IReview[];
}

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50 border-b border-gray-100">
          <tr>
            <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Asset</th>
            <th className="px-6 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Catalog Item</th>
            <th className="px-6 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Contributor</th>
            <th className="px-6 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Experience</th>
            <th className="px-6 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500 px-8 text-right">Fulfillment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {reviews.map((review) => (
            <tr key={review.reviewId} className="group hover:bg-rose-50/20 transition-colors">
              {/* Product Image */}
              <td className="px-8 py-6">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                  <Image
                    fill
                    src={review?.product?.images?.[0] || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=1528&auto=format&fit=crop"}
                    alt={review?.product?.name || "Product"}
                    className="object-cover"
                  />
                </div>
              </td>

              {/* Product Name */}
              <td className="px-6 py-6">
                <div>
                  <p className="text-sm font-black text-gray-900 line-clamp-1 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
                    {review?.product?.name}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ID: {review?.reviewId.slice(0, 8)}</p>
                </div>
              </td>

              {/* Customer Name */}
              <td className="px-6 py-6">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                        <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">{review?.customer?.name || "Verified Guest"}</p>
                 </div>
              </td>

              {/* Comment & Rating */}
              <td className="px-6 py-6 max-w-md">
                <div className="bg-white/50 p-4 rounded-3xl border border-gray-100/50 group-hover:bg-white transition-colors shadow-sm">
                  <div className="mb-2">
                    <AvarageRating
                      width={70}
                      rating={review?.rating}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-600 italic line-clamp-2">
                    "{review?.comment}"
                  </p>
                  {review.vendorReply && (
                    <div className="mt-4 pt-3 border-t border-gray-50">
                        <div className="flex items-start gap-2">
                            <MessageSquare className="w-3.5 h-3.5 text-rose-500 mt-1 flex-shrink-0" />
                            <p className="text-[13px] font-bold text-gray-500 bg-gray-50/50 px-3 py-2 rounded-2xl">
                                {review.vendorReply}
                            </p>
                        </div>
                    </div>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td className="px-8 py-6 text-right">
                {review.vendorReply ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    Engagement Success
                  </div>
                ) : (
                  <Reply id={review.reviewId} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;