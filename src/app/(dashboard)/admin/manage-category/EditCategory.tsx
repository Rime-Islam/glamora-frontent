"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FcNews } from "react-icons/fc";
import { toast } from "sonner";
import { useUpdateCategory } from "@/hooks/category.hook";

const EditCategory = ({ category }: { category: any }) => {
    const { mutate: updateCategory, isPending } = useUpdateCategory();

    const handleEdit = async (e: any) => {
    e.preventDefault();
    const categoryName = e.target.name.value;

    updateCategory(
      { id: category.categoryId, name: categoryName },
      {
        onSuccess: () => {
          toast.success("Category updated.");
        },
        onError: () => {
          toast.error("Something went wrong! Try again.");
        },
      }
    );
  };
    return (
        <div className="py-5  flex items-center justify-center">
              <Modal>
                <ModalTrigger className=" bg-white text-black flex justify-center group/modal-btn">
                  <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                    Edit
                  </span>
                  <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                  <FcNews className="h-6 w-6"/>
                  </div>
                </ModalTrigger>
                <ModalBody>
                  <ModalContent>
                  <form onSubmit={handleEdit} className="my-8" >
            <h1 className="mb-8 text-lg font-bold">Edit Category</h1>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name"> Name</Label>
            <Input id="name" name="name" defaultValue={category.name} placeholder="Add A Category Name" type="text" 
          required/>
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br mt-8 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Update
            <BottomGradient />
          </button>
        </form>
                  </ModalContent>
                  <ModalFooter className="gap-4">
                    <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                      Cancel
                    </button>
                
                  </ModalFooter>
                </ModalBody>
              </Modal>
            </div>
    )
};

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

export default EditCategory;