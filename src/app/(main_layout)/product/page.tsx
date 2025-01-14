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
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import CardSkeleton from "@/components/skeleton/CardSkeleton";

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
      const { data, isLoading, isFetching } = useAllProduct2(
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
    
        // Handle category selection
  const handleCategorySelect = (selectedCategoryId: string) => {
  setCategoryId(selectedCategoryId); 
  };

  const handleSortSelect = (selectedSortCriteria: string) => {
    setSortCriteria(selectedSortCriteria); 

  };
  
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
        <div className=" ">
           <div className="flex justify-between">
           <h1 className="font-bold py-5 text-xl md:text-2xl lg:text-3xl">All Products</h1>
            <div className="flex gap-2 justify-between  mb-5 ">
          {userData?.user?.role === "CUSTOMER" &&
            selectedProducts.length > 0 && (
              <div className="flex  justify-end my-4">
                <Link
                  href="/compare-product"
                  className="text-sm flex items-center gap-1 hover:underline underline-offset-2"
                >
                  <span>Compared Product</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}
          {userData?.user?.role === "CUSTOMER" && (
            <div className="flex  justify-end my-4">
              <Link
                href="/recent-products"
                className="text-sm flex items-center gap-1 hover:underline hover:text-blue-600 underline-offset-2"
              >
                <span>Recently Viewed</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
           </div>
         <div className="flex gap-5">
         <div className="max-w-48 bg-white rounded-lg ">
         <div className="p-3">
         <div className=" px-3 rounded-lg">
         <h1 className="text-lg pb-2">Search Products</h1>
         </div>
         <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
         </div>
  <div className="mb-3">
  {/* Category Options */}
  <div className="flex flex-wrap gap-2  p-3 rounded-t-lg">
    {/* All Categories (reset option) */}
    <div
      onClick={() => handleCategorySelect("")} // Reset category selection
      className={`p-2 rounded-lg cursor-pointer  ${categoryId === "" ? 'bg-gray-300' : ''}`}
    >
      All Categories
    </div>
    <div>
          {/* Category Items */}
    {category?.map(({ categoryId, name }) => (
      <div
        key={categoryId}
        onClick={() => handleCategorySelect(categoryId)} // Call handleCategorySelect
        className={`p-2 rounded-lg cursor-pointer hover:bg-gray-200 `}
      >
        {name}
      </div>
    ))}
    </div>
  </div>
</div>

      <div className="mb-3">
  {/* Sort Options */}
  <div className="flex flex-wrap gap-2">
 <div className=" p-3 rounded-lg">
 <h1 className="text-lg pb-2">Filter By Price</h1>
 <div className="bg-neutral-300 h-[1px] w-full" />
    {/* Default Sort */}
   {/* Price: High to Low */}
   <div
      onClick={() => handleSortSelect("price-desc")}
      className={`py-2 rounded-lg cursor-pointer hover:bg-gray-200 ${sortCriteria === "price-desc" ? 'bg-gray-300' : ''}`}
    >
      Price: High to Low
    </div>
    {/* Price: Low to High */}
    <div
      onClick={() => handleSortSelect("price-asc")}
      className={`py-2 rounded-lg cursor-pointer hover:bg-gray-200 ${sortCriteria === "price-asc" ? 'bg-gray-300' : ''}`}
    >
      Price: Low to High
    </div>

    <div
      onClick={() => handleSortSelect("")} // Reset sort
      className={`py-2 rounded-lg text-center cursor-pointer hover:bg-gray-200 ${!sortCriteria ? 'bg-gray-300' : ''}`}
    >
      Default
    </div>

 </div>
<div className="px-2">
<h1 className="text-lg pb-2">Filter By Ratings</h1>
 <div className="bg-neutral-300 h-[1px] w-full" />
    {/* Rating: Low to High */}
    <div
      onClick={() => handleSortSelect("rating-asc")}
      className={`p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${sortCriteria === "rating-asc" ? 'bg-gray-300' : ''}`}
    >
      Rating: Low to High
    </div>

    {/* Rating: High to Low */}
    <div
      onClick={() => handleSortSelect("rating-desc")}
      className={`p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${sortCriteria === "rating-desc" ? 'bg-gray-300' : ''}`}
    >
      Rating: High to Low
    </div>
   </div>
  </div>
</div>
            </div>
            <div className=" mb-3 max-w-full items-center space-x-2">
  

<div className="">
        {data?.data?.length ? (
          <>
           <ProductCard data={data.data} />
   {data?.meta && (
              <div className="my-8"><DynamicPagination onPageChange={setPage} meta={data.meta} /> </div>
            )}
          </>
        ) : (
          <p className="font-medium text-zinc-500 text-center mt-10">
            No Product to Display
          </p>
        )}
        </div>
        </div>
         </div>
        </div>
    )
};

export default Page;

