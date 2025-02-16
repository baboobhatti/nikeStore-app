// /app/addCart/page.tsx
'use client'
import { useEffect, useState, Suspense } from "react";
import { urlFor } from "@/sanity/lib/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import allProducts from "../allproducts/querydata"; // Adjust path as needed
import Datatypes from "@/components/Datatypes";
import Image from "next/image";

// Create a new type that extends your Datatypes with a quantity field.
export interface CartItem extends Datatypes {
  quantity: number;
}

const CartPageContent = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Load cart from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);       
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart.filter((item) => item !== null && item !== undefined));
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCart([]);
      }
    }
  }, []);

  // Fetch product by productId and add to cart only if it's not already present
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const fetchedData: Datatypes[] = await allProducts();
        const selectedProduct = fetchedData.find((item) => item._id === productId);
        if (selectedProduct) {
          setCart((prevCart) => {
            // Check if the product is already in the cart
            if (prevCart.some(item => item._id === selectedProduct._id)) {
              return prevCart;
            }
            // Add product with initial quantity of 1
            const productToAdd: CartItem = { ...selectedProduct, quantity: 1 };
            const updatedCart = [...prevCart, productToAdd];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
          });
        }
      };
      fetchProduct();
    }
  }, [productId]);

  // Increase the quantity of a product in the cart
  const handleIncrement = (id: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Decrease the quantity of a product in the cart.
  // If quantity becomes 0, remove the item.
  const handleDecrement = (id: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.reduce<CartItem[]>((acc, item) => {
        if (item._id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          // If quantity is 1, we remove the item
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Remove an item completely from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) =>
              item ? (
                <li
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-24 h-24 flex-shrink-0">
                      <Image
                        className="w-full h-full object-cover rounded"
                        src={
                          item.imageUrl
                            ? urlFor(item.imageUrl).url()
                            : "/images/femal.png"
                        }
                        alt="Product Image"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold">
                        {item.productName}
                      </h2>
                      <p className="text-gray-500">Colors: {item.colors}</p>
                      <p className="text-gray-500">
                        Unit Price: Rs. {item.price}
                      </p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-gray-500">
                        Inventory: {item.inventory}
                      </p>
                      <p className="text-gray-700 font-medium">
                        Total: Rs. {Number(item.price) * item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ) : null
            )}
          </ul>
          <div className="mt-6 flex justify-end">
            <Link href="/checkout">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  </div>
  
  );
};

const CartPage = () => {
  return (
    <Suspense fallback={<div>Loading Cart...</div>}>
      <CartPageContent />
    </Suspense>
  );
};

export default CartPage;
