"use client";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import { useGetUserDashboard } from "@/hooks/dashboard";
import React from "react";
import {
  ShoppingBag,
  Wallet,
  Tag,
  Clock,
  CheckCircle,
  Users,
  Star,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  const { data, isLoading, error } = useGetUserDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-2xl border border-red-100 min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <span className="text-xl">⚠️</span>
        </div>
        <h3 className="text-lg font-bold text-red-900 mb-1">
          Unable to load dashboard
        </h3>
        <p className="text-sm text-red-600/80 max-w-xs text-center">
          {error.message || "There was an error connecting to the server. Please check your connection."}
        </p>
      </div>
    );
  }

  const dashboardData = data?.data;

  const STATS_CARDS = [
    {
      title: "Total Orders",
      value: dashboardData?.totalOrders || 0,
      icon: ShoppingBag,
      color: "blue",
      suffix: "orders",
    },
    {
      title: "Total Spent",
      value: `৳${(dashboardData?.totalSpent || 0).toLocaleString()}`,
      icon: Wallet,
      color: "emerald",
      suffix: "total spent",
    },
    {
      title: "Total Discounts",
      value: `৳${(dashboardData?.totalDiscounts || 0).toLocaleString()}`,
      icon: Tag,
      color: "rose",
      suffix: "saved",
    },
    {
      title: "Shops Followed",
      value: dashboardData?.totalFollowers || 0,
      icon: Users,
      color: "violet",
      suffix: "shops",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* ─── Header ─── */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
          Overview
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back!
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Here&apos;s a quick look at what&apos;s happening with your account.
        </p>
      </div>

      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
        {STATS_CARDS.map((stat, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  stat.color === "blue"
                    ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    : stat.color === "emerald"
                    ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                    : stat.color === "rose"
                    ? "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"
                    : "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white"
                }`}
              >
                <stat.icon className="w-5.5 h-5.5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 leading-none">
              {stat.value}
            </h3>
            <p className="text-[13px] font-semibold text-gray-400 mt-1.5 uppercase tracking-wider">
              {stat.title}
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-[11px] font-bold text-gray-400">
              <TrendingUp className="w-3 h-3" />
              <span>{stat.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ─── Orders by Status ─── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-blue-500" />
              Quick Order Status
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData?.orderStatus &&
                Object.entries(dashboardData.orderStatus).map(
                  ([status, count]) => (
                    <div key={status} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-sm font-bold">
                        <span className="capitalize text-gray-700">
                          {status.toLocaleLowerCase()}
                        </span>
                        <span className="text-gray-900">{count}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            status === "DELIVERED"
                              ? "bg-emerald-500"
                              : status === "ONGOING"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (count / (dashboardData.totalOrders || 1)) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>

        {/* ─── Recent Activity / Reviews ─── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-4.5 h-4.5 text-amber-400" />
              Your Contributions
            </h2>
          </div>
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
              <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {dashboardData?.totalReviews || 0} Reviews Written
            </h3>
            <p className="text-sm text-gray-400 max-w-[240px] leading-relaxed">
              Your feedback helps our community make better shopping decisions.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xl font-extrabold text-gray-900">
                  {dashboardData?.totalReviews || 0}
                </p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Reviews
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xl font-extrabold text-gray-900">
                  {dashboardData?.totalFollowers || 0}
                </p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Following
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;