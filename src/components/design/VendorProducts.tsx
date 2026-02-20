"use client";
import React, { useState, useEffect } from "react";
import { useAllProduct } from "@/hooks/product.hook";
import { useAllCategory } from "@/hooks/category.hook";
import { useFilterSortSearch } from "@/lib/utils/hook/useFilterSortSearch";
import { IProduct } from "@/interface/product.interface";
import ProductCard from "./ProductCard";
import SearchSortFilter from "../common/searchSortFilter/SearchSortFilter";
import CardSkeleton from "@/components/skeleton/CardSkeleton";


const VendorProducts = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortCriteria,
    setSortCriteria,
    categoryId,
    setCategoryId,
    debouncedSearchTerm,
  } = useFilterSortSearch();

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data: { data: categories } = {} } = useAllCategory();

  const { data, isLoading } = useAllProduct(
    debouncedSearchTerm || "",
    categoryId || "",
    sortCriteria || "",
    page || 1
  );

  useEffect(() => {
    setAllProducts([]);
  }, [categoryId, sortCriteria]);

  useEffect(() => {
    if (data?.data) {
      setAllProducts((prevProducts) => [
        ...prevProducts,
        ...data.data.filter(
          (newProduct) =>
            !prevProducts.some(
              (prevProduct) => prevProduct.productId === newProduct.productId
            )
        ),
      ]);
      setHasMore((data?.meta?.page || 1) < (data?.meta?.totalPage || 1));
    }
  }, [data]);

  if (isLoading && allProducts.length === 0) {
    return (
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Our Collection
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            All Products
          </h2>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <SearchSortFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortCriteria={sortCriteria}
            onSortChange={setSortCriteria}
            categoryId={categoryId}
            onCategoryChange={setCategoryId}
            categoryOptions={categories || []}
          />
        </div>

        {/* Products */}
        <div className="mt-4">
          {isLoading && allProducts.length === 0 && (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-y-4 border-solid border-rose-500" />
            </div>
          )}

          {allProducts.length > 0 ? (
            <>
              <ProductCard data={allProducts} />
              {!hasMore && !isLoading && (
                <div className="text-center text-gray-400 text-sm mt-10 py-4 border-t border-gray-100">
                  ✓ You&apos;ve seen all products
                </div>
              )}
            </>
          ) : (
            !isLoading && (
              <div className="text-center py-20">
                <span className="text-5xl mb-4 block">🔍</span>
                <p className="text-gray-500 font-medium">No products found.</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters.</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default VendorProducts;
