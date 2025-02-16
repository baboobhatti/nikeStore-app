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
    <div className="p-4 h-[100vh]">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="border">
            {cart.map((item, index) =>
              item ? (
                <li key={index} className="border p-2 my-2 flex items-center justify-between bg-blue-300">
                  <div className="flex items-center gap-4">
                    <Image
                      className="w-[100px] h-[100px] object-cover"
                      src={item.imageUrl ? urlFor(item.imageUrl).url() : "/images/femal.png"}
                      alt="ProductImage"
                      width={100}
                      height={100}
                    />
                    <div>
                      <h2 className="font-semibold">{item.productName}</h2>
                      <p>Unit Price: Rs. {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Inventory: {item.inventory}</p>
                      <p>Colors: {item.colors}</p>
                      <p>Total: Rs. {Number(item.price) * item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleDecrement(item._id)}
                      className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleIncrement(item._id)}
                      className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                    <button 
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-4" 
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ) : null
            )}
          </ul>
          <div className="mt-4 flex justify-end">
            <Link href="/checkout">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
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
