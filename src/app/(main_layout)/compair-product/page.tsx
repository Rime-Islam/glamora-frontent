"use client";

import React from "react";
import { RootState } from "@/redux/store";
import { IProduct } from "@/interface/product.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  clearComparison,
  removeProductFromComparison,
} from "@/redux/features/compare/compareSlice";
import Link from "next/link";
import Image from "next/image";
import AvarageRating from "@/components/Rating/AvarageRating";
import {
  Trash2,
  Trophy,
  GitCompare,
  ArrowRight,
  ShoppingBag,
  X,
  Star,
  Tag,
  Layers,
} from "lucide-react";

const ComparisonPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(
    (state: RootState) => state.compareSlice.selectedProducts
  );

  const getCheapestProduct = () => {
    if (selectedProducts.length === 0) return null;
    return selectedProducts.reduce((cheapest, product) =>
      product.price < cheapest.price ? product : cheapest
    );
  };

  const handleClear = () => {
    dispatch(clearComparison());
  };

  const handleRemove = (productId: string) => {
    dispatch(removeProductFromComparison(productId));
  };

  const cheapestProduct = getCheapestProduct();

  /* ─── Empty State ─── */
  if (selectedProducts.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
            <GitCompare className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            No Products to Compare
          </h2>
          <p className="text-gray-400 text-sm max-w-sm mb-8">
            Add products to comparison from the product listing page to see a
            side-by-side breakdown of features and prices.
          </p>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-rose-500 transition-colors duration-300 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            Browse Products
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 xl:px-0 py-8 max-w-7xl mx-auto">
        {/* ─── Page Header ─── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
              Side by Side
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Compare Products
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {selectedProducts.length} product
              {selectedProducts.length !== 1 ? "s" : ""} selected
            </p>
          </div>

          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 w-fit"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>

        {/* ─── Winner Banner ─── */}
        {cheapestProduct && selectedProducts.length > 1 && (
          <div className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-emerald-800">
                Best Price Found!
              </p>
              <p className="text-sm text-emerald-600 mt-0.5">
                <span className="font-bold">{cheapestProduct.name}</span> is the
                most affordable at{" "}
                <span className="font-extrabold">
                  ৳{cheapestProduct.price.toFixed(2)}
                </span>
              </p>
            </div>
            <Link
              href={`/product/${cheapestProduct.productId}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors flex-shrink-0"
            >
              View Product
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* ─── Comparison Cards (Horizontal scroll on mobile) ─── */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div
            className="flex gap-5"
            style={{ minWidth: `${selectedProducts.length * 280}px` }}
          >
            {selectedProducts.map((product: IProduct) => {
              const isCheapest =
                cheapestProduct?.productId === product.productId &&
                selectedProducts.length > 1;
              return (
                <div
                  key={product.productId}
                  className={`relative flex-1 min-w-[260px] max-w-[340px] bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isCheapest
                      ? "border-emerald-200 shadow-lg shadow-emerald-50 ring-1 ring-emerald-100"
                      : "border-gray-100 hover:shadow-lg hover:border-gray-200"
                  }`}
                >
                  {/* Best Price Badge */}
                  {isCheapest && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full px-2.5 py-1 shadow-md">
                      <Trophy className="w-3 h-3" />
                      Best Price
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemove(product.productId)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Product Image */}
                  <Link href={`/product/${product.productId}`}>
                    <div className="relative h-52 bg-gray-50 overflow-hidden">
                      <Image
                        src={
                          Array.isArray(product.images)
                            ? product.images[0]
                            : product.images
                        }
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-5 space-y-4">
                    {/* Name */}
                    <Link href={`/product/${product.productId}`}>
                      <h3 className="text-base font-bold text-gray-900 leading-tight hover:text-rose-500 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-gray-100" />

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-xl font-extrabold text-gray-900">
                        ৳{product.price.toFixed(2)}
                      </span>
                      {product.discounts > 0 && (
                        <span className="text-xs font-bold text-rose-500 bg-rose-50 rounded-full px-2 py-0.5">
                          -{product.discounts}%
                        </span>
                      )}
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {product.category.name}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gray-400" />
                      <div className="flex items-center gap-2">
                        <AvarageRating
                          rating={product?.averageRating ?? 0}
                          width={85}
                        />
                        <span className="text-xs text-gray-400">
                          ({product?.averageRating?.toFixed(1) ?? "0.0"})
                        </span>
                      </div>
                    </div>

                    {/* Description snippet */}
                    {product.description && (
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}

                    {/* View button */}
                    <Link
                      href={`/product/${product.productId}`}
                      className="block w-full text-center py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-rose-500 transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Comparison Table ─── */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Quick Comparison
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3.5 px-5 text-xs font-bold uppercase tracking-widest text-gray-400 w-36">
                      Attribute
                    </th>
                    {selectedProducts.map((p) => (
                      <th
                        key={p.productId}
                        className="py-3.5 px-5 text-sm font-bold text-gray-700"
                      >
                        {p.name.length > 25
                          ? `${p.name.slice(0, 25)}…`
                          : p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-3.5 px-5 text-sm font-medium text-gray-500">
                      Price
                    </td>
                    {selectedProducts.map((p) => (
                      <td
                        key={p.productId}
                        className={`py-3.5 px-5 text-sm font-bold ${
                          cheapestProduct?.productId === p.productId &&
                          selectedProducts.length > 1
                            ? "text-emerald-600"
                            : "text-gray-900"
                        }`}
                      >
                        ৳{p.price.toFixed(2)}
                        {cheapestProduct?.productId === p.productId &&
                          selectedProducts.length > 1 && (
                            <span className="ml-2 text-[10px] bg-emerald-50 text-emerald-600 rounded-full px-2 py-0.5 font-bold">
                              Lowest
                            </span>
                          )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 text-sm font-medium text-gray-500">
                      Category
                    </td>
                    {selectedProducts.map((p) => (
                      <td
                        key={p.productId}
                        className="py-3.5 px-5 text-sm text-gray-700"
                      >
                        {p.category.name}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 text-sm font-medium text-gray-500">
                      Rating
                    </td>
                    {selectedProducts.map((p) => (
                      <td
                        key={p.productId}
                        className="py-3.5 px-5 text-sm text-gray-700"
                      >
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-semibold">
                            {p.averageRating?.toFixed(1) ?? "0.0"}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 text-sm font-medium text-gray-500">
                      Stock
                    </td>
                    {selectedProducts.map((p) => (
                      <td
                        key={p.productId}
                        className="py-3.5 px-5 text-sm text-gray-700"
                      >
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                            p.stock > 0
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {p.stock > 0
                            ? `${p.stock} available`
                            : "Out of Stock"}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 text-sm font-medium text-gray-500">
                      Discount
                    </td>
                    {selectedProducts.map((p) => (
                      <td
                        key={p.productId}
                        className="py-3.5 px-5 text-sm text-gray-700"
                      >
                        {p.discounts > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-500">
                            -{p.discounts}% OFF
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No discount
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
