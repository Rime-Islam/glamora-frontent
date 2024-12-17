"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 max-w-5xl transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.images[0]}
        alt={card.name}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
             <div className="p-4">
                                    <h2 className="text-lg font-semibold">{card.name}</h2>
                                    <p className="text-sm text-gray-500">{card.location}</p>
                                    <div className="flex justify-end">
                                      <p className="text-sm flex items-center font-medium">
                                        <span>
                                          {!!card.followers?.length
                                            ? card.followers?.length
                                            : 0}
                                        </span>
                                        <span>
                                          
                                          <User2 className="w-4 text-white"></User2>
                                        </span>
                                      </p>
                                    </div>
                                    <Link href={`/shop/${card.shopId}`}>
                                      
                                      <Button className="w-full mt-2 ">View Shop</Button>
                                    </Link>
                                  </div>
                                </div>
        </div>
      </div>

  )
);

Card.displayName = "Card";

type Card = {
   shopId: string;
    name: string;
    isBlackListed: boolean;
    location: string;
    images: string[];
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.shopId}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
