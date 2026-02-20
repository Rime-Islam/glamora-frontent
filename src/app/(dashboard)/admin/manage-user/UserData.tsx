"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { IUser } from "@/interface/user.interface";
import { useBlockUser, useDeleteUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import placeholder from "../../../../../public/image/placeholder.png";
import { 
    Mail, 
    ShieldCheck, 
    ShieldAlert, 
    Trash2, 
    Ban, 
    CheckCircle2, 
    User,
    ArrowRight
} from "lucide-react";

const UserData = ({ users }: { users: IUser[] }) => {
    const { mutate: deleteSingleUser } = useDeleteUser();
    const { mutate: blockSingleUser } = useBlockUser();

    const blockUser = (id: string) => {
        blockSingleUser(id, {
            onSuccess: () => {
                toast.success("Identity status successfully modified. ✨");
            },
            onError: () => {
                toast.error("Process error. Verification required.");
            },
        });
    };

    const deleteUser = (id: string) => {
        deleteSingleUser(id, {
            onSuccess: () => {
                toast.success("Account permanently purged from registry.");
            },
            onError: () => {
                toast.error("Cleanup failed. System protection active.");
            },
        });
    };

    return (
        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            {users.map((user, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={user?.userId}
                    className="group bg-white border border-gray-100 p-6 sm:p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/40 hover:border-rose-200 hover:shadow-rose-100/50 transition-all duration-500 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
                >
                    {/* Decorative Background Role Label */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                        <p className="text-8xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                            {user.role}
                        </p>
                    </div>

                    <div className="flex gap-6 items-center flex-1 relative z-10 w-full md:w-auto">
                        {/* User Avatar */}
                        <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-0 bg-rose-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Image
                                width={120}
                                height={120}
                                src={user.customer?.image || user.vendor?.image || placeholder}
                                alt={user.customer?.name || user.vendor?.name || "User"}
                                className="h-20 w-20 rounded-2xl object-cover border border-gray-100 shadow-sm relative z-10"
                            />
                        </div>

                        {/* User Info */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-xl font-black text-gray-900 tracking-tight truncate">
                                    {user.customer?.name || user.vendor?.name || "Identified Guest"}
                                </h3>
                                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                                    user.role === "ADMIN" ? "bg-rose-50 border-rose-100 text-rose-600" : 
                                    user.role === "VENDOR" ? "bg-blue-50 border-blue-100 text-blue-600" : 
                                    "bg-emerald-50 border-emerald-100 text-emerald-600"
                                }`}>
                                    {user.role}
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold text-gray-500 flex items-center gap-2 truncate">
                                    <Mail className="w-3.5 h-3.5 opacity-50" />
                                    {user.email}
                                </p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    UID: {user.userId.slice(0, 12)}...
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 w-full md:w-auto">
                        {/* Status Chip */}
                        <div className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border transition-colors ${
                            user.isBlocked 
                            ? "bg-rose-50 border-rose-100 text-rose-500" 
                            : "bg-emerald-50 border-emerald-100 text-emerald-500"
                        }`}>
                            {user.isBlocked ? (
                                <>
                                    <ShieldAlert className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Restricted</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Authorized</span>
                                </>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button 
                                onClick={() => blockUser(user.userId)}
                                className="flex-1 sm:flex-none h-12 w-full sm:w-12 rounded-xl border border-gray-100 bg-white text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all flex items-center justify-center group/btn shadow-sm"
                                title={user.isBlocked ? "Unlock Access" : "Restrict Account"}
                            >
                                <Ban className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                            </button>
                            <button 
                                onClick={() => deleteUser(user.userId)}
                                className="flex-1 sm:flex-none h-12 w-full sm:w-12 rounded-xl border border-gray-100 bg-white text-gray-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all flex items-center justify-center group/btn shadow-sm shadow-gray-100"
                                title="Purge Record"
                            >
                                <Trash2 className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default UserData;