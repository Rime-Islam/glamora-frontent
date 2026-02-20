"use client";
import Image from "next/image";
import { ArrowRight, Zap, Clock } from "lucide-react";
import { useFlashProduct } from "@/hooks/product.hook";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { useState, useEffect } from "react";

/* ── Countdown Timer ── */
const Countdown = () => {
  const [time, setTime] = useState({ h: 5, m: 59, s: 59 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        if (t.s > 0) return { ...t, s: t.s - 1 };
        if (t.m > 0) return { ...t, m: t.m - 1, s: 59 };
        if (t.h > 0) return { h: t.h - 1, m: 59, s: 59 };
        return t;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-1.5">
      {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="bg-gray-900 text-white text-xs font-bold rounded px-2 py-1 min-w-[28px] text-center tabular-nums">
            {v}
          </span>
          {i < 2 && <span className="text-gray-900 font-bold text-sm">:</span>}
        </span>
      ))}
    </div>
  );
};

const FlashSale = () => {
  const { data: { data: product } = {}, isLoading } = useFlashProduct();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const dataToDisplay = isMobile ? product?.slice(0, 6) : product;

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 xl:px-0 py-10">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </section>
    );
  }

  if (!dataToDisplay?.length) return null;

  return (
    <section className="bg-white py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Flash Sale
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span className="mr-1">Ends in</span>
              <Countdown />
            </div>
          </div>
          <Link
            href="/flashsale"
            className="flex items-center gap-1.5 text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Countdown on mobile */}
        <div className="flex sm:hidden items-center gap-2 text-gray-500 text-xs mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>Ends in</span>
          <Countdown />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dataToDisplay.map((data, i) => {
            const discounted = (
              data.product.price - (data.product.price * data.discount) / 100
            ).toFixed(2);

            return (
              <Link
                key={i}
                href={`/product/${data?.product.productId}`}
                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300"
              >
                {/* Discount badge */}
                <div className="absolute top-2.5 left-2.5 z-10 bg-rose-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                  -{data.discount}%
                </div>

                {/* Image */}
                <div className="relative h-44 bg-gray-50 overflow-hidden">
                  <Image
                    src={data.product.images[0]}
                    alt={data.product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-rose-500 transition-colors">
                    {data.product.name.slice(0, 20)}{data.product.name.length > 20 ? "…" : ""}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-extrabold text-gray-900">
                      ৳{discounted}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ৳{data.product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
