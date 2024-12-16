"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { FcFullTrash } from "react-icons/fc";
import { toast } from "sonner";
import { useDeleteCategory } from "@/hooks/category.hook";


export function DeleteCategory({ category }: { category: any }) {
        const { mutate: deleteCategory } = useDeleteCategory();
       
        const deleteCategoryInfo = (id: string) => {
          deleteCategory(id, {
            onSuccess: () => {
              toast.success("Category deleted.");
            },
            onError: () => {
              toast.error("Something went wrong! Try again.");
            },
          });
        };

  return (
    <div className="py-5  flex items-center justify-center">
      <Modal>
        <ModalTrigger className=" bg-white text-black flex justify-center group/modal-btn">
          <span className=" group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Delete 
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          <FcFullTrash className="h-6 w-6"/>
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-sm md:text-md text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
           Delete {category?.name}
            </h4>
       
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button onClick={() => deleteCategoryInfo(category?.categoryId)} className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Delete
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

