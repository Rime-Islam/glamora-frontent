"use client";
import ProductCard from "@/components/design/ProductCard";
import { IProduct } from "@/interface/product.interface";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [recentProducts, setRecentProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );
    setRecentProducts(storedProducts);
  }, []);

  return (
    <div className="px-[3vw] mt-[18vh]">
   <h1 className=" pt-8 text-3xl font-semibold">Recently Viewed Products</h1>
<p className=" text-gray-600 mb-8">
  Take another look at the products you've recently explored. We're here to help you find the perfect fit for your needs and make informed decisions about your favorites.
</p>
<ProductCard data={recentProducts} />
    </div>
  );
};

export default Page;