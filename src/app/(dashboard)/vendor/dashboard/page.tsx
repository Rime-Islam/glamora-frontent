"use client";

;
import ChangePassword from "@/components/common/ChangePassword/ChangePassword";
import { useGetVendorDashboard } from "@/hooks/dashboard";
import React from "react";

import { FaShopify, FaBox, FaCheckCircle, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
  const { data, isLoading, error } = useGetVendorDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-500">
          Error: {error.message}
        </div>
      </div>
    );
  }

  const totalShops = data?.data?.totalShops || 0;
  const totalProducts = data?.data?.totalProducts || 0;
  const totalCompletedOrders = data?.data?.totalCompletedOrders || 0;
  const totalEarnings = data?.data?.totalEarnings || 0;

  return (
    <div className="p-8">
    <h1 className="text-3xl font-semibold mb-8">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Shops */}
         <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-14 bg-slate-300">
                  <FaShopify className="text-4xl text-blue-500 mb-3" />
                  </div>
                  <div className="px-4 text-gray-700">
                  <p className="text-lg font-semibold">Your Shops</p>
                  <p className="text-2xl font-bold">{totalShops} </p>
                  </div>
                </div>

        {/* Total Products */}
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-14 bg-slate-300">
                  <FaBox className="text-4xl text-green-500 mb-3" />
                  </div>
                  <div className="px-4 text-gray-700">
                  <p className="text-lg font-semibold">Total Products</p>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                  </div>
                </div>

        {/* Completed Orders */}
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-14 bg-slate-300">
                  <FaCheckCircle className="text-4xl text-yellow-500 mb-3" />
                  </div>
                  <div className="px-4 text-gray-700">
                  <p className="text-lg font-semibold">Completed Orders</p>
                  <p className="text-2xl font-bold">{totalCompletedOrders} </p>
                  </div>
                </div>

        {/* Total Earnings */}
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-14 bg-slate-300">
                  <FaDollarSign className="text-4xl text-pink-500 mb-3" />
                  </div>
                  <div className="px-4 text-gray-700">
                  <p className="text-lg font-semibold">Total Earnings</p>
                  <p className="text-2xl font-bold">{totalEarnings} Tk</p>
                  </div>
                </div>
          
      </div>
    </div>
  );
};

export default Dashboard;