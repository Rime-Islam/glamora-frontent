"use client";

import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import { IProduct, ProductCardProps } from "@/interface/product.interface";
import { FcFlashOn } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addItemToCart, ICartItem } from "@/redux/features/cart/cartSlice";
import { AuthContext } from "@/providers/AuthProvider";
import { addProductToComparison } from "@/redux/features/compare/compareSlice";
import AvarageRating from "../Rating/AvarageRating";
import CartConflict from "../common/cartConfilct/CartConflict";
import { toast } from "sonner";
import { ShoppingCart, GitCompare } from "lucide-react";

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const selectedProducts = useAppSelector(
    (state) => state.compareSlice.selectedProducts
  );
  const dispatch = useAppDispatch();
  const userData = useContext(AuthContext);

  const handleAddToCart = (item: ICartItem) => {
    dispatch(addItemToCart(item));
    toast.success("Added to cart!");
  };

  const handleCompare = (product: IProduct) => {
    dispatch(addProductToComparison(product));
    toast.success("Added to compare!");
  };

  return (
    <div className="px-[2vw] xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data?.map((item) => {
          const isCompared = selectedProducts
            .map((o) => o.productId)
            .includes(item.productId);

          return (
            <div
              key={item.productId}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col"
            >
              {/* Image area */}
              <div className="relative h-56 bg-gray-50 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Discount badge */}
                {item.discounts > 0 && (
                  <div className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5 flex items-center gap-0.5">
                    <FcFlashOn className="w-3 h-3" />
                    -{item.discounts}%
                  </div>
                )}
                {/* Action overlay on hover */}
                {userData?.user && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end justify-end p-2.5 opacity-0 group-hover:opacity-100">
                    {userData?.user?.role === "CUSTOMER" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCompare(item);
                        }}
                        disabled={isCompared}
                        title="Add to Compare"
                        className="w-9 h-9 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <GitCompare className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/product/${item.productId}`}>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 hover:text-rose-500 transition-colors">
                    {item.name.length > 28 ? `${item.name.slice(0, 28)}…` : item.name}
                  </h3>
                </Link>

                <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed flex-1">
                  {item.description?.length > 65
                    ? `${item.description.slice(0, 65)}…`
                    : item.description}
                </p>

                {/* Rating */}
                <div className="mt-2">
                  <AvarageRating
                    rating={item?.averageRating ?? 0}
                    width={85}
                  />
                </div>

                {/* Price row */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-base font-extrabold text-gray-900">
                    ৳{item.price}
                  </span>
                  {item.discounts > 0 && (
                    <span className="text-xs text-gray-400 line-through">
                      ৳{(item.price / (1 - item.discounts / 100)).toFixed(0)}
                    </span>
                  )}
                </div>

                {/* Add to cart */}
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
                      discount: item.flashSale?.length
                        ? item.flashSale[0]?.discount + item.discounts
                        : item.discounts,
                      shopId: item.shopId,
                    })
                  }
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-rose-500 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <CartConflict />
    </div>
  );
};

export default ProductCard;
