"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import {ProductCardProps }from "@/interface/product.interface"



const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {
        data?.map((item) => (
            <CardContainer key={item?.productId} className="inter-var w-96 h-xl">
            <CardBody className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="text-xl  font-bold text-neutral-600 dark:text-white"
              >
                {item.name.slice(0, 28)} ...
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Hover over this card to unleash the power of CSS perspective
              </CardItem>
              <CardItem translateZ="100" className="w-full h-96 mt-4">
                <Image
                  src={item.images[0]}
                  height="50"
                  width="100"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href="https://twitter.com/mannupaaji"
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  view details →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Add to cart
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))
    }
   </div>
  );
};

export default ProductCard;
