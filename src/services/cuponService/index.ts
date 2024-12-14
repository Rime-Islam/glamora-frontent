"use server";

import axiosInstance from "@/lib/axios/axiosInstance";
import { FieldValues } from "react-hook-form";

export const createCupon = async (dataValue: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/cupon/create-cupon`, dataValue);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const getShopCupon = async (shopId: string) => {
  try {
    const { data } = await axiosInstance.get(`/cupon/get-cupon/${shopId}`);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};