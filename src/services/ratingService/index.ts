"use server";

import axiosInstance from "@/lib/axios/axiosInstance";
import { FieldValues } from "react-hook-form";

export const addReview = async (data: FieldValues) => {
  try {
    const res = await axiosInstance.post(`/rating/add-rating`, {
      data: data,
    });
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const replyReview = async (data: {
  id: string;
  vendorReply: string;
}) => {
  try {
    const res = await axiosInstance.patch(`/rating/reply`, data); // Adjusted payload structure
    return res?.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Unknown error occurred"
    );
  }
};

export const getReviewbyShop = async (page: number) => {
  try {
    const res = await axiosInstance.get(`/rating/get-rating-by-shop`, {
      params: { page },
    });
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};