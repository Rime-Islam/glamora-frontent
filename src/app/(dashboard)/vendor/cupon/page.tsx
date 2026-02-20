"use client";
import AddCoupon from "./AddCupon";
import { Ticket } from "lucide-react";

const Cupon = () => {
    return (
        <div className="animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* ─── Page Header ─── */}
                <div className="mb-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-[2rem] bg-rose-50 text-rose-500 flex items-center justify-center shadow-lg shadow-rose-100/50 mb-6 border border-rose-100">
                        <Ticket className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-2">Campaign Management</p>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Create Promotional Coupon</h1>
                        <p className="max-w-lg mx-auto text-sm font-medium text-gray-400 mt-3">
                            Drive more sales by offering exclusive discounts to your most loyal customers.
                        </p>
                    </div>
                </div>

                {/* ─── Main Form ─── */}
                <div className="max-w-3xl mx-auto">
                    <AddCoupon />
                </div>
            </div>
        </div>
    );
};

export default Cupon;