"use client";
import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
    <Table>
      <TableHeader>
        <TableRow>
        <TableHead>Index</TableHead>
          <TableHead className="w-[150px]">Transaction ID</TableHead>
          {userData?.user?.role == "ADMIN" && (
              <TableHead className="">Email</TableHead>
            )}
   {userData?.user?.role == "ADMIN" && (
                <TableHead className="text-center">
                 Customer Email
                </TableHead>
              )}
          <TableHead>Payment Status</TableHead>
          <TableHead className="min-w-[150px]">Items</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
          <TableHead>Status</TableHead>
          {action && (
            <>
              {userData?.user?.role == "ADMIN" && (
                  <TableHead className="">Action</TableHead>
                )}
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderData.map((order, index) => (
          <TableRow key={order.id}>
              <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">
              <Link href={`${path}/${order.id}`}>{order.transactionId}</Link>
            </TableCell>
            {userData?.user?.role == "ADMIN" && (
                <TableCell className="text-right">
                  {order.customer?.email}
                </TableCell>
              )}

<TableCell
  className={`font-bold pl-5 ${
    order.paymentStatus === "COMPLETED" ? "text-green-600" : "text-red-500"
  }`}
>
  {order.paymentStatus.toLocaleLowerCase()}
</TableCell>
            <TableCell className="">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-2 mb-1">
                  <Image
                    width={100}
                    height={100}
                    src={item?.product?.images[0]}
                    alt={item?.product?.name}
                    className="w-10 h-10 rounded"
                  />
                  <span className="text-sm font-medium">
                    {item?.product?.name}
                  </span>
                </div>
              ))}
            </TableCell>
            <TableCell className="text-right">
              ${order.subTotal.toFixed(2)}
            </TableCell>
            
            <TableCell>{order.status.toLocaleLowerCase()}</TableCell>
            {action && (
              <>
                {userData?.user?.role == "ADMIN" && (
                    <TableCell className="text-right">
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange(order.id, value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not">Update Status</SelectItem>
                          <SelectGroup>
                            <SelectItem
                              disabled={
                                order.status === "ONGOING" ||
                                order.status === "DELIVERED"
                              }
                              value="ONGOING"
                            >
                              Ongoing
                            </SelectItem>
                            <SelectItem
                              value="DELIVERED"
                              disabled={
                                order.status === "DELIVERED" ||
                                order.status === "PENDING"
                              }
                            >
                              Delevired
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
   
    </Table>
  );
};

export default OrderTable;