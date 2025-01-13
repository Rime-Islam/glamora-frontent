"use client";

import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { useAllCategory } from "@/hooks/category.hook";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setCategoryId } from "@/redux/features/cart/cartSlice";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Search for the product categorys...",
    "Find the best lipstick for every occasion",
  ];
      
  const router = useRouter();
  const { data: categoryData } = useAllCategory(); 
  const [searchTerm, setSearchTerm] = useState("");

 const dispatch = useAppDispatch();


  const handleSearchSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const matchedCategory = categoryData?.data?.find(
        (category) => category.name.toLowerCase() === searchTerm.toLowerCase()
      );

      if (matchedCategory) {
        const { categoryId } = matchedCategory;
  
        // Dispatch the matched categoryId to Redux
        await dispatch(setCategoryId(categoryId));
        router.push(`/product`);
    } else {
        router.push(`/product`);
      }
  };
  return (
    <div className="w-[30vw] flex flex-col justify-center  items-center px-4">
    
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSubmit={handleSearchSubmit}
      />
    </div>
  );
}
