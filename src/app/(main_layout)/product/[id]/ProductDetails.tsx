"use client";
import CartConflict from "@/components/common/cartConfilct/CartConflict";
import AvarageRating from "@/components/Rating/AvarageRating";
import { IProduct } from "@/interface/product.interface";
import { AuthContext } from "@/providers/AuthProvider";
import { addItemToCart, ICartItem } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import RelatedProducts from "./RelatedProductss";
import Link from "next/link";
import Image from "next/image";
import { useSingleProduct } from "@/hooks/product.hook";
import { IReview } from "@/interface/review.interface";
import { useContext, useEffect, useState } from "react";
import { FcFlashOn } from "react-icons/fc";
import { ShoppingCart, Store, Package, CheckCircle, XCircle, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { toast } from "sonner";

const ProductDetails = ({ id }: { id: string }) => {
  const userData = useContext(AuthContext);
  const { data: { data: product } = {}, isLoading } = useSingleProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const dispatch = useAppDispatch();

  const handleAddToCart = (data: ICartItem) => {
    dispatch(addItemToCart(data));
    toast.success("Added to cart! 🛍️");
  };

  const saveToRecentProducts = (product: IProduct) => {
    const recentProducts = JSON.parse(localStorage.getItem("recentProducts") || "[]");
    const filteredProducts = recentProducts.filter((p: IProduct) => p.productId !== product.productId);
    const updatedProducts = [product, ...filteredProducts].slice(0, 10);
    localStorage.setItem("recentProducts", JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    if (product) saveToRecentProducts(product);
  }, [product]);

  /* ── computed price ── */
  const flashDiscount = product?.flashSale?.[0]?.discount ?? 0;
  const regularDiscount = product?.discounts ?? 0;
  const finalPrice = flashDiscount > 0
    ? product!.price - (product!.price * flashDiscount) / 100
    : product?.price ?? 0;
  const totalDiscount = flashDiscount + regularDiscount;
  const inStock = (product?.stock ?? 0) > 0;
  const remainingStock = (product?.stock ?? 0) - quantity;

  /* ── Skeleton ── */
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2 h-[480px] bg-gray-200 rounded-3xl" />
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 rounded-full w-3/4" />
            <div className="h-4 bg-gray-200 rounded-full w-1/4" />
            <div className="h-4 bg-gray-200 rounded-full w-full" />
            <div className="h-4 bg-gray-200 rounded-full w-5/6" />
            <div className="h-12 bg-gray-200 rounded-2xl w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 xl:px-0 py-10">

        {/* ─── Top Section: Gallery + Info ─── */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">

          {/* Image Gallery */}
          <div className="w-full lg:w-[52%] flex flex-col gap-4">
            {/* Main image */}
            <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 aspect-square max-h-[520px]">
              {product?.images?.[activeImage] && (
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500"
                />
              )}
              {/* Discount badge */}
              {totalDiscount > 0 && (
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-rose-500 text-white text-xs font-bold rounded-full px-3 py-1.5 shadow-lg">
                  <FcFlashOn className="w-3.5 h-3.5" />
                  -{totalDiscount}% OFF
                </div>
              )}
              {/* Prev/Next arrows */}
              {(product?.images?.length ?? 0) > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i > 0 ? i - 1 : (product?.images.length ?? 1) - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i < (product?.images.length ?? 1) - 1 ? i + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {(product?.images?.length ?? 0) > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product!.images.map((img:string, i:number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i
                        ? "border-rose-500 shadow-md scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[48%] flex flex-col">
            {/* Breadcrumb category */}
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
              {product?.category?.name ?? "Product"}
            </p>

            {/* Name */}
            <h1 className="text-3xl xl:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {product?.name}
            </h1>

            {/* Shop link */}
            <Link
              href={`/shop/${product?.shopId}`}
              className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-500 transition-colors w-fit"
            >
              <Store className="w-4 h-4" />
              {product?.shop?.name}
            </Link>

            {/* Rating row */}
            <div className="flex items-center gap-3 mt-3">
              <AvarageRating rating={product?.averageRating ?? 0} width={85} />
              <span className="text-sm text-gray-400">
                ({product?.totalReview ?? 0} reviews)
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 my-5" />

            {/* Price */}
            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-4xl font-extrabold text-gray-900">
                ৳{finalPrice.toFixed(2)}
              </span>
              {flashDiscount > 0 && (
                <span className="text-lg text-gray-400 line-through mb-1">
                  ৳{product!.price.toFixed(2)}
                </span>
              )}
              {flashDiscount > 0 && (
                <span className="mb-1 flex items-center gap-1 text-sm font-bold text-rose-500 bg-rose-50 rounded-full px-3 py-1">
                  <FcFlashOn />
                  Flash Sale -{flashDiscount}%
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mt-4">
              {inStock ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600">
                    In Stock — {remainingStock} units left
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-red-500">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity + Cart */}
            {inStock && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700">Quantity</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((v) => Math.min(product!.stock, v + 1))}
                      disabled={quantity >= (product?.stock ?? 0)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {product && userData?.user?.role === "CUSTOMER" && (
                  <button
                    onClick={() =>
                      handleAddToCart({
                        category: product.category.name,
                        id: product.productId,
                        photo: product.images[0],
                        price: product.price,
                        stock: product.stock,
                        quantity,
                        title: product.name,
                        discount: flashDiscount
                          ? flashDiscount + regularDiscount
                          : regularDiscount,
                        shopId: product.shopId,
                      })
                    }
                    className="group w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gray-900 text-white font-bold text-base hover:bg-rose-500 transition-all duration-300 shadow-lg hover:shadow-rose-200"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Add to Cart — ৳{(finalPrice * quantity).toFixed(2)}
                  </button>
                )}

                {!userData?.user && (
                  <Link href="/auth/signin">
                    <button className="w-full py-4 rounded-2xl border-2 border-gray-900 text-gray-900 font-bold text-base hover:bg-gray-900 hover:text-white transition-all duration-300">
                      Sign in to Purchase
                    </button>
                  </Link>
                )}
              </div>
            )}

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              {[
                { icon: "🚀", label: "Fast Delivery" },
                { icon: "↩️", label: "Easy Returns" },
                { icon: "🔒", label: "Secure Payment" },
                { icon: "✨", label: "100% Authentic" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-xs text-gray-600 font-medium"
                >
                  <span>{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Tab Section: Description / Reviews ─── */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-gray-100 mb-8">
            {(["description", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-rose-500 text-rose-500"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab === "reviews"
                  ? `Reviews (${product?.totalReview ?? 0})`
                  : "Description"}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="max-w-3xl">
              <p className="text-gray-600 leading-relaxed text-base">
                {product?.description ?? "No description available."}
              </p>
              {/* Product meta */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Category", value: product?.category?.name },
                  { label: "Stock", value: `${product?.stock} units` },
                  { label: "Shop", value: product?.shop?.name },
                ].map((m) => m.value ? (
                  <div key={m.label} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{m.value}</p>
                  </div>
                ) : null)}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl space-y-4">
              {product?.Review?.length ? (
                product.Review.map((review: IReview, idx: number) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-sm flex-shrink-0">
                          {review.customer?.name?.[0]?.toUpperCase() ?? "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {review.customer?.name ?? "Anonymous"}
                          </p>
                          <AvarageRating rating={review.rating} width={70} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="text-sm font-bold text-gray-700">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                      {review.comment}
                    </p>
                    {review.vendorReply && (
                      <div className="mt-3 ml-4 pl-4 border-l-2 border-rose-200 text-sm">
                        <p className="text-xs font-bold text-rose-500 mb-1">Seller Reply</p>
                        <p className="text-gray-500">{review.vendorReply}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <span className="text-5xl mb-3 block">💬</span>
                  <p className="text-gray-500 font-medium">No reviews yet</p>
                  <p className="text-gray-400 text-sm">Be the first to review this product!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── Related Products ─── */}
        {!!product?.relatedProduct?.length && (
          <div className="mt-16">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
                You May Also Like
              </p>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Related Products
              </h2>
            </div>
            <RelatedProducts product={product.relatedProduct} />
          </div>
        )}

        <CartConflict />
      </div>
    </div>
  );
};

export default ProductDetails;
