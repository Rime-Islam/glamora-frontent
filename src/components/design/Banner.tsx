"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";
import { FlipWords } from "../ui/flip-words";
import Link from "next/link";

export function Banner() {
  const words = ["BETTER", "EXCLUSIVE", "ELEGANT", "MODERN"];
  const images = [
    "https://img.freepik.com/premium-photo/makeup-collection-cosmetics-cosmetics-black-background_950347-1405.jpg",
    "https://png.pngtree.com/background/20230425/original/pngtree-colorful-makeup-arranged-on-a-dark-background-picture-image_2478396.jpg",
  ];

  return (
    <ImagesSlider className="h-[90vh] min-h-[520px]" images={images}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-50 flex flex-col items-center text-center px-6 max-w-3xl mx-auto"
      >
        {/* Pill badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          New Collection 2025
        </motion.span>

        {/* Flip words */}
        <motion.div className="text-white/80 text-lg md:text-2xl font-light mb-2 tracking-wide">
          <FlipWords words={words} />
        </motion.div>

        {/* Hero heading */}
        <motion.h1 className="font-extrabold text-4xl md:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 leading-none tracking-tight mb-4">
          COSMETICS
        </motion.h1>

        <motion.p className="text-white/70 text-sm md:text-base max-w-md mb-8 leading-relaxed">
          Discover premium beauty products crafted to make you look and feel extraordinary — every single day.
        </motion.p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/product">
            <button className="group flex items-center gap-2 px-7 py-3.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-white/90 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]">
              Shop Now
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </Link>
          <Link href="/flashsale">
            <button className="flex items-center gap-2 px-7 py-3.5 backdrop-blur border border-white/30 text-white font-semibold rounded-full text-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              ⚡ Flash Sale
            </button>
          </Link>
        </div>
      </motion.div>
    </ImagesSlider>
  );
}
