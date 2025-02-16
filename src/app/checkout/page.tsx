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
    <div className="min-h-screen bg-gray-100 p-4">
  <div className="container mx-auto max-w-4xl">
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      {checkoutItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {checkoutItems.map((item, index) => (
              <li
                key={index}
                className="py-4 flex flex-col sm:flex-row items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Image
                    className="w-20 h-20 object-cover rounded"
                    src={
                      item.imageUrl
                        ? urlFor(item.imageUrl).url()
                        : "/images/femal.png"
                    }
                    alt="Product Image"
                    width={80}
                    height={80}
                  />
                  <div>
                    <h2 className="font-semibold text-lg">
                      Name: {item.productName}
                    </h2>
                    <p>Color: {item.colors}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">
                      Subtotal: Rs. {Number(item.price) * item.quantity}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6">
            <div className="text-xl font-semibold">
              Total: Rs. {totalPrice}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <Link href="/order">
                <button className="w-full sm:w-auto bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
                  Place Order
                </button>
              </Link>
              <Link href="/cart">
                <button className="w-full sm:w-auto bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition">
                  Back to Cart
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
</div>

  );
};

export default CheckoutPage;
