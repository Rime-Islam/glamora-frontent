"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useFlashProduct } from "@/hooks/product.hook";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";


const FlashSale = () => {
  const { data: { data: product } = {}, isLoading } = useFlashProduct(); // Assuming `isLoading` is available
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const dataToDisplay = isMobile ? product?.slice(0, 6) : product;

  // Loader while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-y-4  border-solid border-gray-900"></div>
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
    <div className="max-w-full mb-[5vh]">
      <div className="w-full px-[5vh] flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Flash Sale</h1>
        <Button className="text-xl hover:text-blue-600" variant="link">
          <Link href="/flashsale">View all</Link> <ArrowRight />
        </Button>
      </div>

      <div className="grid mt-4 justify-items-center px-[2vw]
       sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2   mx-auto  overflow-hidden mb-2">
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
  );
};

export default FlashSale;
