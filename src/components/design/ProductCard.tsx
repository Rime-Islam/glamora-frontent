"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import {IProduct, ProductCardProps }from "@/interface/product.interface"
import { FcFlashOn } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addItemToCart, ICartItem } from "@/redux/features/cart/cartSlice";
import { AuthContext } from "@/providers/AuthProvider";
import { addProductToComparison } from "@/redux/features/compare/compareSlice";
import AvarageRating from "../Rating/AvarageRating";
import CartConflict from "../common/cartConfilct/CartConflict";
import { toast } from "sonner";
import { Button } from "../ui/button";



const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const selectedProducts = useAppSelector(
    (state) => state.compareSlice.selectedProducts
  );
  const dispatch = useAppDispatch();
  const handleAddToCart = (data: ICartItem) => {
    dispatch(addItemToCart(data));
    toast.success("This product add to the cart");
  };
  const userData = useContext(AuthContext);
  const handleCompare = (product: IProduct) => {
    dispatch(addProductToComparison(product));
  };


  return (
   <div className="px-[2vw] xl:px-0">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
    {
        data?.map((item) => (
            <div key={item?.productId} className="max-w-base h-56">
            <div className="  hover:shadow-2xl bg-white rounded-lg p-2">
           
              <div className="w-full h-56 mb-5">
                <Image
                  src={item.images[0]}
                  height="50"
                  width="100"
                  className="h-full w-full object-cover rounded-xl "
                  alt="thumbnail"
                />
              </div>
             <div className="px-2">
             <Link
                  className="hover:underline hover:text-blue-600"
                  href={`/product/${item.productId}`}
                >
              <p
                className=" text-lg font-semibold  "
              >
                 {item.name.length > 25 ? (
                    <> {item?.name.slice(0, 28)}...</>
                  ) : (
                    item?.name
                  )}
              </p></Link>
              <p
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                      {item?.description?.length > 60 ? (
                  <>{item.description.slice(0, 61)}...</>
                ) : (
                  item.description
                )}
              </p>
             </div>
              <div>
              <p
                className=" px-2 flex gap-3 text-sm  "
              >
                  <span className="mt-1">{item.price}TK </span>
                  <span className="text-lg flex items-center text-orange-400">
                    {
                      item?.discounts}
                    % <FcFlashOn className="w-5 h-5"/>
                  </span>
              </p>
              </div>
              
              
              <div className="flex justify-between items-center mt-5">
                <Link
                  href={`/product/${item.productId}`}
                  className="px-4 py-2 rounded-xl text-xs font-normal hover:underline "
                >
                  view details →
                </Link>
                <button
                  disabled={userData?.user?.role !== "CUSTOMER"}
                  onClick={() =>
                  handleAddToCart({
                    category: item?.category.name,
                    id: item?.productId,
                    photo: item?.images[0],
                    price: item?.price,
                    stock: item?.stock,
                    quantity: 1,
                    title: item.name,
                    discount: !!item.flashSale?.length
                      ? item.flashSale[0]?.discount + item.discounts
                      : item.discounts,
                    shopId: item.shopId,
                  })
                }
                  className="px-4 py-2 rounded-xl bg-amber-600 dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Add to cart
                </button>
              </div>
              <div
             
               className="text-neutral-500 justify-center w-full px-4 flex gap-3 text-sm  mt-8 dark:text-neutral-300">
                 <div
                className={
                  userData?.user
                    ? "flex gap-60 justify-between"
                    : "flex  justify-between"
                }
              >
               <div>
               {userData?.user && (
            <Button
            onClick={() => handleCompare(item)}
            disabled={selectedProducts
              .map((o) => o.productId)
              .includes(item.productId)}
            size="sm"
            className="mt-2 mb-1 bg-white text-black"
          >
            {selectedProducts
              .map((o) => o.productId)
              .includes(item.productId)
              ? "Selected"
              : "Compare"}
          </Button>
                )}
               </div>
                <AvarageRating
                  rating={item?.averageRating ? item?.averageRating : 0}
                  width={85}
                ></AvarageRating>
              </div>
               </div>
            </div>
          </div>
        ))
    }
   </div>
    <CartConflict />
   </div>
  );
};

export default ProductCard;
