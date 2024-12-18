"use client";


import { useGetUserDashboard } from "@/hooks/dashboard"; 
import React from "react";
import {
  FaShoppingCart,
  FaDollarSign,
  FaPercentage,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaUserFriends,
  FaStar,
} from "react-icons/fa";

const Dashboard = () => {
  const { data, isLoading, error } = useGetUserDashboard();
console.log(data)
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
          Error loading dashboard: {error.message}
        </div>
      </div>
    );
  }

  const dashboardData = data?.data;

  return (
    <div>
      <div className="dashboard-container p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Customer Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Orders */}
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-10 bg-slate-300">
                    <FaShoppingCart className="text-3xl text-blue-500" />
                    </div>
                    <div className="px-4 text-gray-700">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <p className="text-4xl font-bold mt-4">
                    {dashboardData?.totalOrders || 0}
                  </p>
                          </div>
                  </div>

          {/* Total Spent */}
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-10 bg-slate-300">
                    <FaDollarSign className="text-3xl text-yellow-500" />
                    </div>
                    <div className="px-4 text-gray-700">
                    <h2 className="text-xl font-semibold">Total Spent</h2>
                    <p className="text-4xl font-bold mt-4">
              ${dashboardData?.totalSpent?.toFixed(2) || "0.00"}
            </p>
                          </div>
                  </div>

          {/* Total Discounts */}
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-10 bg-slate-300">
                    <FaPercentage className="text-3xl text-purple-500" />
                    </div>
                    <div className="px-4 text-gray-700">
                    <h2 className="text-xl font-semibold">Total Discounts</h2>
                    <p className="text-4xl font-bold mt-4">
              ${dashboardData?.totalDiscounts?.toFixed(2) || "0.00"}
            </p>
                          </div>
                  </div>

          {/* Orders by Status */}
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-10 bg-slate-300">
                    <FaClipboardList className="text-3xl text-gray-500" />
                    </div>
                    <div className="px-4 text-gray-700">
                    <h2 className="text-xl font-semibold">Orders by Status</h2>
                    <ul className="mt-2 space-y-1">
              {dashboardData?.orderStatus &&
                Object.entries(dashboardData.orderStatus).map(
                  ([status, count]) => (
                    <li
                      key={status}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span className="capitalize">{status.toLocaleLowerCase()}</span>
                      <span>{count}</span>
                    </li>
                  )
                )}
            </ul>
                          </div>
                  </div>

          {/* Payment Status */}
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-10 bg-slate-300">
                    <FaMoneyCheckAlt className="text-3xl text-gray-500" />
                    </div>
                    <div className="px-4 text-gray-700">
                    <h2 className="text-xl font-semibold">Payment Status</h2>
                    <ul className="mt-2 space-y-2">
              {dashboardData?.paymentStatus &&
                Object.entries(dashboardData.paymentStatus).map(
                  ([status, count]) => (
                    <li
                      key={status}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span className="capitalize">{status.toLocaleLowerCase()}</span>
                      <span>{count}</span>
                    </li>
                  )
                )}
            </ul>
                          </div>
                  </div>

          {/* Followers */}
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-10 bg-slate-300">
                    <FaUserFriends className="text-3xl text-pink-500" />
                    </div>
                    <div className="px-4 text-gray-700">
                    <h2 className="text-xl font-semibold">Total Shops Followed</h2>
                    <p className="text-4xl font-bold mt-4">
              {dashboardData?.totalFollowers || 0}
            </p>      </div>
                  </div>

          {/* Reviews */}
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-10 bg-slate-300">
                    <FaStar className="text-3xl text-teal-500" />
                    </div>
                    <div className="px-4 text-gray-700">
                    <h2 className="text-xl font-semibold">Total Reviews</h2>
                    <p className="text-4xl font-bold mt-4">
              {dashboardData?.totalReviews || 0}
            </p>
                      </div>
                  </div>

        </div>
      </div>
      <div>
        <ChangePass></ChangePass>
      </div>
    </div>
  );
};

export default Dashboard;