"use client"
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { IUser } from "@/interface/user.interface";
import { useBlockUser, useDeleteUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import image from "../../../../../public/image/placeholder.png"
const UserData = ({ users }: { users: IUser[] }) => {

    const { mutate: deleteSingleUser } = useDeleteUser();
    const { mutate: blockSingleUser } = useBlockUser();
  
    const blockUser = (id: string) => {
      blockSingleUser(id, {
        onSuccess: () => {
          toast.success("User Account Status Changed");
        },
        onError: () => {
          toast.error("Something went wrong! Try again.");
        },
      });
    };
    const deleteUser = (id: string) => {
      deleteSingleUser(id, {
        onSuccess: () => {
          toast.success("User Account Status Changed");
        },
        onError: () => {
          toast.error("Something went wrong! Try again.");
        },
      });
    };
 
      return (
        <>
          <ul className="max-w-2xl mx-auto w-full gap-4">
            
            <div>
            {users.map((user, index) => (
              <motion.div key={user?.userId} className="p-4 dark:bg-slate-500 bg-slate-200  mt-5 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
                <div className="flex gap-4 flex-col md:flex-row ">
                  <motion.div>
                   <Image
                      width={100}
                      height={100}
                      src={user.customer?.image ||
                        user.vendor?.image || image}
                      alt={user.customer?.name || user.vendor?.name || "User"}
                      className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                    />
                  </motion.div>
                  <div >
                    <div className="flex gap-3">
                    <motion.h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 text-center md:text-left">
                    {user.customer?.name || user.vendor?.name || "N/A"}
                    </motion.h3>
                    <motion.p className=" text-sm rounded-full font-bold  hover:text-black text-green-600">
                    {user.role.toLocaleLowerCase()}
                    </motion.p>
                    </div>
                    <motion.p className="text-neutral-600 text-sm dark:text-neutral-400 text-center md:text-left">
                    {user.email}
                    </motion.p>
                  </div>
                </div>
                <motion.div className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0">
                {user.isBlocked ? (
                <span className="text-red-500 hover:text-white">Blocked</span>
              ) : (
                <span className="text-green-500 hover:text-white">Active</span>
              )}
                </motion.div>

           <div className="flex gap-5">
           <button onClick={() => blockUser(user.userId)}
            className="bg-gradient-to-br px-2 from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >Block </button>
                <button onClick={() => deleteUser(user.userId)}
            className="bg-gradient-to-br px-2  from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >Delete </button>
           </div>

              </motion.div>
            ))}
            </div>
          </ul>
        </>
      );
    }
     

export default UserData;