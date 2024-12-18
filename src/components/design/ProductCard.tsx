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
   <div>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
    {
        data?.map((item) => (
            <CardContainer key={item?.productId} className=" ">
            <CardBody className=" relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-[30rem] h-auto rounded-xl p-6 border  ">
            <Link
                  className="hover:underline underline-offset-2"
                  href={`/product/${item.productId}`}
                >
              <CardItem
                translateZ="50"
                className="text-xl  font-bold  text-white"
              >
                 {item.name.length > 25 ? (
                    <> {item?.name.slice(0, 28)}...</>
                  ) : (
                    item?.name
                  )}
              </CardItem></Link>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                      {item?.description?.length > 60 ? (
                  <>{item.description.slice(0, 61)}...</>
                ) : (
                  item.description
                )}
              </CardItem>
              <CardItem translateZ="100" className="w-full h-72 mt-4">
                <Image
                  src={item.images[0]}
                  height="50"
                  width="100"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div>
              <CardItem
                as="p"
                translateZ="60"
                className=" px-4 flex gap-3 text-sm max-w-sm mt-8 text-neutral-300"
              >
                  <span className="mt-1">{item.price}TK </span>
                  <span className="text-lg flex items-center text-orange-400">
                    {
                      item?.discounts}
                    % <FcFlashOn className="w-5 h-5"/>
                  </span>
              </CardItem>
              </div>
              
              
              <div className="flex justify-between items-center mt-5">
                <Link
                  href={`/product/${item.productId}`}
                  className="px-4 py-2 rounded-xl text-xs font-normal hover:underline text-white"
                >
                  view details →
                </Link>
                <CardItem
                  translateZ={20}
                  as="button"
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
                </CardItem>
              </div>
              <CardItem
               as="div"
               translateZ="60"
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
               </CardItem>
            </CardBody>
          </CardContainer>
        ))
    }
   </div>
    <CartConflict />
   </div>
  );
};

export default ProductCard;
