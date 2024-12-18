"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAddCategory } from "@/hooks/category.hook";
import { ICategory } from "@/interface/category.interface";
import { Meteors } from "@/components/ui/meteors";
import { DeleteCategory } from "./DeleteCategory";
import EditCategory from "./EditCategory";



const AddCategory = ({ categories }: { categories: ICategory[] }) => {
    const { mutate, isPending } = useAddCategory();
    if (!categories || categories.length === 0) {
      return <div className="text-lg font-semibold">No Category Available</div>;
    }

  const addCategory = async (e: any) => {
    e.preventDefault();
    
    mutate(e.target.name.value, {
      onSuccess: () => {
        toast.success("Category added.");
      },
      onError: () => {
        toast.error("Duplicate Category! Try Again.");
      },
    });
  };

  
    return (
 <div>
           <div className="max-w-lg border w-full mx-auto mt-[5vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div>
      <form onSubmit={addCategory} className="my-8" >
            <h1 className="mb-8 text-xl font-bold">Create A Category</h1>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Category Name</Label>
            <Input id="name" name="name" placeholder="Add A Category Name" type="text" 
          required/>
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br mt-8 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Create Category
            <BottomGradient />
          </button>
        </form>
      </div>
      </div>

      {/* category cards  */}
     

   <div className="grid grid-cols-1 sm:grid-cols-2 mt-[5vh] md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
   {
       categories?.length ? categories?.map((category) => (
        <div key={category?.categoryId} className="p-2">
       <div className=" w-full relative max-w-xs h-88">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>
 
          <h1 className="font-bold text-xl text-white mb-4 ">
            {category?.name}
          </h1>
 
          <p className="font-normal text-base text-slate-300 mb-4 ">
          This is  <span className="font-bold text-gray-200">
          {category.name}</span>, created on <span className="font-bold text-gray-300">
          {" "}
  {new Date(category.createdAt).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}{" "}
          </span>
  at <span className="font-bold text-gray-300">
  {" "}
  {new Date(category.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}{" "}
  </span>
  and last updated on <span className="font-bold text-gray-300">
  {" "}
  {new Date(category.updatedAt).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}{" "}
  </span>
  at <span className="font-bold text-gray-300">
  {" "}
  {new Date(category.updatedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}
  </span>
  .
          </p>
          {/* edit and delete button  */}
          <div className=" w-full">
            <div className="flex justify-evenly">
            <DeleteCategory category={category}/>
            <EditCategory category={category} />
            </div>
          </div>
          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
        </div>
        </div>
        )) : (
          <div className="text-lg font-semibold">No Category Available</div>
        )
      }
   </div>
    </div>
 
    );
  }
   
  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
   
  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    )
};
  
export default AddCategory;