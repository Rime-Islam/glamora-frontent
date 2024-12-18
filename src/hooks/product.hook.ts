"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IDiscount, IProduct } from "@/interface/product.interface";
import { queryClient } from "@/providers/Provider";
import {
  addProduct,
  allProducts,
  cloneProduct,
  deleteProduct,
  flashProduct,
  singleProduct,
  updateProduct,
} from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useAddProduct = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: async (data: any) => await addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorShopSingle"] });
      queryClient.invalidateQueries({ queryKey: ["all-product"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      queryClient.invalidateQueries({
        queryKey: ["singleVendorWithAllProduct"],
      });
    },
  });
};

export const useCloneProduct = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: async (data: any) => await cloneProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorShopSingle"] });
    },
  });
};

export const useUpdateProduct = () => {
  return useMutation<any, Error, { data: FieldValues; id: string }, unknown>({
    mutationFn: async (data: { data: FieldValues; id: string }) =>
      await updateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorShopSingle"] });
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (id) => await deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorShopSingle"] });
    },
  });
};

export const useAllProduct = (
  searchTerm: string,
  categoryId: string,
  sortCriteria: string,
  page: number
) => {
  return useQuery<IApiResponse<IProduct[]>>({
    queryKey: ["all-product", searchTerm, categoryId, sortCriteria, page],
    queryFn: async () =>
      await allProducts({ searchTerm, categoryId, sortCriteria, page }),
    refetchOnMount: true, // Refetch data when the component mounts
    refetchOnWindowFocus: true, // Optional: Refetch when the window regains focus
  });
};

export const useAllProduct2 = (
  searchTerm: string,
  categoryId: string,
  sortCriteria: string,
  page: number
) => {
  return useQuery<IApiResponse<IProduct[]>>({
    queryKey: ["all-products", searchTerm, categoryId, sortCriteria, page],
    queryFn: async () =>
      await allProducts({ searchTerm, categoryId, sortCriteria, page }),
  });
};

export const useSingleProduct = (id: string) => {
  return useQuery<IApiResponse<IProduct>>({
    enabled: !!id,
    queryKey: ["single-product"],
    queryFn: async () => await singleProduct(id),
  });
};

export const useFlashProduct = () => {
  return useQuery<IApiResponse<IDiscount[]>>({
    queryKey: ["flash-product"],
    queryFn: async () => await flashProduct(),
  });
};