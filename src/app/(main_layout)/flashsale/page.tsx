"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFlashProduct } from "@/hooks/product.hook";
import { IDiscount } from "@/interface/product.interface";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Zap, Clock, ArrowRight, ShoppingBag } from "lucide-react";
import { FcFlashOn } from "react-icons/fc";

const FlashSale = () => {
  const { isLoading, data: { data: products } = {} } = useFlashProduct();

  /* ─── Loading ─── */
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="px-4 xl:px-0 py-8">
          <div className="animate-pulse mb-8">
            <div className="h-5 w-40 bg-gray-200 rounded-full mb-2" />
            <div className="h-8 w-64 bg-gray-200 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 xl:px-0 py-8">
        {/* ─── Hero Banner ─── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 mb-10">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-rose-400" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-400">
                  Limited Time Offers
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                Flash Sale ⚡
              </h1>
              <p className="text-gray-400 text-sm max-w-md">
                Grab incredible deals before they&apos;re gone! These exclusive
                discounts won&apos;t last long.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3">
              <Clock className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Deals available
                </p>
                <p className="text-xl font-extrabold text-white">
                  {products?.length ?? 0}{" "}
                  <span className="text-sm font-medium text-gray-400">
                    products
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Products Grid ─── */}
        {products?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {products.map((item: IDiscount, i: number) => {
              const discountedPrice =
                item.product.price -
                (item.product.price * item.discount) / 100;
              const savings = item.product.price - discountedPrice;

              return (
                <Link
                  href={`/product/${item.product.productId}`}
                  key={i}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-gray-50 overflow-hidden">
                    <Image
                      src={item.product.images[0] as string}
                      alt={item.product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* Discount badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-rose-500 text-white text-[10px] font-bold rounded-full px-2.5 py-1 shadow-lg">
                      <FcFlashOn className="w-3 h-3" />-{item.discount}% OFF
                    </div>

                    {/* Savings badge */}
                    <div className="absolute bottom-2.5 right-2.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full px-2.5 py-1 shadow-lg">
                      Save ৳{savings.toFixed(0)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-rose-500 transition-colors">
                      {item.product.name}
                    </h3>

                    {item.product.description && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed flex-1">
                        {item.product.description.length > 65
                          ? `${item.product.description.slice(0, 65)}…`
                          : item.product.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-lg font-extrabold text-gray-900">
                        ৳{discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ৳{item.product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Flash sale indicator */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(20, item.discount * 2)
                            )}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-rose-500">
                        Hot Deal
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold group-hover:bg-rose-500 transition-colors duration-300">
                      <ShoppingBag className="w-4 h-4" />
                      Shop Now
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* ─── Empty State ─── */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
              <Zap className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Flash Sales Right Now
            </h3>
            <p className="text-gray-400 text-sm max-w-xs mb-8">
              Check back soon! Flash sales appear here with exclusive limited-time
              discounts.
            </p>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-rose-500 transition-colors duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashSale;