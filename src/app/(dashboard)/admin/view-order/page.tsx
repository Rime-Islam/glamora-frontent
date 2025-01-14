"use client";
import OrderTable from "@/components/common/Order/OrderTable";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { useAllOrder } from "@/hooks/order.hook";
import React, { useState } from "react";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAllOrder(currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="min-h-[84vh]">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <UserDataSkeleton key={index} />
          ))
        ) : (
          <> {data && <OrderTable orderData={data.data}></OrderTable>}</>
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

export default Page;