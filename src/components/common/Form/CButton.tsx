"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { LoadingSpinner } from "../LoadingSpinner";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  isPending?: boolean;
}

const CButton = ({ type, text, isPending = false }: ButtonProps) => {
  return (
    <Button 
      disabled={isPending} 
      type={type}
      className={`relative h-11 px-6 rounded-xl font-bold transition-all duration-300 active:scale-95 ${
        isPending ? "bg-gray-100 text-gray-400" : "bg-gray-900 text-white hover:bg-rose-500 shadow-lg hover:shadow-rose-100"
      }`}
    >
      {isPending ? (
        <LoadingSpinner text="Processing" />
      ) : (
        text
      )}
    </Button>
  );
};

export default CButton;