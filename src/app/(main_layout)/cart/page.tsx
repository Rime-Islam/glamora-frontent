"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useMakeOrder } from "@/hooks/order.hook";
import { useGetShopCupon } from "@/hooks/cupon.hook";
import {
  decreaseItem,
  increaseItem,
  removeItemFromCart,
  setAdditionalDiscount,
  setCuponId,
} from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Tag,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Ticket,
  CheckCircle,
  Loader2,
} from "lucide-react";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMakeOrder();

  const {
    cuponId,
    cartItems,
    itemLevelDiscount,
    subTotal,
    totalDiscount,
    additionalDiscount,
    totalPriceBeforeDiscount,
  } = useAppSelector((state) => state.cartSlice);

  const { data } = useGetShopCupon(cartItems[0]?.shopId || "");

  const handleIncrement = (id: string, quantity: number, stock: number) => {
    if (quantity < stock) {
      dispatch(increaseItem({ id }));
    } else {
      toast.error("Cannot add more than available stock!");
    }
  };

  const handleDecrement = (id: string) => {
    dispatch(decreaseItem({ id }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeItemFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
      discount: itemLevelDiscount || 0,
      shopId: item.shopId,
    }));

    const orderRequest = {
      items: orderItems,
      total: totalPriceBeforeDiscount,
      discounts: totalDiscount,
      subTotal: subTotal,
      ...(!!cuponId && { couponId: cuponId }),
    };

    mutate(orderRequest, {
      onSuccess: (res) => {
        toast.success("Redirecting to payment page...");
        const payLink = res?.data?.payLink;
        if (payLink) {
          window.location.href = payLink;
        } else {
          toast.error("Failed to retrieve payment link.");
        }
      },
      onError: () => {
        toast.error("Failed to place order. Please try again.");
      },
    });
  };

  const applyCupon = (discount: number, cuponId: string) => {
    dispatch(setAdditionalDiscount(discount));
    dispatch(setCuponId(cuponId));
    toast.success("Coupon applied successfully! 🎉");
  };

  /* ─── Empty Cart ─── */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 text-sm max-w-sm mb-8">
            Looks like you haven&apos;t added anything yet. Discover amazing
            products and start shopping!
          </p>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-rose-500 transition-colors duration-300 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            Browse Products
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 xl:px-0 py-8">
        {/* ─── Header ─── */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Review & Checkout
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
            cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ─── Cart Items ─── */}
          <div className="flex-1 min-w-0 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <Link href={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-50">
                      <Image
                        src={item.photo}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="text-sm md:text-base font-bold text-gray-900 hover:text-rose-500 transition-colors truncate">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400 bg-gray-50 rounded-full px-2.5 py-0.5 font-medium">
                            {item.category}
                          </span>
                          {item.size && (
                            <span className="text-xs text-gray-400 bg-gray-50 rounded-full px-2.5 py-0.5 font-medium">
                              Size: {item.size}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 flex-shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price + Quantity row */}
                    <div className="flex items-center justify-between mt-auto pt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-bold text-gray-900 text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleIncrement(item.id, item.quantity, item.stock)
                          }
                          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Prices */}
                      <div className="text-right">
                        <p className="text-base md:text-lg font-extrabold text-gray-900">
                          ৳{(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.discount > 0 && (
                          <p className="text-xs text-rose-500 font-semibold">
                            -{item.discount}% off
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/product"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-rose-500 transition-colors mt-2"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* ─── Order Summary Sidebar ─── */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-24 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-50">
                <h2 className="text-lg font-bold text-gray-900">
                  Order Summary
                </h2>
              </div>

              {/* Price breakdown */}
              <div className="px-6 py-5 space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-semibold text-gray-700">
                    ৳{totalPriceBeforeDiscount.toFixed(2)}
                  </span>
                </div>

                {itemLevelDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Product Discount
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">
                      -৳{itemLevelDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                {additionalDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-violet-500" />
                      <span className="text-sm text-gray-500">
                        Coupon Discount
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-violet-600">
                      -{additionalDiscount}%
                    </span>
                  </div>
                )}

                {totalDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Total Savings
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      -৳{totalDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-gray-100 !mt-5 !mb-4" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-gray-900">
                    ৳{subTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Coupons */}
              {data?.data && data.data.length > 0 && (
                <div className="px-6 pb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Available Coupons
                  </p>
                  <div className="space-y-2">
                    {data.data.map((code: any) => {
                      const isApplied = code.id === cuponId;
                      return (
                        <button
                          key={code.id}
                          disabled={isApplied}
                          onClick={() => applyCupon(code.discount, code.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 ${
                            isApplied
                              ? "border-emerald-200 bg-emerald-50"
                              : "border-gray-100 hover:border-rose-200 hover:bg-rose-50/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                isApplied
                                  ? "bg-emerald-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              {isApplied ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Tag className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold ${
                                  isApplied
                                    ? "text-emerald-700"
                                    : "text-gray-700"
                                }`}
                              >
                                {code.code}
                              </p>
                              <p className="text-xs text-gray-400">
                                {code.discount}% off
                              </p>
                            </div>
                          </div>
                          {isApplied ? (
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 rounded-full px-2.5 py-1">
                              Applied
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-rose-500">
                              Apply
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <div className="px-6 pb-6">
                <button
                  disabled={isPending}
                  onClick={handleCheckout}
                  className="group w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gray-900 text-white font-bold text-base hover:bg-rose-500 transition-all duration-300 shadow-lg hover:shadow-rose-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Proceed to Checkout
                    </>
                  )}
                </button>
              </div>

              {/* Trust badges */}
              <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100">
                <div className="flex items-center justify-center gap-5">
                  {[
                    { icon: ShieldCheck, label: "Secure" },
                    { icon: Truck, label: "Fast Delivery" },
                    { icon: Tag, label: "Best Price" },
                  ].map((b) => (
                    <div
                      key={b.label}
                      className="flex items-center gap-1.5 text-xs text-gray-400 font-medium"
                    >
                      <b.icon className="w-3.5 h-3.5" />
                      {b.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;