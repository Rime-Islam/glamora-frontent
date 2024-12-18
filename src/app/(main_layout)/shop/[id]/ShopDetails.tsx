"use client"
import { useSingleVendorShopWithAllProduct } from "@/hooks/shop.hook";
import { User2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import ProductCard from "@/components/design/ProductCard";
import Follow from "./Follow";

const ShopDetails = ({ id }: { id: string }) => {
    const [page, setPage] = useState(1);
    const { data: { data, meta } = {}, isLoading } =
      useSingleVendorShopWithAllProduct(id, page);
  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-y-4 border-solid border-gray-900"></div>
        </div>
      );
    }
  
    if (!data) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 text-lg">Shop details not found.</p>
        </div>
      );
    }

    return (
        <div className="mx-[3vw] mb-[5vh]">
              {/* Shop Header */}
      <div className="bg-white shadow rounded-md p-6 mb-6 ">
        <div className="flex items-center sm:flex-row gap-12 sm:items-center ">
          <Image
            src={data.images[0]}
            alt={data.name}
            width={400}
            height={400}
            className=" w-2/3"
          />
          <div className=" text-center sm:text-left">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-gray-600 text-lg mt-2">{data.location}</p>
            <div className="flex items-center gap-5">
              <p className="text-gray-400 text-md mt-1">
                Created at: {new Date(data.createdAt).toLocaleDateString()}
              </p>
              <p className="text-md flex items-center font-medium">
                <span>{data?.followers?.length}</span>
                <span>
                  <User2 className="w-4 "></User2>
                </span>
              </p>
            </div>
            <div className="mt-4 flex justify-evenly">
          <Follow data={data} id={id}></Follow>
        </div>
            <p className="mt-2">
              {data.isBlackListed && (
                <span className="font-semibold text-red-500 px-2 py-1 rounded-full bg-zinc-950">
                  Blacklisted
                </span>
              )}
            </p>
          </div>
        </div>
      
      </div>
      <div className="min-h-[58vh]">
        {/* Products Section */}
        {data.products ? (
          <ProductCard data={data.products}></ProductCard>
        ) : (
          <p className="text-xl text-center font-medium">No Product to Show</p>
        )}
      </div>
      <div className="flex justify-center">
        {meta && (
          <DynamicPagination
            meta={meta}
            onPageChange={setPage}
          ></DynamicPagination>
        )}
      </div>

        </div>
    )
};

export default ShopDetails;