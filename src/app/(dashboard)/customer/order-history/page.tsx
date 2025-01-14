"use client";
import React, { useState } from "react";
import { useSigleUserAllOrder } from "@/hooks/order.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import OrderTable from "@/components/common/Order/OrderTable";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [delivaryStatus, setDelivaryStatus] = useState("");
  const { data, isLoading } = useSigleUserAllOrder(currentPage, delivaryStatus);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Fetch new data here based on the page
  };

  return (
    <div>
      <div className="mb-5 mt-2 ">
        <Select
          value={delivaryStatus || "reset"}
          onValueChange={(value) =>
            setDelivaryStatus(value === "reset" ? "" : value)
          }
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Choose Your Shop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"reset"}>All</SelectItem>
            <SelectItem value={"PENDING"}>PENDING</SelectItem>
            <SelectItem value={"ONGOING"}>ONGOING</SelectItem>
            <SelectItem value={"DELIVERED"}>DELIVERED</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="min-h-[85vh]">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <UserDataSkeleton key={index} />
          ))
        ) : (
          <> {data ? 
          <OrderTable orderData={data.data}></OrderTable>
           : <></>}</>
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