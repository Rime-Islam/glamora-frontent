"use client";
import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useBlockShop } from "@/hooks/shop.hook";
import { IShop } from "@/interface/shop.interface";
import { 
    MapPin, 
    Mail, 
    Ban, 
    CheckCircle2, 
    AlertTriangle,
    Image as ImageIcon,
    ExternalLink
} from "lucide-react";

const ShopData = ({ Data }: { Data: IShop[] }) => {
    const { mutate } = useBlockShop();

    const blockShop = (id: string) => {
        mutate(id, {
            onSuccess: () => {
                toast.success("Establishment status updated. ✨");
            },
            onError: () => {
                toast.error("Operation failed. System protection active.");
            },
        });
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                        <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Log</th>
                        <th className="px-6 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Visual Identity</th>
                        <th className="px-6 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Establishment</th>
                        <th className="px-6 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Network Details</th>
                        <th className="px-6 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500">Status</th>
                        <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-gray-500 text-right">Sanctions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {Data.map((shop, index) => (
                        <tr key={shop?.shopId} className="group hover:bg-rose-50/20 transition-colors">
                            {/* Index */}
                            <td className="px-8 py-6 text-sm font-black text-gray-300">
                                {String(index + 1).padStart(2, '0')}
                            </td>

                            {/* Image */}
                            <td className="px-6 py-6">
                                <div className="relative w-20 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-500">
                                    <Image
                                        fill
                                        src={shop?.images?.[0] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop"}
                                        alt={shop?.name}
                                        className="object-cover"
                                    />
                                </div>
                            </td>

                            {/* Name & Location */}
                            <td className="px-6 py-6">
                                <div>
                                    <p className="text-sm font-black text-gray-900 mb-1">{shop?.name}</p>
                                    <p className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-widest">
                                        <MapPin className="w-3 h-3 text-rose-500" />
                                        {shop?.location}
                                    </p>
                                </div>
                            </td>

                            {/* Vendor/Network */}
                            <td className="px-6 py-6">
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-gray-600 flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 opacity-40" />
                                        {shop?.vendor?.email}
                                    </p>
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">ID: {shop?.shopId.slice(0, 10)}</p>
                                </div>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-6 font-medium">
                                {shop?.isBlackListed ? (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-500 rounded-2xl border border-rose-100">
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Blacklisted</span>
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-500 rounded-2xl border border-emerald-100">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Operational</span>
                                    </div>
                                )}
                            </td>

                            {/* Actions */}
                            <td className="px-8 py-6 text-right">
                                <button 
                                    onClick={() => blockShop(shop.shopId)} 
                                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ml-auto shadow-sm active:scale-95 ${
                                        shop.isBlackListed 
                                        ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100" 
                                        : "bg-gray-900 text-white hover:bg-rose-600 shadow-gray-100"
                                    }`}
                                >
                                    <Ban className="w-3.5 h-3.5" />
                                    {shop.isBlackListed ? "Restore Access" : "Enforce Block"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShopData;