"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IReview } from "@/interface/review.interface";
import { queryClient } from "@/providers/Provider";
import {
  addReview,
  getReviewbyShop,
  replyReview,
} from "@/services/ratingService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useAddRating = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: async (data: any) => await addReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-single-order"] });
    },
  });
};
export const useReplyRating = () => {
  return useMutation<any, Error, { id: string; vendorReply: string }, unknown>({
    mutationFn: async (data) => replyReview(data), // Aligned the data type
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-rating-by-shop"] });
    },
  });
};

export const useGetReviewByShop = (page: number) => {
  return useQuery<IApiResponse<IReview[]>>({
    queryKey: ["get-rating-by-shop", page],
    queryFn: async () => await getReviewbyShop(page),
  });
};