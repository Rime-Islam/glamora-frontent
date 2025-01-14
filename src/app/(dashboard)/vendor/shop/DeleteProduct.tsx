import { Modalbox } from "@/components/common/modal/Modalbox";
import { DialogClose } from "@/components/ui/dialog";
import { useDeleteProduct } from "@/hooks/product.hook";
import { toast } from "sonner";

const DeleteProduct = ({ id }: { id: string }) => {
    const { mutate } = useDeleteProduct();

  const deleteProductData = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Product deleted.");
      },
      onError: () => {
        toast.error("Something went wrong! Try again.");
      },
    });
  };
    return (
    <div className="m-6">
            <Modalbox
        size="icon"
        variant="outline"
        btncss="hover:text-red-500"
        title="Are you sure?"
        descrip="You won't be avail to revert this. Make sure you want to delete this product"
        btnIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        }
      >
        <div className="flex justify-center gap-10">
          <DialogClose onClick={() => deleteProductData(id)}>
            <p className=" bg-red-500 text-white rounded-md w-20 py-2">Yes</p>
          </DialogClose>
          <DialogClose>
            <p className="bg-gray-950 text-white rounded-md w-20 py-2">No</p>
          </DialogClose>
        </div>
      </Modalbox>
    </div>
    )
};

export default DeleteProduct;