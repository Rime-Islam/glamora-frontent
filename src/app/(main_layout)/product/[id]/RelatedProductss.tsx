import { IProduct } from "@/interface/product.interface";
import Image from "next/image";
import Link from "next/link";

const RelatedProducts = ({ product }: { product: IProduct[] }) => {
  return (
    <div>
      {product?.map((data) => {
        // Safely resolve the image source
        const imageSrc =
          Array.isArray(data?.images) && data?.images.length > 0
            ? data.images[0] // Use the first image if it's an array
            : typeof data?.images === "string"
            ? data.images
            : ""; // Fallback to an empty string if undefined

        return (
          <div
            key={data?.productId}
            className="relative w-48 h-56 isolate flex flex-col justify-end overflow-hidden rounded-xl pb-3 mt-5"
          >
            <Image
              width={200}
              height={100}
              src={imageSrc}
              alt="Product Image"
              className="max-w-full h-36 object-cover rounded-lg border"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
<>
<Link href={`/product/${data?.productId}`} className="z-10 mt-3 px-2 hover:underline font-bold text-white">
              {data?.name.slice(0, 15)}...
            </Link>
</>
            <p className="text-white z-10 px-2">{data?.price}TK</p>
          </div>
        );
      })}
    </div>
  );
};

export default RelatedProducts;
