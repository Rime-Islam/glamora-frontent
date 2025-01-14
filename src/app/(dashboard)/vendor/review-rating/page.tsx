"use client";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { useGetReviewByShop } from "@/hooks/rating.hook";
import React, { useState } from "react";
import ReviewTable from "./ReviewTable";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";


const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetReviewByShop(currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Fetch new data here based on the page
  };
  return (
    <div>
      <div className="min-h-[85vh]">
        {isLoading ? (
           Array.from({ length: 5 }).map((_, index) => (
            <UserDataSkeleton key={index} />
          ))
        ) : (
          <> {data && <ReviewTable reviews={data?.data}></ReviewTable>}</>
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