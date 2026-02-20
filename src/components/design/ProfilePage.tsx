import React from "react";
import { Mail, Phone, MapPin, User, BadgeCheck, Pencil, Settings } from "lucide-react";

interface ProfilePageProps {
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  profilePhoto: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  name,
  email,
  role,
  phone,
  address,
  profilePhoto,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ─── Hero Banner Background ─── */}
      <div className="h-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative">
        <div className="absolute top-0 right-0 w-64 h-full bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-full bg-blue-500/10 rounded-full blur-2xl" />
      </div>

      <div className="px-8 pb-8 relative">
        {/* ─── Profile Image & Name ─── */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12 mb-8">
          <div className="relative group self-start">
            <div className="w-32 h-32 rounded-3xl border-4 border-white overflow-hidden bg-gray-100 shadow-xl group-hover:scale-105 transition-transform duration-300">
              <img
                src={profilePhoto}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {name}
              </h2>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <BadgeCheck className="w-3 h-3" />
                {role}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-400">
              Personal account information
            </p>
          </div>

          <div className="flex gap-3 self-center md:self-end">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-rose-500 active:scale-95 transition-all shadow-lg hover:shadow-rose-100">
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
            <button className="w-11 h-11 border border-gray-100 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ─── Info Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Card: Contact */}
          <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-50 space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> Contact Details
            </p>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400">Email Address</span>
                <span className="text-sm font-bold text-gray-900 truncate">{email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400">Phone Number</span>
                <span className="text-sm font-bold text-gray-900">{phone}</span>
              </div>
            </div>
          </div>

          {/* Card: Location */}
          <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-50 space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Shipping Address
            </p>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400">Default Address</span>
                <span className="text-sm font-bold text-gray-900 leading-tight line-clamp-2">
                  {address}
                </span>
              </div>
            </div>
          </div>

          {/* Card: Stats (Mock for premium feel) */}
          <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-50 space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <User className="w-3 h-3" /> Account Status
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400">Joined</span>
                <span className="text-sm font-bold text-gray-900">May 2024</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400">Member Type</span>
                <span className="text-sm font-bold text-rose-500">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;