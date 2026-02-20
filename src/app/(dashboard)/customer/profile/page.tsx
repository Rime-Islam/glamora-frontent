"use client";
import ChangePassword from "@/components/common/ChangePassword/ChangePassword";
import ProfilePage from "@/components/design/ProfilePage";
import { useGetUserDashboard } from "@/hooks/dashboard";
import { ShieldAlert } from "lucide-react";

const Profile = () => {
    const { data: { data } = {}, isLoading, error } = useGetUserDashboard();
    
    if (isLoading) {
      return (
        <div className="space-y-8 max-w-5xl mx-auto">
          <div className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
          <div className="h-48 bg-gray-100 rounded-3xl animate-pulse" />
        </div>
      );
    }
    
    const user = data?.data?.user;
    
    return (
      <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
        {/* ─── Header ─── */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Account Management
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your personal information, profile photo, and security settings.
          </p>
        </div>

        {/* ─── Profile Section ─── */}
        <div className="space-y-8">
          <ProfilePage
            name={user?.name}
            email={user?.email}
            role="Customer"
            phone={user?.phone || "N/A"}
            address={user?.address || "No address provided"}
            profilePhoto={user?.image || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
          />

          {/* ─── Security Section ─── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Security Settings</h2>
                  <p className="text-xs text-gray-400 font-medium">Protect your account with a strong password.</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;