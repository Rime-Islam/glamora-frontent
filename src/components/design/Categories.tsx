"use client";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useAllCategory } from "@/hooks/category.hook";
import { useAppDispatch } from "@/redux/hook";
import { setCategoryId } from "@/redux/features/cart/cartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Skeleton } from "../ui/skeleton";

/* Emoji map for categories — fallback to 🏷️ */
const CATEGORY_EMOJI: Record<string, string> = {
  lipstick: "💄",
  foundation: "🧴",
  mascara: "👁️",
  perfume: "🌸",
  skincare: "✨",
  eyeshadow: "🎨",
  blush: "🌹",
  concealer: "🫧",
  highlighter: "⭐",
  serum: "💧",
  moisturizer: "🧖",
  sunscreen: "☀️",
  toner: "🌿",
  "face wash": "🫧",
  nail: "💅",
  hair: "💇",
};

const getEmoji = (name: string) => {
  const lower = name.toLowerCase();
  return (
    Object.entries(CATEGORY_EMOJI).find(([k]) => lower.includes(k))?.[1] ?? "🏷️"
  );
};

const pastelPalette = [
  { bg: "#FFF1F2", ring: "#FDA4AF" },
  { bg: "#FFF7ED", ring: "#FDBA74" },
  { bg: "#FEFCE8", ring: "#FDE047" },
  { bg: "#F0FDF4", ring: "#86EFAC" },
  { bg: "#EFF6FF", ring: "#93C5FD" },
  { bg: "#F5F3FF", ring: "#C4B5FD" },
  { bg: "#FDF4FF", ring: "#E879F9" },
  { bg: "#FFF1F2", ring: "#FB7185" },
];

const Categories = () => {
  const { data, isLoading } = useAllCategory();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-36 rounded-2xl flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data?.data?.length) return null;

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
              Collections
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Browse By Category
            </h2>
          </div>
        </div>

        <Swiper
          slidesPerView={2.3}
          spaceBetween={12}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 3.3, spaceBetween: 14 },
            640: { slidesPerView: 4.2, spaceBetween: 16 },
            768: { slidesPerView: 5.2, spaceBetween: 18 },
            1024: { slidesPerView: 6.2, spaceBetween: 16 },
            1280: { slidesPerView: 7, spaceBetween: 16 },
          }}
          modules={[Pagination, Autoplay]}
          className="pb-8"
        >
          {data?.data?.map(({ categoryId, name, product }, idx) => {
            const palette = pastelPalette[idx % pastelPalette.length];
            return (
              <SwiperSlide key={categoryId}>
                <Link
                  href="/product"
                  onClick={() => dispatch(setCategoryId(categoryId))}
                  className="group flex flex-col items-center"
                >
                  {/* Circle icon */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    backgroundColor: palette.bg,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: palette.ring,
                  }}
                  >
                    {getEmoji(name)}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-rose-500 transition-colors text-center line-clamp-1 max-w-[80px]">
                    {name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {product?.length ?? 0} items
                  </p>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;