"use client";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { useAllVendorShop } from "@/hooks/shop.hook";
import React, { useState } from "react";
import ShopData from "./ShopData";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";

const ManageShop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAllVendorShop(currentPage, "");
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="min-h-[85vh]">
        {isLoading ? (
             Array.from({ length: 2 }).map((_, index) => (
              <UserDataSkeleton key={index} />
            ))
        ) : (
          <> {data && <ShopData Data={data?.data}></ShopData>}</>
        )}
      </div>
      <div className="flex justify-center mt-5">
        {data?.meta && data && (
          <DynamicPagination
            meta={data.meta}
            onPageChange={handlePageChange}
          ></DynamicPagination>
        )}
      </div>
    </div>
  );
};

export default ManageShop;