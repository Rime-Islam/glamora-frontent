"use client";
import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/interface/order.interface";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import { useUpdateOrder } from "@/hooks/order.hook";
import { toast } from "sonner";
import { Eye, ExternalLink, Package, CheckCircle, AlertCircle, Clock } from "lucide-react";

const OrderTable = ({
  orderData,
  action = false,
}: {
  orderData: IOrder[];
  action?: boolean;
}) => {
  const path = usePathname();
  const userData = useContext(AuthContext);
  const { mutate } = useUpdateOrder();

  const handleSelectChange = (orderId: string, value: string) => {
    if (value !== "not") {
      mutate(orderId, {
        onSuccess: () => {
          toast.success("Status updated.");
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-50 hover:bg-transparent">
            <TableHead className="w-12 text-center py-5 text-[11px] font-bold uppercase tracking-wider text-gray-400">#</TableHead>
            <TableHead className="w-[180px] py-5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Transaction ID</TableHead>
            {userData?.user?.role === "ADMIN" && (
              <TableHead className="py-5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Customer</TableHead>
            )}
            <TableHead className="py-5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Payment</TableHead>
            <TableHead className="py-5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Products</TableHead>
            <TableHead className="text-right py-5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Price</TableHead>
            <TableHead className="py-5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</TableHead>
            <TableHead className="text-right py-5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderData.map((order, index) => (
            <TableRow key={order.id} className="group border-gray-50 hover:bg-gray-50/50 transition-colors">
              <TableCell className="text-center font-medium text-gray-400">{index + 1}</TableCell>
              <TableCell>
                <Link
                  href={`${path}/${order.id}`}
                  className="flex items-center gap-1.5 font-bold text-gray-900 group-hover:text-rose-500 transition-colors"
                >
                  <span className="truncate max-w-[120px]">{order.transactionId}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <p className="text-[10px] text-gray-400 font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </TableCell>
              
              {userData?.user?.role === "ADMIN" && (
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-700">{order.customer?.name || "Guest"}</span>
                    <span className="text-xs text-gray-400">{order.customer?.email}</span>
                  </div>
                </TableCell>
              )}

              <TableCell>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  order.paymentStatus === "COMPLETED" 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                    : "bg-amber-50 text-amber-600 border border-amber-100"
                }`}>
                  {order.paymentStatus === "COMPLETED" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {order.paymentStatus.toLocaleLowerCase()}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex -space-x-3 overflow-hidden">
                  {order.items?.map((item, idx) => (
                    <div 
                      key={item.id} 
                      className={`relative w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex-shrink-0 z-[${10 - idx}]`}
                      title={item?.product?.name}
                    >
                      <Image
                        fill
                        src={item?.product?.images[0]}
                        alt={item?.product?.name}
                        className="object-cover rounded-full"
                      />
                    </div>
                  ))}
                  {order.items && order.items.length > 3 && (
                    <div className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 z-0">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell className="text-right">
                <span className="text-sm font-extrabold text-gray-900">৳{order.subTotal.toFixed(2)}</span>
              </TableCell>

              <TableCell>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  order.status === "DELIVERED"
                    ? "bg-emerald-50 text-emerald-600"
                    : order.status === "ONGOING"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-50 text-gray-500"
                }`}>
                  {order.status === "DELIVERED" ? (
                    <Package className="w-3 h-3" />
                  ) : order.status === "ONGOING" ? (
                    <Clock className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {order.status.toLocaleLowerCase()}
                </div>
              </TableCell>

              <TableCell className="text-right">
                {userData?.user?.role === "ADMIN" && action ? (
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange(order.id, value)
                    }
                  >
                    <SelectTrigger className="w-full min-w-[130px] h-9 rounded-lg border-gray-100 text-xs font-bold">
                      <SelectValue placeholder="Update" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                      <SelectItem value="not" className="text-xs font-medium">Update Status</SelectItem>
                      <SelectGroup>
                        <SelectItem
                          disabled={
                            order.status === "ONGOING" ||
                            order.status === "DELIVERED"
                          }
                          value="ONGOING"
                          className="text-xs font-medium"
                        >
                          Ongoing
                        </SelectItem>
                        <SelectItem
                          value="DELIVERED"
                          disabled={
                            order.status === "DELIVERED" ||
                            order.status === "PENDING"
                          }
                          className="text-xs font-medium"
                        >
                          Delivered
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <Link
                    href={`${path}/${order.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;