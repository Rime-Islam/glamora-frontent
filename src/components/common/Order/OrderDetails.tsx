"use client";
import { useSingleOrder } from "@/hooks/order.hook";
import Image from "next/image";
import React, { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import ReviewAction from "./ReviewAction";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";
import { 
  ArrowLeft, 
  Calendar, 
  CreditCard, 
  Package, 
  Receipt, 
  ShoppingBag, 
  Truck, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  Store
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const OrderDetails = ({ id }: { id: string }) => {
  const authData = useContext(AuthContext);
  const router = useRouter();
  const {
    data: { data: orderDetails } = {},
    isLoading,
    error,
  } = useSingleOrder(id);

  if (isLoading)
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-100 rounded-full animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
          </div>
          <div className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );

  if (error || !orderDetails)
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50 rounded-2xl border border-red-100 min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <span className="text-xl">⚠️</span>
        </div>
        <h3 className="text-lg font-bold text-red-900 mb-1">
          {error ? "Order not found" : "Something went wrong"}
        </h3>
        <p className="text-sm text-red-600/80 mb-6">
          The order you are looking for doesn&apos;t exist or you don&apos;t have permission to view it.
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold active:scale-95 transition-transform"
        >
          Go Back
        </button>
      </div>
    );

  const {
    total,
    discounts,
    subTotal,
    status,
    paymentStatus,
    transactionId,
    createdAt,
    items,
  } = orderDetails;

  const orderSteps = [
    { label: "Ordered", date: createdAt, active: true, icon: ShoppingBag },
    { label: "Ongoing", active: status === "ONGOING" || status === "DELIVERED", icon: Truck },
    { label: "Delivered", active: status === "DELIVERED", icon: Package },
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* ─── Top Bar ─── */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-0.5">
              ID: {id}
            </p>
          </div>
        </div>
        
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          status === "DELIVERED" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
        }`}>
          Status: {status.toLocaleLowerCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ─── Main Content ─── */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Status Tracker */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Truck className="w-4 h-4 text-rose-500" />
              Tracking Information
            </h2>
            <div className="relative">
              <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-50 -z-0" />
              <div className="flex justify-between relative z-10">
                {orderSteps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center max-w-[100px]">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.active 
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-200" 
                        : "bg-white border-2 border-gray-100 text-gray-300"
                    }`}>
                      <step.icon className="w-4.5 h-4.5" />
                    </div>
                    <p className={`mt-3 text-xs font-bold leading-tight ${
                      step.active ? "text-gray-900" : "text-gray-300"
                    }`}>
                      {step.label}
                    </p>
                    {step.date && (
                      <p className="mt-1 text-[10px] text-gray-400 font-medium">
                        {new Date(step.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-500" />
                Order Items ({items?.length || 0})
              </h2>
            </div>
            <div className="divide-y divide-gray-50 px-8">
              {items?.map((item) => {
                 const isReviewed = item?.Review?.map((info: any) => info.customer?.email).includes(
                  authData?.user?.userEmail
                );

                return (
                  <div key={item.id} className="py-6 flex gap-6">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        fill
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/product/${item.product.productId}`} className="text-sm font-bold text-gray-900 hover:text-rose-500 transition-colors">
                          {item.product.name}
                        </Link>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                            <Store className="w-3 h-3" />
                            {item.shop?.name}
                          </span>
                          {item.size && (
                            <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                              Size: {item.size}
                            </span>
                          )}
                          <span className="text-[11px] font-bold text-gray-400">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm font-extrabold text-gray-900">
                          ৳{(item.price * item.quantity).toFixed(2)}
                        </span>
                        
                        {authData?.user?.role === "CUSTOMER" && status === "DELIVERED" && (
                          isReviewed ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                              <CheckCircle className="w-3 h-3" />
                              Review Given
                            </div>
                          ) : (
                            <ReviewAction
                              productId={item.productId}
                              orderItemId={item.id}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Sidebar Information ─── */}
        <div className="space-y-6">
          {/* Payment Info */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-violet-500" />
              Summary
            </h2>
            <div className="space-y-3.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium">Subtotal</span>
                <span className="text-gray-900 font-semibold mb-2">৳{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium">Discounts</span>
                <span className="text-emerald-500 font-bold">-৳{discounts.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-50 my-2" />
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-xl font-extrabold text-gray-900">৳{subTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Details List */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Transaction Details</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Transaction ID</p>
                    <p className="text-xs font-bold text-gray-900 break-all">{transactionId}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    paymentStatus === "COMPLETED" ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"
                  }`}>
                    {paymentStatus === "COMPLETED" ? <ShieldCheck className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Payment Status</p>
                    <p className={`text-xs font-extrabold uppercase ${
                      paymentStatus === "COMPLETED" ? "text-emerald-600" : "text-amber-600"
                    }`}>{paymentStatus}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Placed On</p>
                    <p className="text-xs font-bold text-gray-900">
                      {new Date(createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-50">
               <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
                 If you have any questions about your order, please contact our support team or the vendor directly.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;