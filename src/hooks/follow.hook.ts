"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryClient } from "@/providers/Provider";
import { newFollow, removeFollow } from "@/services/followerService";
import { useMutation } from "@tanstack/react-query";

export const useFollowShop = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (id: string) => await newFollow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorShopSingle"] });
      queryClient.invalidateQueries({
        queryKey: ["singleVendorWithAllProduct"],
      });
    },
  });
};

export const useUnfollowShop = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (id: string) => await removeFollow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorShopSingle"] });
      queryClient.invalidateQueries({
        queryKey: ["singleVendorWithAllProduct"],
      });
    },
  });
};