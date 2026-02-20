"use client";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { useAllVendorShop } from "@/hooks/shop.hook";
import { IShop } from "@/interface/shop.interface";
import useDebounce from "@/lib/utils/useDebounce";
import {
  Search,
  MapPin,
  Users,
  Package,
  ArrowRight,
  Store,
  X,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import CardSkeleton from "@/components/skeleton/CardSkeleton";

const Shop = () => {
  const [searchText, setSearchText] = useState("");
  const searchTerm = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAllVendorShop(currentPage, searchTerm);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 xl:px-0 py-8">
        {/* ─── Page Header ─── */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
                Multi-Vendor Marketplace
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Explore Shops
              </h1>
              {data?.meta && (
                <p className="text-sm text-gray-400 mt-1">
                  {data.meta.total ?? ""} shops available
                </p>
              )}
            </div>

            {/* Search bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search shops…"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all shadow-sm"
              />
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ─── Shop Grid ─── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : data?.data?.length ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.data.map((shop: IShop) => (
                <Link
                  key={shop.shopId}
                  href={`/shop/${shop.shopId}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-50 overflow-hidden">
                    <Image
                      src={shop.images[0]}
                      alt={shop.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Shop name on image */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-white font-bold text-lg leading-tight drop-shadow-sm">
                        {shop.name}
                      </h3>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">
                        {shop.location || "Location not specified"}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 rounded-full px-3 py-1.5">
                        <Package className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold">
                          {shop.products?.length ?? 0} Products
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-violet-50 text-violet-600 rounded-full px-3 py-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold">
                          {shop.followers?.length ?? 0} Followers
                        </span>
                      </div>
                    </div>

                    {/* Joined date */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto">
                      <CalendarDays className="w-3 h-3" />
                      Joined{" "}
                      {new Date(shop.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    {/* Visit button */}
                    <div className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold group-hover:bg-rose-500 transition-colors duration-300">
                      <Store className="w-4 h-4" />
                      Visit Shop
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {data?.meta && (
              <div className="mt-10 flex justify-center">
                <DynamicPagination
                  meta={data.meta}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          /* ─── Empty State ─── */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-6xl mb-4">🏪</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Shops Found
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Try adjusting your search to find what you&apos;re looking for.
            </p>
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className="mt-6 px-6 py-2.5 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;