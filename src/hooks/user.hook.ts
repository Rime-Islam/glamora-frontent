import { IApiResponse } from "@/interface/apiResponse.interface";
import { IUser } from "@/interface/user.interface";
import { queryClient } from "@/providers/Provider";
import { blockUser, deleteUser, getAllUser, updatePass } from "@/services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllUser = (search: string, block: string, page: number) => {
  return useQuery<IApiResponse<IUser[]>>({
    queryKey: ["get-all-userdata", search, block, page],
    queryFn: async () => await getAllUser(search, block, page),
  });
};

export const useBlockUser = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (id: string) => await blockUser(id),
    onSuccess: () => {
      // Invalidate the "get-all-userdata" query to revalidate it
      queryClient.invalidateQueries({ queryKey: ["get-all-userdata"] });
    },
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (id: string) => await deleteUser(id),
    onSuccess: () => {
      // Invalidate the "get-all-userdata" query to revalidate it
      queryClient.invalidateQueries({ queryKey: ["get-all-userdata"] });
    },
  });
};

export const useUpdatePass = () => {
  return useMutation<any, Error, { password: string }, unknown>({
    mutationFn: async (data) => await updatePass(data),
    onSuccess: () => {
      // Invalidate the "get-all-userdata" query to revalidate it
      queryClient.invalidateQueries({ queryKey: ["update-pass"] });
    },
  });
};