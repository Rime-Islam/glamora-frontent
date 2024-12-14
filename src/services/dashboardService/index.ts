"use server";
import axiosInstance from "@/lib/axios/axiosInstance";

export const getUserDashboar = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/user`);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const getAdminDashboar = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/admin`);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const getVendorDashboar = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/vendor`);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};