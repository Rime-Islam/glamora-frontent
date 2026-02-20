"use client";
import ProductCard from "@/components/design/ProductCard";
import { IProduct } from "@/interface/product.interface";
import { Clock, ArrowLeft, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [recentProducts, setRecentProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );
    setRecentProducts(storedProducts);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("recentProducts");
    setRecentProducts([]);
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 xl:px-0 py-8">
        {/* ─── Page Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-rose-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                Browsing History
              </p>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Recently Viewed
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-lg">
              Pick up where you left off — here are the products you&apos;ve recently
              explored.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/product"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-rose-300 hover:text-rose-500 transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Products
            </Link>
            {recentProducts.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear History
              </button>
            )}
          </div>
        </div>

        {/* ─── Products Grid ─── */}
        {recentProducts.length > 0 ? (
          <ProductCard data={recentProducts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
              <Clock className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Recent Products
            </h3>
            <p className="text-gray-400 text-sm max-w-xs mb-8">
              Products you view will appear here so you can easily find them
              again later.
            </p>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-rose-500 transition-colors duration-300 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Browsing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;