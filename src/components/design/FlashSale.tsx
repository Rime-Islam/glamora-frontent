"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useFlashProduct } from "@/hooks/product.hook";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import CardSkeleton from "@/components/skeleton/CardSkeleton";


const FlashSale = () => {
  const { data: { data: product } = {}, isLoading } = useFlashProduct(); // Assuming `isLoading` is available
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const dataToDisplay = isMobile ? product?.slice(0, 6) : product;

  // Loader while data is being fetched
  if (isLoading) {
    return (
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
    );
  }

  // No data available
  if (!dataToDisplay?.length) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg font-medium">
          No Flash Sale Products Available
        </p>
      </div>
    );
  }

  return (
    <div className="px-[2vw] xl:px-0 mb-[5vh]">
      <div className=" flex justify-between items-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Flash Sale</h1>
        <Button className="lg:text-xl hover:text-blue-600" variant="link">
          <Link href="/flashsale">View all</Link> <ArrowRight />
        </Button>
      </div>
<div className="flex justify-center">
<div className="grid mt-4 
       grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mb-5">
        {dataToDisplay.map((data, i) => (
          <div
          key={i}
          className="relative w-60 h-66 isolate flex flex-col justify-end overflow-hidden rounded-xl pb-3 mt-5"
        >
          <Image
            width={200}
            height={100}
            src={data.product.images[0]}
            alt="Product Image"
            className="w-full h-56 object-cover rounded-lg border"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
<>
<Link href={`/product/${data?.product.productId}`} className="z-10 mt-3 px-2 hover:underline font-bold text-white">
            {data?.product.name.slice(0, 15)}...
          </Link>
</>
<div className="px-2 text-white z-50" >
<p className=" font-medium">
               {(
                 data.product.price -
                 (data.product.price * data.discount) / 100
               ).toFixed(2)}{" "}
               Tk
             </p>
             <p className="flex gap-4 ">
               <span className="line-through">
                 {data.product.price.toFixed(2)} Tk
               </span>
               <span className="text-xs text-green-500">
                 {data.discount}%
               </span>
             </p>
</div>
        </div>
        ))}
      </div>
</div>
    </div>
  );
};

export default FlashSale;
