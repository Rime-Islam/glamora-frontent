"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";
import { FlipWords } from "../ui/flip-words";
export function Banner() {
    const words = ["BETTER", "EXCLUSIVE", "ELEGENT", "MODERN"];
  const images = [
    "https://img.freepik.com/premium-photo/makeup-collection-cosmetics-cosmetics-black-background_950347-1405.jpg",
    "https://png.pngtree.com/background/20230425/original/pngtree-colorful-makeup-arranged-on-a-dark-background-picture-image_2478396.jpg",
   
  ];
  return (
    <ImagesSlider className="h-[55rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          x: -80,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 2,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.div className=" text-center font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 ">
        <FlipWords words={words} />
        </motion.div>
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 py-4">
        COSMETICS
        </motion.p>
        <motion.p className=" text-center  text-neutral-200 ">
          KEEP YOURSELF BEAUTIFUL ALL TIME
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Products →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
