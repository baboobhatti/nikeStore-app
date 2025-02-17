'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@sanity/client';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique keys
import { CartItem } from '../addCart/page';

// Configure the Sanity client with an API version
const client = createClient({
  projectId: 'j17x3uab', // replace with your project ID
  dataset: 'production', // e.g., "production"
  apiVersion: '2023-05-03', // specify an API version date
  useCdn: false,
  token: 'skXRPZNJvZhcqFF4LrcQP51pC59F22dfrNwhE7hahmG75j0PfO8bhaofzUYGrRmHe1jjkVlTP4vFiPZjij9rujuQoRidn4OKYkQAr2W5tOOuxihuzcG3TpEm2EtynTLJ6Xaursl2FXQb21mZFutSJvdCnEpHVREmHTXAvWqeQkDngRNek7xV', // only needed if you require write permissions
});

const PlaceOrderPage = () => {
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);

  // Form state for customer details
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');

  // Load the cart/order details from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setOrderItems(parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate the total price
    const totalPrice = orderItems.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      return acc + price * item.quantity;
    }, 0);

    // Build the order object to send to Sanity
    const orderData = {
      _type: 'order', // Ensure your Sanity schema has an "order" type
      customerName: name,
      customerLastName: lastName,
      email,
      address,
      city,
      zip,
      phone,
      orderItems: orderItems.map(item => ({
        _key: uuidv4(), // Unique key for each item
        product: {
          _type: 'reference',
          _ref: item._id, // Reference to the product document
        },
        quantity: item.quantity, // Include quantity from the cart item
      })),
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await client.create(orderData);
      console.log('Order created successfully:', result);
      // Optionally clear the cart after the order is placed
      localStorage.removeItem("cart");
      // Navigate to an order confirmation page or another page
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Place Your Order</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Form fields for customer details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">First Name</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="mt-1 block w-full border px-2 py-1"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required 
                className="mt-1 block w-full border px-2 py-1"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="mt-1 block w-full border px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium">Address</label>
            <input 
              type="text" 
              id="address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required 
              className="mt-1 block w-full border px-2 py-1"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium">City</label>
              <input 
                type="text" 
                id="city" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required 
                className="mt-1 block w-full border px-2 py-1"
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium">Zip Code</label>
              <input 
                type="text" 
                id="zip" 
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required 
                className="mt-1 block w-full border px-2 py-1"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
              className="mt-1 block w-full border px-2 py-1"
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
