"use server";

import axiosInstance from "@/lib/axios/axiosInstance";
import { revalidateTag } from "next/cache";

export const newFollow = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/shop/new-follow/${id}`);
    revalidateTag("single-shop");
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const removeFollow = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/shop/remove-follow/${id}`);
    revalidateTag("single-shop");
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};
