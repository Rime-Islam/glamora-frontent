"use client";

import ChangePassword from "@/components/common/ChangePassword/ChangePassword";
import { useGetAdminDashboard } from "@/hooks/dashboard";
import React from "react";
import {
  FaUsers,
  FaBox,
  FaStore,
  FaShoppingCart,
  FaStar,
  FaDollarSign,
} from "react-icons/fa"; 
import  DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";



const Dashboard = () => {
  const { data: { data } = {}, isLoading, error } = useGetAdminDashboard();

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <div>Error loading dashboard data.</div>;

  const {
    totalEarnings,
    totalUsers,
    totalCustomers,
    totalVendors,
    totalProducts,
    totalOrders,
    totalReviews,
  } = data || {};

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>

      {/* Total Earnings Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-10 bg-slate-300">
          <FaDollarSign className="text-4xl text-green-600 mr-4" />
          </div>
          <div className="px-4 text-gray-700">
            <h2 className="text-xl font-semibold">Total Earnings</h2>
            <p className="text-3xl font-bold text-green-600">
              {totalEarnings}TK
            </p>
          </div>
        </div>

        {/* Total Users Section */}
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-10 bg-slate-300">
          <FaUsers className="text-4xl text-blue-600 mr-4" />
          </div>
          <div className="px-4 text-gray-700">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
        </div>

        {/* Total Products Section */}
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-10 bg-slate-300">
          <FaBox className="text-4xl text-purple-600 mr-4" />
          </div>
          <div className="px-4 text-gray-700">
          <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </div>
        </div>

      {/* Counts for Customers, Vendors, Orders, and Reviews */}
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-10 bg-slate-300">
          <FaUsers className="text-4xl text-indigo-600 mr-4" />
          </div>
          <div className="px-4 text-gray-700">
          <h2 className="text-xl font-semibold">Total Customers</h2>
            <p className="text-3xl font-bold">{totalCustomers}</p>
          </div>
        </div>

        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-10 bg-slate-300">
          <FaStore className="text-4xl text-teal-600 mr-4" />
          </div>
          <div className="px-4 text-gray-700">
          <h2 className="text-xl font-semibold">Total Vendors</h2>
          <p className="text-3xl font-bold">{totalVendors}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-10 bg-slate-300">
          <FaShoppingCart className="text-4xl text-orange-600 mr-4" />
          </div>
          <div className="px-4 text-gray-700">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold">{totalOrders}</p>
          </div>
        </div>

        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-10 bg-slate-300">
          <FaStar className="text-4xl text-yellow-600 mr-4" />
          </div>
          <div className="px-4 text-gray-700">
          <h2 className="text-xl font-semibold">Total Reviews</h2>
          <p className="text-3xl font-bold">{totalReviews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;