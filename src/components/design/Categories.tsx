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
import { FaTags } from "react-icons/fa";


const Categories = () => {
  const { data, isLoading } = useAllCategory(); 
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div className="flex flex-wrap mt-8 mb-[5vh] p-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-28 w-36" />
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
    <div className="px-[2vw] xl:px-0 mb-[5vh]  ">
      <div className=" mb-12 ">
		<h2 className=" text-xl md:text-2xl lg:text-3xl font-bold">Browse By Category</h2>
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
        {data?.data?.map(({ categoryId, name, product }) => (
          <SwiperSlide key={categoryId}>
            <Link
              href="/product"
              onClick={() => dispatch(setCategoryId(categoryId))}
              className="w-full hover:scale-95 duration-500 flex justify-center px-2"
            >
              <div className="py-3 min-w-48 flex flex-col items-center justify-center rounded-lg bg-white md:max-h-48 font-medium">
              <FaTags className="text-yellow-500 w-12 rounded-full h-12 bg-yellow-100 p-3"/>
                <h1 className="text-lg py-3">{name}</h1>
                <div className="text-sm bg-gray-200 py-1 px-3 rounded-xl">{product?.length} Products</div>
              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;