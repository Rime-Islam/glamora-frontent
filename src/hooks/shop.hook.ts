"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";

import { IShop } from "@/interface/shop.interface";
import { queryClient } from "@/providers/Provider";

import {
  addVendorShop,
  blockVendorShop,
  getAllVendorShop,
  getSingleVendorWithAllProduct,
  getVendorShop,
  getVendorSingleShop,
} from "@/services/shopService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useAddShop = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: async (data: any) => await addVendorShop(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendorShop"],
      });
      queryClient.invalidateQueries({
        queryKey: ["allVendorShop"],
      });
    },
  });
};

export const useVendorShop = () => {
  return useQuery<IApiResponse<IShop[]>>({
    queryKey: ["vendorShop"],
    queryFn: async () => await getVendorShop(),
  });
};

export const useVendorSingleShop = (id: string | undefined, page: number) => {
  return useQuery<IApiResponse<IShop>>({
    enabled: !!id,
    queryKey: ["vendorShopSingle", id, page],
    queryFn: async () =>
      await getVendorSingleShop(id as string, page as number),
  });
};

export const useAllVendorShop = (page: number, searchTerm: string) => {
  return useQuery<IApiResponse<IShop[]>>({
    queryKey: ["allVendorShop", page, searchTerm],
    queryFn: async () => await getAllVendorShop(page, searchTerm),
  });
};

export const useSingleVendorShopWithAllProduct = (id: string, page: number) => {
  return useQuery<IApiResponse<IShop>>({
    queryKey: ["singleVendorWithAllProduct", page, id],
    queryFn: async () => await getSingleVendorWithAllProduct(id, page),
  });
};

export const useBlockShop = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (id: any) => await blockVendorShop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-product"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      queryClient.invalidateQueries({ queryKey: ["allVendorShop"] });
      queryClient.invalidateQueries({
        queryKey: ["singleVendorWithAllProduct"],
      });
    },
  });
};