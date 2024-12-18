"use server";

import axiosInstance from "@/lib/axios/axiosInstance";

export const getAllUser = async (
  searchTerm: string,
  isBlocked: string,
  page: number
) => {
  try {
    const res = await axiosInstance.get(`/user`, {
      params: {
        searchTerm,
        isBlocked,
        page,
      },
    });

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const blockUser = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/user/block/${id}`);
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/user/delete/${id}`);
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const updatePass = async (data: { password: string }) => {
  try {
    const res = await axiosInstance.patch(`/user/update-password`, data);
    console.log(res)
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};