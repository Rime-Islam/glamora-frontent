"use server";

import axiosInstance from "@/lib/axios/axiosInstance";
import { FieldValues } from "react-hook-form";

export const addProduct = async (data: FieldValues) => {
  try {
    const res = await axiosInstance.post(`/product/add-product`, data);

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const cloneProduct = async (data: FieldValues) => {
  try {
    const res = await axiosInstance.post(`/product/clone-product`, data);

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const allProduct = async ({
  searchTerm,
  categoryId,
  sortCriteria: sort,
  page,
}: {
  searchTerm: string;
  categoryId: string;
  sortCriteria: string;
  page: number;
}) => {
  try {
    const res = await axiosInstance.get(`/product`, {
      params: {
        searchTerm,
        categoryId,
        sort,
        page,
        limit: 12,
      },
    });

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const allProduct2 = async ({
  searchTerm,
  categoryId,
  sortCriteria: sort,
  page,
}: {
  searchTerm: string;
  categoryId: string;
  sortCriteria: string;
  page: number;
}) => {
  try {
    const res = await axiosInstance.get(`/product`, {
      params: {
        searchTerm,
        categoryId,
        sort,
        page,
        limit: 12,
      },
    });

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const singleProduct = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/product/${id}`);

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const updateProduct = async (pdata: {
  data: FieldValues;
  id: string;
}) => {
  try {
    const res = await axiosInstance.patch(`/product/${pdata.id}`, pdata.data);

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/product/${id}`);

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const flashProduct = async () => {
  try {
    const res = await axiosInstance.post(`/product/flash-sale`);
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};