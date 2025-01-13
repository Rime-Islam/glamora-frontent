"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFlashProduct } from "@/hooks/product.hook";


const FlashSale = () => {
  const { data: { data: product } = {} } = useFlashProduct();
  return (
    <div className="">
      <h1 className="md:ml-4 lg:ml-8 pt-8 text-3xl font-semibold text-center md:text-start">Flash Sale Products</h1>
     <div className="flex justify-center">
     <div className="grid mt-8 
       grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 overflow-hidden mb-2">
        {product?.map((data, i) => (
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
<Link href={`/product/${data?.product.productId}`} className="z-10 mt-3 px-2 hover:underline hover:text-orange-500 font-bold text-white">
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