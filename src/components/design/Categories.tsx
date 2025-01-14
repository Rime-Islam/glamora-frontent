"use client";
import React from "react";
import "swiper/css";
import Link from "next/link";
import { useAllCategory } from "@/hooks/category.hook";
import { useAppDispatch } from "@/redux/hook";
import { setCategoryId } from "@/redux/features/cart/cartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import { Skeleton } from "../ui/skeleton";

const Categories = () => {
  const { data, isLoading } = useAllCategory(); // Assuming `isLoading` is available
  const dispatch = useAppDispatch();

  const buttonStyles =
    "w-36 h-10 md:min-w-40 flex items-center justify-center rounded-full bg-black md:h-14 text-white font-medium";
  const hoverEffect = "hover:scale-95 duration-500";

  if (isLoading) {
    return (
      <div className="flex flex-wrap p-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-6 w-16" />
      ))}
    </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg font-medium">No Categories</p>
      </div>
    );
  }

  return (
    <div className="mb-[5vh] px-1 ">
      <div className=" mb-12 ">
		<h2 className="px-[2vw] xl:px-0 text-xl md:text-2xl lg:text-3xl font-bold">Browse By Category</h2>
	</div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          440: { slidesPerView: 3, spaceBetween: 20 },
          550: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          988: { slidesPerView: 5, spaceBetween: 30 },
          1024: { slidesPerView: 6, spaceBetween: 10 },
        }}
        modules={[Pagination]}
      >
        {data.data.map(({ categoryId, name }) => (
          <SwiperSlide key={categoryId}>
            <Link
              href="/product"
              onClick={() => dispatch(setCategoryId(categoryId))}
              className={`w-full ${hoverEffect} flex justify-center`}
            >
              <div className={buttonStyles}>{name}</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;