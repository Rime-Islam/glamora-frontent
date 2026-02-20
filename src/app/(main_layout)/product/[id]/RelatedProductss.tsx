import { IProduct } from "@/interface/product.interface";
import Image from "next/image";
import Link from "next/link";

const RelatedProducts = ({ product }: { product: IProduct[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {product?.map((data) => {
        const imageSrc =
          Array.isArray(data?.images) && data.images.length > 0
            ? data.images[0]
            : typeof data?.images === "string"
            ? data.images
            : "";

        return (
          <Link
            key={data?.productId}
            href={`/product/${data?.productId}`}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-40 bg-gray-50 overflow-hidden">
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt={data?.name ?? "Product"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col flex-1">
              <p className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-rose-500 transition-colors">
                {data?.name?.length > 18
                  ? `${data.name.slice(0, 18)}…`
                  : data?.name}
              </p>
              <p className="text-base font-extrabold text-gray-900 mt-1.5">
                ৳{data?.price}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RelatedProducts;
