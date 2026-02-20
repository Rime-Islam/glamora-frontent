"use client";
import { useAllCategory2 } from "@/hooks/category.hook";
import { useAllProduct2 } from "@/hooks/product.hook";
import { AuthContext } from "@/providers/AuthProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useContext, useEffect, useState } from "react";
import { setCategoryId as setCId } from "@/redux/features/cart/cartSlice";
import { useFilterSortSearch } from "@/lib/utils/hook/useFilterSortSearch";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import ProductCard from "@/components/design/ProductCard";
import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import CardSkeleton from "@/components/skeleton/CardSkeleton";

/* ─── Sort options ─── */
const SORT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Rating: High → Low", value: "rating-desc" },
  { label: "Rating: Low → High", value: "rating-asc" },
];

const Page = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortCriteria,
    setSortCriteria,
    categoryId,
    setCategoryId,
    debouncedSearchTerm,
  } = useFilterSortSearch();

  const userData = useContext(AuthContext);
  const { data: { data: category } = {} } = useAllCategory2();
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, isLoading } = useAllProduct2(
    debouncedSearchTerm || "",
    categoryId || "",
    sortCriteria || "",
    page || 1
  );

  const dispatch = useAppDispatch();
  const { categoryId: storedCategoryId } = useAppSelector(
    (state) => state.cartSlice
  );
  const { selectedProducts } = useAppSelector((state) => state.compareSlice);

  useEffect(() => {
    if (storedCategoryId) {
      dispatch(setCId(""));
      setCategoryId(storedCategoryId);
    }
  }, [storedCategoryId, setCategoryId, dispatch]);

  /* ─── Sidebar panel (shared between mobile drawer and desktop) ─── */
  const SidebarContent = () => (
    <div className="space-y-3">
      {/* Search */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Search
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Category
        </p>
        <div className="space-y-1">
          <button
            onClick={() => setCategoryId("")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all font-medium ${
              categoryId === ""
                ? "bg-rose-50 text-rose-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Categories
          </button>
          {category?.map(({ categoryId: cid, name }) => (
            <button
              key={cid}
              onClick={() => setCategoryId(cid)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                categoryId === cid
                  ? "bg-rose-50 text-rose-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Sort By Price
        </p>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortCriteria(opt.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                sortCriteria === opt.value
                  ? "bg-rose-50 text-rose-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      {(searchTerm || categoryId || sortCriteria) && (
        <button
          onClick={() => {
            setSearchTerm("");
            setCategoryId("");
            setSortCriteria("");
          }}
          className="w-full py-2 rounded-xl border border-rose-200 text-rose-500 text-sm font-semibold hover:bg-rose-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full bg-white shadow-2xl  overflow-y-auto z-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="px-4 xl:px-0 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
              Glamora Store
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              All Products
            </h1>
            {data?.meta && (
              <p className="text-sm text-gray-400 mt-1">
                {data.meta.total ?? ""} products found
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-rose-300 hover:text-rose-500 transition-colors shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Customer quick links */}
            {userData?.user?.role === "CUSTOMER" && (
              <div className="hidden sm:flex items-center gap-3">
                {selectedProducts.length > 0 && (
                  <Link
                    href="/compare-product"
                    className="flex items-center gap-1.5 text-sm font-semibold text-violet-500 hover:text-violet-600 transition-colors"
                  >
                    Compare ({selectedProducts.length})
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <Link
                  href="/recent-products"
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-rose-500 transition-colors"
                >
                  Recently Viewed
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Layout */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-24">
              <SidebarContent />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : data?.data?.length ? (
              <>
                <ProductCard data={data.data} />
                {data?.meta && (
                  <div className="mt-10 flex justify-center">
                    <DynamicPagination
                      onPageChange={(p) => {
                        setPage(p);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      meta={data.meta}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-6xl mb-4">🔍</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryId("");
                    setSortCriteria("");
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
