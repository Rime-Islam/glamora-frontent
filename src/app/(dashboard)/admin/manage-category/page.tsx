import config from "@/config";
import React, { Suspense } from "react";
import AddCategory from "./AddCategory";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { LayoutGrid, PlusCircle } from "lucide-react";

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
    <div className="animate-in fade-in duration-1000 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ─── Page Header ─── */}
        <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-[2rem] bg-gray-900 text-white flex items-center justify-center shadow-xl">
                    <LayoutGrid className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-1">Taxonomy Control</p>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Market Categories</h1>
                </div>
            </div>
            <p className="text-sm font-medium text-gray-400 max-w-xl leading-relaxed">
                Define the structural foundation of the marketplace. Categorizing products effectively improves global search relevance and user navigation.
            </p>
        </div>

        {/* ─── Add Category Form is inside AddCategory component ─── */}
        <Suspense
            fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <div key={index} className="h-48 bg-gray-50 animate-pulse rounded-[2.5rem] border border-gray-100" />
                    ))}
                </div>
            }
        >
            <CategoriesContent />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;