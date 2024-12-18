"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useMakeOrder } from "@/hooks/order.hook";
import { useGetShopCupon } from "@/hooks/cupon.hook";
import { decreaseItem, increaseItem, setAdditionalDiscount, setCuponId } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";


const CartPage = () => {
    const dispatch = useAppDispatch();
    const { mutate, isPending, error } = useMakeOrder();
  
    const {
      cuponId,
      cartItems,
      itemLevelDiscount,
      subTotal,
      totalDiscount,
      additionalDiscount,
      totalPriceBeforeDiscount,
    } = useAppSelector((state) => state.cartSlice);
    
    const { data } = useGetShopCupon(cartItems[0]?.shopId || "");
   
    const handleIncrement = (id: string, quantity: number, stock: number) => {
        if (quantity < stock) {
          dispatch(increaseItem({ id }));
        } else {
            toast.error("Cannot add more than available stock!");
        }
      };
    const handleDecrement = (id: string, ) => {
      dispatch(decreaseItem({ id }));
    };
  
    const handleCheckout = () => {
      // Map cart items to IOrderItem format
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        discount: itemLevelDiscount || 0, // Use item-level discount if available
        shopId: item.shopId,
      }));
  
      // Create the order request object
      const orderRequest = {
        items: orderItems,
        total: totalPriceBeforeDiscount,
        discounts: totalDiscount,
        subTotal: subTotal,
        ...(!!cuponId && { couponId: cuponId }),
      };
      mutate(orderRequest, {
        onSuccess: (res) => {
          console.log(res, "cart");
          toast.success("Redirecting to payment page...");
          const payLink = res?.data?.payLink;
          // If payLink exists, redirect the user to the payment page
          if (payLink) {
            window.location.href = payLink;
          } else {
            toast.error("Failed to retrieve payment link.");
          }
        },
        onError: (error) => {
          console.log(error);
          toast.error("Failed to make order.");
        },
      });
  
      // Send the orderRequest to your API or handle it as needed
    };
  
    const applyCupon = (discount: number, cuponId: string) => {
      dispatch(setAdditionalDiscount(discount));
      dispatch(setCuponId(cuponId));
    };
  
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="col-span-2 bg-white p-4 rounded shadow">
            {cartItems?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.photo}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    {item.size && <p className="text-sm">Size: {item.size}</p>}
                    <p className="text-sm">Price: ${item.price}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleDecrement(item.id)
                        }
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleIncrement(item.id, item.quantity, item.stock)
                        }
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col  md:items-end">
                  <p className="text-lg font-bold">
                    Total: ${item.price * item.quantity}
                  </p>
                  <p className=" font-bold">Discount: -${itemLevelDiscount}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Cart Summary */}
          <div className="bg-white p-4 rounded shadow">
            <div>
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Total:</span>
                <span>${totalPriceBeforeDiscount}</span>
              </div>
  
              <div className="flex justify-between mb-2">
                <span>Additional Discount:</span>
                <span>-${additionalDiscount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Total Discount:</span>
                <span>-${totalDiscount}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${subTotal}</span>
              </div>
              <Button
            
                disabled={isPending}
                onClick={handleCheckout}
                className="mt-2 w-full bg-amber-600 hover:bg-amber-500"
              >
                Checkout
              </Button>
              <div className="mt-4 grid justify-items-center">
                <div className="mb-1 font-medium">Available Cupon</div>
                {data?.data.map((code) => (
                  <p  key={code.id}>
                    {cartItems.length > 0 && (
                      <Button
                     
                        disabled={code.id === cuponId}
                        onClick={() => applyCupon(code.discount, code.id)}
                      >
                        
                        Code: &quot;{code.code}&quot; Discount: {code.discount}%{" "}
                      </Button>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default CartPage;