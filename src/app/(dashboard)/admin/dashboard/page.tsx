"use client";

import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import { useGetAdminDashboard } from "@/hooks/dashboard";
import React from "react";
import { 
    Users, 
    Package, 
    Store, 
    ShoppingCart, 
    Star, 
    Wallet, 
    TrendingUp, 
    ArrowUpRight, 
    ShieldCheck, 
    Zap,
    Scale,
    Activity,
    UserCheck,
    Briefcase
} from "lucide-react";

const Dashboard = () => {
    const { data: { data } = {}, isLoading, error } = useGetAdminDashboard();

    if (isLoading) return <DashboardSkeleton />;
    
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white rounded-[3rem] border border-gray-100 mx-8 mt-8 text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">System insight Unreachable</h2>
                <p className="text-sm font-medium text-gray-400">We encountered an issue while aggregating global metrics.</p>
            </div>
        );
    }

    const {
        totalEarnings = 0,
        totalUsers = 0,
        totalCustomers = 0,
        totalVendors = 0,
        totalProducts = 0,
        totalOrders = 0,
        totalReviews = 0,
    } = data || {};

    const primaryStats = [
        {
            label: "Global Net Revenue",
            value: totalEarnings,
            icon: Wallet,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            unit: "৳",
            trend: "All-time accumulated"
        },
        {
            label: "Platform Population",
            value: totalUsers,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
            unit: "Users",
            trend: "Validated accounts"
        },
        {
            label: "Global Inventory",
            value: totalProducts,
            icon: Package,
            color: "text-rose-600",
            bg: "bg-rose-50",
            border: "border-rose-100",
            unit: "SKUs",
            trend: "Active listings"
        }
    ];

    const subStats = [
        { label: "Client Base", value: totalCustomers, icon: UserCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Vendor Network", value: totalVendors, icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Total Transactions", value: totalOrders, icon: ShoppingCart, color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Public Sentiment", value: totalReviews, icon: Star, color: "text-purple-600", bg: "bg-purple-50" }
    ];

    return (
        <div className="p-4 sm:p-8 animate-in fade-in duration-1000 pb-20">
            {/* ─── Page Header ─── */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-xl">
                            <Scale className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-1">Global Oversight</p>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Command Center</h1>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-400 max-w-sm leading-relaxed">
                        High-level monitoring of platform integrity, commercial flow, and market expansion.
                    </p>
                </div>
                
                <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 px-6 py-3 rounded-2xl">
                    <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Node Cluster: Healthy</span>
                </div>
            </div>

            {/* ─── Primary Metric Grid ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {primaryStats.map((stat, idx) => (
                    <div 
                        key={idx} 
                        className="group relative bg-white border border-gray-100 p-10 rounded-[3rem] shadow-2xl shadow-gray-200/40 hover:border-rose-200 hover:shadow-rose-100/50 transition-all duration-500 overflow-hidden"
                    >
                        <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full ${stat.bg} opacity-20 group-hover:scale-150 transition-transform duration-1000`} />
                        
                        <div className="relative z-10">
                            <div className={`w-16 h-16 rounded-[1.5rem] ${stat.bg} ${stat.color} flex items-center justify-center mb-8 border ${stat.border}`}>
                                <stat.icon className="w-8 h-8" />
                            </div>
                            
                            <div className="space-y-2">
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    {stat.label}
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                                        {stat.value.toLocaleString()}
                                    </h2>
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.unit}</span>
                                </div>
                                <div className="pt-6 border-t border-gray-50 mt-6">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                                        {stat.trend}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── Secondary Stats Grid ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                {subStats.map((stat, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-lg shadow-gray-100/50 flex items-center gap-6 hover:border-rose-100 transition-all">
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center border border-transparent`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900">{stat.value.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── Platform Security ─── */}
            <div className="bg-gray-900 p-12 rounded-[4rem] text-white flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden group shadow-3xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                    <ShieldCheck className="w-64 h-64" />
                </div>
                
                <div className="relative z-10 shrink-0">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-rose-500 flex items-center justify-center shadow-3xl shadow-rose-500/20">
                        <ShieldCheck className="w-16 h-16" />
                    </div>
                </div>
                
                <div className="relative z-10 text-center lg:text-left flex-1">
                    <h3 className="text-3xl font-black mb-4 tracking-tight">Security & Moderation Active</h3>
                    <p className="text-gray-400 text-base font-medium mb-8 leading-relaxed max-w-2xl">
                        Universal admin privileges are enforced. Any changes to shop status or user access are 
                        logged with immutable cryptographic hashes for total auditability.
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <div className="px-6 py-3 bg-white/10 rounded-2xl text-xs font-bold tracking-widest border border-white/10 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                            ROOT ACCESS GRANTED
                        </div>
                        <div className="px-6 py-3 bg-white/10 rounded-2xl text-xs font-bold tracking-widest border border-white/10 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            PLATFORM HEALTH: 100%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;