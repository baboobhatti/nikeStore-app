'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
// import Datatypes from "@/components/Datatypes";
// Optionally, import the same CartItem type from your CartPage file
 import { CartItem } from "../addCart/page";

const CheckoutPage = () => {
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  // Load cart from local storage to display in checkout
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCheckoutItems(parsedCart.filter(item => item !== null && item !== undefined));
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCheckoutItems([]);
      }
    }
  }, []);

  // Calculate overall total
  const totalPrice = checkoutItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {checkoutItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <>
          <ul className="border mb-4">
            {checkoutItems.map((item, index) => (
              <li key={index} className="border p-2 my-2 flex items-center justify-between bg-blue-100">
                <div className="flex items-center gap-4">
                  <Image
                    className="w-[80px] h-[80px] object-cover"
                    src={item.imageUrl ? urlFor(item.imageUrl).url() : "/images/femal.png"}
                    alt="ProductImage"
                    width={80}
                    height={80}
                  />
                  <div>
                    <h2 className="font-semibold">{item.productName}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Subtotal: Rs. {Number(item.price) * item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-xl font-semibold mb-4">Total: Rs. {totalPrice}</div>          
          <Link href="/order">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Place Order
            </button>
          </Link>
          <div className="mt-4">
            <Link href="/cart">
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Back to Cart
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
