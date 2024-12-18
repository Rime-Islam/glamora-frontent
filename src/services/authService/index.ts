"use server";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/axios/axiosInstance";
import { cookies } from "next/headers";
import config from "@/config";

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/auth/signin`, userData);

    // Set the token in a cookie
    (await cookies()).set("accessToken", data?.data?.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 60, // 60 days
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const createUser = async (userData: any) => {
  try {
    const { data } = await axiosInstance.post(
      `${config.backendApi}/user/signup`,
      userData
    );
    console.log(userData);

    (await cookies()).set("accessToken", data?.data, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 60, // 60 days
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message || error);
  }
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  let decode = null;

  if (token) {
    decode = await jwtDecode(token as string);
  }

  return await decode;
};

export const setNewPass = async (passData: {
  token: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.patch("/auth/set-password", passData);

    return data;
  } catch (error: any) {
    if (error?.response?.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error);
    }
  }
};

export const resetPass = async (userEmail: { email: string }) => {
  try {
    const { data } = await axiosInstance.post("/auth/forget-password", userEmail);
    return data;
  } catch (error: any) {
    if (error?.response?.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error);
    }
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};