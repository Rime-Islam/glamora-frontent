"use client";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVendorShop, useVendorSingleShop } from "@/hooks/shop.hook";
import React, { useEffect, useState } from "react";
import ShopDetails from "./ShopDetailts";
import Link from "next/link";
import CardSkeleton from "@/components/skeleton/CardSkeleton";


const Shop = () => {
    const { data, isLoading } = useVendorShop();
    const [page, setPage] = useState(1);
    const handlePageChange = (page: number) => {
        setPage(page);
      };
    const [selected, setSelected] = useState(data?.data[0]?.shopId || "");
    const {
      data: { data: singleShop, meta } = {},
      isLoading: isShopDetailsLoading,
    } = useVendorSingleShop(selected, page);
  
    useEffect(() => {
      if (data?.data[0]?.shopId) {
        setSelected(data?.data[0]?.shopId);
      }
    }, [data, isLoading]);

    return (
        <div>
             <div className="mb-5 mt-2 ">
        <Select
          onValueChange={(shopId) => setSelected(shopId)}
          value={selected}
          disabled={!data || data?.data.length <= 0}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Choose Your Shop" />
          </SelectTrigger>
          <SelectContent>
            {data?.data.map((option, i) => (
              <SelectItem key={i} value={option?.shopId}>
                {option?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
             

      <div className="min-h-[78vh]">
        {isShopDetailsLoading || isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {singleShop ? (
              <ShopDetails shop={singleShop!}></ShopDetails>
            ) : (
              <div className=" mt-2  h-10 flex justify-center shadow-inner">
                <p className="font-medium text-zinc-500 mt-3">
                  You have no Shop, <Link className="hover:underline font-semibold text-blue-500" href="/vendor/manage-shop">Create a shop</Link>
                </p>
              </div>
            )}
          </>
        )}
      </div>


        </div>
    )
};

export default Shop;