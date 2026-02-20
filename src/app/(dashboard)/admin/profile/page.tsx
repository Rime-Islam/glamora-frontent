"use client";
import React from "react";
import ChangePassword from "@/components/common/ChangePassword/ChangePassword";
import ProfilePage from "@/components/design/ProfilePage";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { useGetAdminDashboard } from "@/hooks/dashboard";
import { 
    ShieldAlert, 
    ShieldCheck, 
    UserCircle, 
    Settings2, 
    BellRing,
    History
} from "lucide-react";

const Profile = () => {
    const { data: { data } = {}, isLoading, error } = useGetAdminDashboard();
    
    if (isLoading) {
        return (
            <div className="p-8 space-y-8 animate-pulse">
                <div className="h-64 bg-gray-100 rounded-[3rem]" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-32 bg-gray-100 rounded-3xl" />
                    <div className="h-32 bg-gray-100 rounded-3xl" />
                    <div className="h-32 bg-gray-100 rounded-3xl" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
                    <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">Credential Sync Failure</h2>
                <p className="text-sm font-medium text-gray-400">Unable to retrieve root administrator metadata.</p>
            </div>
        );
    }

    const admin = data?.admin;

    return (
        <div className="p-4 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* ─── Page Header ─── */}
            <div className="mb-10 flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-lg">
                        <UserCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">System Root</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Identity</h1>
                    </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Superuser Privileges</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-10">
                {/* ─── Profile Card ─── */}
                <ProfilePage
                    name={admin?.name}
                    email={admin?.email}
                    role="Platform Administrator"
                    phone={admin?.phone || "Root Secure Line"}
                    address={admin?.address || "Universal Command Proxy"}
                    profilePhoto={admin?.image || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
                />

                {/* ─── Security Cluster ─── */}
                <div className="bg-gray-50/50 rounded-[3rem] border border-gray-100 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                        <div className="max-w-md space-y-4 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <Settings2 className="w-5 h-5 text-amber-500" />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Root Auth Controls</h2>
                            </div>
                            <p className="text-sm font-medium text-gray-400 leading-relaxed">
                                Updating your primary authentication key will reset all active session tokens globally 
                                for this account. Ensure you are operating within a secure, encrypted node.
                            </p>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-gray-100 text-[10px] font-bold text-gray-500">
                                    <BellRing className="w-3 h-3 text-rose-500" />
                                    Security Logs Active
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-gray-100 text-[10px] font-bold text-gray-500">
                                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                    Hardened Access
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-gray-100 text-[10px] font-bold text-gray-500">
                                    <History className="w-3 h-3 text-blue-500" />
                                    Last Rotated: 2 days ago
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-auto self-center md:self-start">
                            <ChangePassword />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;