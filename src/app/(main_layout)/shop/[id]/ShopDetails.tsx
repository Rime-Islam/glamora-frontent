"use client";
import { useSingleVendorShopWithAllProduct } from "@/hooks/shop.hook";
import {
  MapPin,
  Users,
  Package,
  CalendarDays,
  ShieldAlert,
  Store,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import ProductCard from "@/components/design/ProductCard";
import Follow from "./Follow";
import CardSkeleton from "@/components/skeleton/CardSkeleton";

const ShopDetails = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);
  const {
    data: { data, meta } = {},
    isLoading,
  } = useSingleVendorShopWithAllProduct(id, page);

  /* ─── Skeleton ─── */
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="animate-pulse">
          {/* Hero skeleton */}
          <div className="relative h-64 md:h-80 bg-gray-200 rounded-b-3xl" />
          {/* Stats skeleton */}
          <div className="max-w-7xl mx-auto px-4 -mt-10">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-wrap gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 w-32 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
          {/* Products skeleton */}
          <div className="max-w-7xl mx-auto px-4 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <span className="text-6xl mb-4">🏪</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Shop Not Found
        </h3>
        <p className="text-gray-400 text-sm">
          The shop you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  const productCount = data.products?.length ?? 0;
  const followerCount = data.followers?.length ?? 0;
  const joinedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen pb-10">
      {/* ─── Hero Banner ─── */}
      <div className="relative h-64 md:h-80 overflow-hidden ">
        <Image
          src={data.images[0]}
          alt={data.name}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay + gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Shop info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
                  Shop Profile
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {data.name}
              </h1>
              {data.location && (
                <div className="flex items-center gap-1.5 mt-2 text-white/80 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {data.location}
                </div>
              )}
              {data.isBlackListed && (
                <div className="flex items-center gap-1.5 mt-2 bg-red-500/90 text-white text-xs font-bold rounded-full px-3 py-1.5 w-fit">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Blacklisted Shop
                </div>
              )}
            </div>

            {/* Follow button on hero */}
            <div className="flex-shrink-0">
              <Follow data={data} id={id} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Stats Bar ─── */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            {/* Products stat */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center">
                <Package className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-gray-900">
                  {productCount}
                </p>
                <p className="text-xs text-gray-400 font-medium">Products</p>
              </div>
            </div>

            <div className="w-px h-10 bg-gray-100 hidden md:block" />

            {/* Followers stat */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-gray-900">
                  {followerCount}
                </p>
                <p className="text-xs text-gray-400 font-medium">Followers</p>
              </div>
            </div>

            <div className="w-px h-10 bg-gray-100 hidden md:block" />

            {/* Joined date */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{joinedDate}</p>
                <p className="text-xs text-gray-400 font-medium">
                  Member Since
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Products Section ─── */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 mt-10">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Browse Collection
          </p>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Products from {data.name}
          </h2>
        </div>

        {data.products?.length ? (
          <>
            <ProductCard data={data.products} />
            {meta && (
              <div className="mt-10 flex justify-center">
                <DynamicPagination
                  meta={meta}
                  onPageChange={(p) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-6xl mb-4">📦</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Products Yet
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              This shop hasn&apos;t listed any products yet. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;