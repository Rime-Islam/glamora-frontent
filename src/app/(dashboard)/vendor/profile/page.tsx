"use client";
import React from "react";
import ChangePassword from "@/components/common/ChangePassword/ChangePassword";
import ProfilePage from "@/components/design/ProfilePage";
import { useGetVendorDashboard } from "@/hooks/dashboard";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { 
    UserCircle, 
    Settings2, 
    ShieldCheck, 
    TrendingUp, 
    Package, 
    ShoppingBag, 
    BellRing
} from "lucide-react";

const Profile = () => {
    const { data, isLoading, error } = useGetVendorDashboard();

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
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">Profile Sync Error</h2>
                <p className="text-sm font-medium text-gray-400">Unable to retrieve vendor credentials. {error.message}</p>
            </div>
        );
    }

    const vendor = data?.data?.vendor;
    const stats = [
        { label: "Total Catalog", value: data?.data?.totalProducts || 0, icon: Package },
        { label: "Sales Velocity", value: data?.data?.totalCompletedOrders || 0, icon: TrendingUp },
        { label: "Active Shops", value: data?.data?.totalShops || 0, icon: ShoppingBag },
    ];

    return (
        <div className="p-4 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* ─── Page Header ─── */}
            <div className="mb-10 flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-lg">
                        <UserCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Global Account</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Vendor Identity</h1>
                    </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Identity Verified</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-10">
                {/* ─── Profile Card ─── */}
                <ProfilePage
                    name={vendor?.name}
                    email={vendor?.email}
                    role="Executive Vendor"
                    phone={vendor?.phone || "Not specified"}
                    address={vendor?.address || "Primary Warehouse Address"}
                    profilePhoto={vendor?.image || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
                />

                {/* ─── Vendor Performance Snapshot ─── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center gap-6 hover:border-rose-200 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-rose-50 group-hover:text-rose-500 transition-all">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900">{stat.value.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ─── Security & Configuration ─── */}
                <div className="bg-gray-50/50 rounded-[3rem] border border-gray-100 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                        <div className="max-w-md space-y-4 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <Settings2 className="w-5 h-5 text-amber-500" />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Identity & Security</h2>
                            </div>
                            <p className="text-sm font-medium text-gray-400 leading-relaxed">
                                Manage your authentication credentials and global security protocols. 
                                We recommend rotating your password every 90 days to maintain warehouse integrity.
                            </p>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-gray-100 text-[10px] font-bold text-gray-500">
                                    <BellRing className="w-3 h-3 text-rose-500" />
                                    2FA Active
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-gray-100 text-[10px] font-bold text-gray-500">
                                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                    SSL Encrypted
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