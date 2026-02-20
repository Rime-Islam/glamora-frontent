"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IShop } from "@/interface/shop.interface";
import { MapPin, Users, Hash, Package } from "lucide-react";

const ShopDetails = ({ shop }: { shop: IShop }) => {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* ─── Shop Hero Banner ─── */}
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl shadow-gray-200/50 min-h-[400px] flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={shop?.images?.[0] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"}
                        alt={shop?.name}
                        className="w-full h-full object-cover opacity-40 scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-8 w-full">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 backdrop-blur-md rounded-full text-rose-300 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-rose-500/30">
                            Verified Professional Seller
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-sm">
                            {shop?.name}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-300">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-rose-500" />
                                </div>
                                <span className="font-bold text-sm">{shop?.location}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Hash className="w-4 h-4 text-rose-500" />
                                </div>
                                <span className="font-mono text-xs opacity-75">{shop?.shopId}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:bg-white/15 transition-all group/stat cursor-default shadow-xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2">Followers</p>
                            <p className="text-3xl font-black text-white flex items-center justify-center gap-3">
                                <Users className="w-6 h-6 text-rose-500" />
                                {shop?.followers?.length || 0}
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:bg-white/15 transition-all group/stat cursor-default shadow-xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2">Inventory</p>
                            <p className="text-3xl font-black text-white flex items-center justify-center gap-3">
                                <Package className="w-6 h-6 text-rose-500" />
                                {shop?.products?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Product Catalog ─── */}
            <div className="space-y-8 pt-4">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-10 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.3)]" />
                       <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                           Store Catalog
                       </h2>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-[11px] font-black uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Management Active
                    </div>
                </div>

                <div className="relative group/catalog">
                    {shop?.products && shop.products.length > 0 ? (
                        <HoverEffect items={shop?.products as any || []} />
                    ) : (
                        <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[3rem] bg-gray-50/30 text-center animate-in fade-in duration-1000">
                            <Package className="w-16 h-16 text-gray-200 mb-6" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Published</h3>
                            <p className="text-sm text-gray-500 font-medium">Start adding products to populate your storefront.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopDetails;