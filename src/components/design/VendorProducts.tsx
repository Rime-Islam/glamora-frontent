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

  const { data, isLoading, promise } = useAllProduct(
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
    );
  }

  
  return (
    <div className="px-[2vw] lg:px-0">
      <p className="text-xl md:text-2xl lg:text-3xl font-bold ms-2"> All Products</p>
      <div className="sm:mt-0 px-2">
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

      <div className="mt-4">
        {isLoading && allProducts.length === 0 && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-y-4  border-solid border-gray-900"></div>
          </div>
        )}

        {allProducts.length > 0 ? (
          <>
            <ProductCard data={allProducts} />
           
       
            {!hasMore && !isLoading && (
              <div className="text-center text-gray-500 mt-8">
                No more products to load.
              </div>
            )}
          </>
        ) : (
          !isLoading && (
            <div className="text-center text-gray-500 mt-8">
              No products found. Try adjusting your filters.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default VendorProducts;


