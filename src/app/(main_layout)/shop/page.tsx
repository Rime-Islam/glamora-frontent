"use client"
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import SearchInput from "@/components/common/searchSortFilter/SearchInput";
import { Button } from "@/components/ui/button";
import { useAllVendorShop } from "@/hooks/shop.hook";
import { IShop } from "@/interface/shop.interface";
import useDebounce from "@/lib/utils/useDebounce";
import { User2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";


const Shop = () => {
    const [searchText, setSearchText] = useState("");

    const searchTerm = useDebounce(searchText, 500);
  
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useAllVendorShop(currentPage, searchTerm);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    
    return (
        <>
        {isLoading ? (
          <>
            
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-y-4 border-solid border-gray-900"></div>
            </div>
          </>
        ) : (
          <>
            
            {!!data?.data?.length ? (
              <div className="container mx-auto px-4 pb-6 pt-2">
                <h1 className="text-2xl font-bold my-6 md:my-8 text-center">Shop List</h1>
                <div className="min-h-[75vh]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data?.data?.map((shop: IShop) => (
                      <div
                        key={shop.shopId}
                        className="bg-white   shadow-md rounded-lg overflow-hidden"
                      >
                        <div className="relative h-40 w-full">
                          <Image
                            src={shop.images[0]}
                            alt={shop.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            priority
                          />
                        </div>
  
                        <div className="p-4">
                          <h2 className="text-lg font-semibold">{shop.name}</h2>
                          <p className="text-sm text-gray-500">{shop.location}</p>
                          <div className="flex justify-end">
                            <p className="text-sm flex items-center font-medium">
                              <span>
                                {!!shop.followers?.length
                                  ? shop.followers?.length
                                  : 0}
                              </span>
                              <span>
                                
                                <User2 className="w-4 "></User2>
                              </span>
                            </p>
                          </div>
                          <Link href={`/shop/${shop.shopId}`}>
                            
                            <Button className="w-full mt-2 ">View Shop</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
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
            ) : (
              <p className="font-medium text-zinc-500 text-center mt-10">
                No Shop to Display
              </p>
            )}
          </>
        )}
      </>
    )
};

export default Shop;