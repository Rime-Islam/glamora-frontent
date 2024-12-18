import CloneProduct from "@/app/(dashboard)/vendor/shop/CloneProduct";
import DeleteProduct from "@/app/(dashboard)/vendor/shop/DeleteProduct";
import EditProduct from "@/app/(dashboard)/vendor/shop/EditProduct";
import { IProduct } from "@/interface/product.interface";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    productId: string;
    images: string;
    name: string;
    description: string;
    price: number;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.productId}
          className="relative block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-300 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <Link
        href={`/product/${item?.productId}`}>
              <Image
                          width={200}
                          height={50}
                          src={item?.images[0] || "#"}
                          alt={item?.name}
                          className="w-full h-56 px-4 object-cover rounded-md"
                        /></Link>
            <CardTitle>{item.name.slice(0, 25)} ...</CardTitle>
            <CardDescription>{item.description.slice(0, 50)} ... ...</CardDescription>
            <div className="mt-3 font-semibold">Price: {item?.price} TK</div>
            <div className="flex justify-between ">
                
                <EditProduct product={item }/>
               <DeleteProduct id={item?.productId}/>
               <CloneProduct data={item}/>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-gray-600 border border-transparent dark:border-white/[0.2] group-hover:border-slate-200 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-white font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-300 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
