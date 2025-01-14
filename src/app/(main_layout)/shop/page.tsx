"use client"
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import { Button } from "@/components/ui/button";
import { useAllVendorShop } from "@/hooks/shop.hook";
import { IShop } from "@/interface/shop.interface";
import useDebounce from "@/lib/utils/useDebounce";
import { User2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { AiOutlineProduct } from "react-icons/ai";
import CardSkeleton from "@/components/skeleton/CardSkeleton";

const Shop = () => {
    const [searchText, setSearchText] = useState("");
    const searchTerm = useDebounce(searchText, 500);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useAllVendorShop(currentPage, searchTerm);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
  

    return (
        <div className="">
        {isLoading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {Array.from({ length: 4 }).map((_, index) => (
             <CardSkeleton key={index} />
           ))}
         </div>
        ) : (
          <div>
            
            {!!data?.data?.length ? (
              <div className=" px-4 pb-6 pt-2">
                <h1 className=" text-xl md:text-2xl lg:text-3xl my-6 md:my-8 ">Shop List</h1>
                <div className="">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                         <div className="flex gap-2">
                         <h2 className="text-lg font-semibold">{shop.name}</h2>
                          <p className="text-sm mt-1 text-gray-500">
      
      ({new Date(shop.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      })})
    </p>
                         </div>
                          <p className="text-sm text-gray-500">{shop.location} </p>
                         
                          <div className="flex justify-end gap-5">
                            <p className="text-sm flex items-center font-medium">
                              <span>
                                {!!shop.products?.length
                                  ? shop.products?.length
                                  : 0}
                              </span>
                              <span>
                                
                              <AiOutlineProduct  />
                              </span>
                            </p>
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
                
                <div className="flex justify-center mt-[5vh]">
                  {data?.meta && (
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
          </div>
        )}
      </div>
    )
};

export default Shop;