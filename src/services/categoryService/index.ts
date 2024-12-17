"use server";

import axiosInstance from "@/lib/axios/axiosInstance";
import { revalidateTag } from "next/cache";

export const getAllCategory = async () => {
  try {
    const { data } = await axiosInstance.get(`/category`);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const addCategory = async (name: string) => {
  try {
    const { data } = await axiosInstance.post(`/category/create-category`, {
      name,
    });
    revalidateTag("all-category");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const updateCategory = async (id: string, name: string) => {
  try {
    const { data } = await axiosInstance.patch(`/category/${id}`, {
      name,
    });
    revalidateTag("all-category");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/category/${id}`);
    revalidateTag("all-category");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};