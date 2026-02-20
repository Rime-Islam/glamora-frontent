"use client";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import { useGetVendorDashboard } from "@/hooks/dashboard";
import React from "react";
import { 
    Store, 
    Package, 
    CheckCircle2, 
    Wallet, 
    TrendingUp, 
    ArrowUpRight, 
    ShieldCheck, 
    Zap,
    Layers
} from "lucide-react";

const Dashboard = () => {
    const { data, isLoading, error } = useGetVendorDashboard();

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white rounded-[3rem] border border-gray-100 mx-8 mt-8">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">Operational Insight Error</h2>
                <p className="text-sm font-medium text-gray-400">Unable to retrieve real-time performance data. {error.message}</p>
            </div>
        );
    }

    const totalShops = data?.data?.totalShops || 0;
    const totalProducts = data?.data?.totalProducts || 0;
    const totalCompletedOrders = data?.data?.totalCompletedOrders || 0;
    const totalEarnings = data?.data?.totalEarnings || 0;

    const stats = [
        {
            label: "Active Establishments",
            value: totalShops,
            unit: "Shops",
            icon: Store,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
            trend: "+2 new this month"
        },
        {
            label: "Inventory Managed",
            value: totalProducts,
            unit: "Live Products",
            icon: Package,
            color: "text-rose-600",
            bg: "bg-rose-50",
            border: "border-rose-100",
            trend: "98% in stock"
        },
        {
            label: "Success Logistics",
            value: totalCompletedOrders,
            unit: "Delivered Items",
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            trend: "100% fulfill rate"
        },
        {
            label: "Total Revenue",
            value: totalEarnings,
            unit: "BDT (Accumulated)",
            icon: Wallet,
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-100",
            trend: "Payout pending"
        }
    ];

    return (
        <div className="p-8 animate-in fade-in duration-700 pb-20">
            {/* ─── Dashboard Header ─── */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Performance Metrics</h1>
                    </div>
                    <p className="text-sm font-medium text-gray-400 max-w-md">
                        Real-time visualization of your commercial operations and revenue growth.
                    </p>
                </div>
                
                <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Sync Active</span>
                </div>
            </div>

            {/* ─── Metric Grid ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, idx) => (
                    <div 
                        key={idx} 
                        className="group relative bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:border-rose-200 hover:shadow-rose-100/50 transition-all duration-500 cursor-default overflow-hidden"
                    >
                        {/* Decorative background circle */}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${stat.bg} opacity-30 group-hover:scale-150 transition-transform duration-1000`} />
                        
                        <div className="relative z-10">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 shadow-sm border ${stat.border} group-hover:rotate-6 transition-transform`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    {stat.label}
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
                                        {stat.value.toLocaleString()}
                                    </h2>
                                    {stat.label === "Total Revenue" && <span className="text-[10px] font-black text-gray-400">৳</span>}
                                </div>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pt-1 border-t border-gray-50 mt-4 flex items-center gap-1.5">
                                    <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                                    {stat.trend}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── Operations Center ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Brand Trust Card */}
                <div className="bg-gray-900 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
                        <ShieldCheck className="w-32 h-32" />
                     </div>
                     <div className="relative z-10 shrink-0">
                        <div className="w-24 h-24 rounded-[2rem] bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/50">
                            <ShieldCheck className="w-12 h-12" />
                        </div>
                     </div>
                     <div className="relative z-10 text-center md:text-left">
                        <h3 className="text-2xl font-black mb-3 tracking-tight">Verified Professional Status</h3>
                        <p className="text-gray-400 text-sm font-medium mb-6 leading-relaxed">
                            Your shop is currently ranked in the top 5% of marketplace vendors. 
                            Respond to reviews to maintain your elite badge.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                                Integrity Score: 9.8
                            </div>
                            <div className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                                Response: 15min
                            </div>
                        </div>
                     </div>
                </div>

                {/* Quick Action Card (Placeholder appearance) */}
                <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 flex flex-col md:flex-row items-center gap-10 group overflow-hidden">
                     <div className="relative shrink-0">
                        <div className="w-24 h-24 rounded-[2rem] bg-gray-50 text-gray-200 flex items-center justify-center border border-gray-100 group-hover:bg-rose-50 transition-all group-hover:text-rose-500 group-hover:border-rose-100">
                            <Layers className="w-12 h-12" />
                        </div>
                     </div>
                     <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Expansion Strategy</h3>
                        <p className="text-gray-400 text-sm font-medium mb-6 leading-relaxed">
                            Your current inventory velocity suggests high demand for category expansion. 
                            Deploy new products to maximize quarterly earnings.
                        </p>
                        <button className="px-8 py-3 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-500 transition-all shadow-lg active:scale-95">
                            Plan Spring Catalog
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;