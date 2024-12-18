"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IOrder } from "@/interface/order.interface";
import { queryClient } from "@/providers/Provider";
import {
  getAllOrder,
  getPendingOrder,
  getSigleOrder,
  getSigleUserAllOrder,
  makePayment,
  updateOrder,
} from "@/services/orderService";
import { getVendorSingleShopOrders } from "@/services/shopService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useMakeOrder = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, any, unknown>({
    mutationFn: (data: any) => makePayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-all-order"],
      });
      queryClient.invalidateQueries({
        queryKey: ["all-order"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pending-order"],
      });
    },
  });
};

export const useSigleUserAllOrder = (currentPage: number, status: string) => {
  return useQuery<IApiResponse<IOrder[]>>({
    queryKey: ["user-all-order", currentPage, status],
    queryFn: async () => await getSigleUserAllOrder(currentPage, status),
  });
};

export const useSingleOrder = (id: string) => {
  return useQuery<IApiResponse<IOrder>>({
    enabled: !!id,
    queryKey: ["user-single-order", id],
    queryFn: async () => await getSigleOrder(id),
  });
};

export const useAllOrder = (page: number) => {
  return useQuery<IApiResponse<IOrder[]>>({
    queryKey: ["all-order", page],
    queryFn: async () => await getAllOrder(page),
  });
};

export const useUpdateOrder = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (id: string) => await updateOrder(id),
    onSuccess: () => {
      // Invalidate the "get-all-userdata" query to revalidate it
      queryClient.invalidateQueries({
        queryKey: ["user-all-order"],
      });
      queryClient.invalidateQueries({
        queryKey: ["all-order"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pending-order"],
      });
    },
  });
};

export const useVendorSingleShopOrders = (status: string, page: number) => {
  return useQuery<IApiResponse<IOrder[]>>({
    queryKey: ["vendorSingleShopOrder", status, page],
    queryFn: async () => await getVendorSingleShopOrders(status, page),
  });
};

export const usePendingOrder = (page: number) => {
  return useQuery<IApiResponse<IOrder[]>>({
    queryKey: ["pending-order", page],
    queryFn: async () => await getPendingOrder(page),
  });
};