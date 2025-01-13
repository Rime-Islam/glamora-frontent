"use client";

import React from "react";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interface/product.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearComparison, removeProductFromComparison } from "@/redux/features/compare/compareSlice";
import Link from "next/link";

const ComparisonPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(
    (state: RootState) => state.compareSlice.selectedProducts
  );

  // Function to find the cheapest product
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

  if (selectedProducts.length === 0) {
    return (
      <p className="text-center mt-[30vh]">No products selected for comparison. <Link className="hover:underline font-semibold hover:text-blue-600" href="/product">Select products</Link> to get the best price.</p>
    );
  }

  return (
    <div className=" p-2">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Comparison Table
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table-auto border-collapse w-full text-center">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 p-3 font-semibold">Attribute</th>
              {selectedProducts.map((product) => (
                <th
                  key={product.productId}
                  className="border border-gray-300 p-3 font-semibold"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-gray-700">{product.name}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(product.productId)}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-3 font-medium">Price</td>
              {selectedProducts.map((product) => (
                <td
                  key={product.productId}
                  className="border border-gray-300 p-3 text-gray-600"
                >
                  {product.price} Tk
                </td>
              ))}
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-300 p-3 font-medium">Category</td>
              {selectedProducts.map((product) => (
                <td
                  key={product.productId}
                  className="border border-gray-300 p-3 text-gray-600"
                >
                  {product.category.name}
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-3 font-medium">Average Rating</td>
              {selectedProducts.map((product) => (
                <td
                  key={product.productId}
                  className="border border-gray-300 p-3 text-gray-600"
                >
                  {product.averageRating || 0}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      {cheapestProduct && (
        <div className="mt-5 p-4 bg-green-100 rounded-lg text-center">
          <p className="text-lg font-semibold text-green-800">
            The cheapest product is{" "}
            <span className="font-bold">{cheapestProduct.name}</span> priced at{" "}
            <span className="font-bold">{cheapestProduct.price} Tk</span>.
          </p>
        </div>
      )}
      <div className="flex justify-center mt-5">
        <Button className="text-white bg-blue-500" onClick={handleClear} variant="secondary">
          Clear Comparison
        </Button>
      </div>
    </div>
  );
};

export default ComparisonPage;
