"use client";
import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Premium Loading Spinner component matching the GLAMORA design system.
 * Use for inline loading states (e.g., in buttons or sections).
 */
export const LoadingSpinner = ({ className = "w-5 h-5", text }: { className?: string; text?: string }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className={`${className} animate-spin text-inherit`} />
      {text && <span className="text-sm font-bold tracking-tight">{text}</span>}
    </div>
  );
};

/**
 * Full page loader component for high-level loading states.
 */
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative mb-8">
        {/* Abstract animated geometric shapes for premium feel */}
        <div className="absolute inset-0 bg-rose-200 rounded-3xl rotate-6 animate-pulse transition-all duration-700 scale-125 blur-xl opacity-30"></div>
        <div className="absolute inset-0 bg-blue-200 rounded-3xl -rotate-6 animate-pulse transition-all duration-1000 scale-125 blur-xl opacity-30"></div>
        
        <div className="relative bg-white p-8 rounded-[40px] shadow-2xl border border-gray-50 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin mb-6"></div>
          
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none uppercase">Glamora</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Enhancing Style</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
         <div className="h-1 w-1 rounded-full bg-rose-500 animate-bounce [animation-delay:-0.3s]"></div>
         <div className="h-1 w-1 rounded-full bg-rose-500 animate-bounce [animation-delay:-0.15s]"></div>
         <div className="h-1 w-1 rounded-full bg-rose-500 animate-bounce"></div>
      </div>
    </div>
  );
};

export default PageLoader;
