import config from "@/config";
import React, { Suspense } from "react";
import AddCategory from "./AddCategory";
import CardSkeleton from "@/components/skeleton/CardSkeleton";


const fetchCategories = async () => {
  const res = await fetch(`${config.backendApi}/category`, {
    cache: "no-store",
    next: { tags: ["all-category"] },
  });
  const data = await res.json();
  return data.data;
};

const CategoriesContent = async () => {
  const categories = await fetchCategories();
  return <AddCategory categories={categories} />;
};



const Page = () => {

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Categories</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
        }
      >
        <CategoriesContent />
      </Suspense>
    </div>
  );
};

export default Page;