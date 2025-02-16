import { notFound } from "next/navigation";
import Image from "next/image";
import allProducts from "../querydata"; // Adjust the import path if needed
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

// Note: params is now declared as a Promise<{ id: string }>
const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // Await the promise to get the actual params object
  const { id } = await params;
  const fetchedData = await allProducts();

  // Find the product with the matching ID
  const product = fetchedData.find((item) => item._id === id);

  if (!product) return notFound(); // Show 404 if product not found

  return (
    <div className="flex flex-col items-center md:justify-center md:flex-row mt-10 mb-24 gap-8">
      {/* Left */}
      <div>
        <Image
          className="w-[380px] sm:[450]"
          src={
            product.imageUrl
              ? urlFor(product.imageUrl).url()
              : "/images/femal.png"
          }
          alt="ProductImage"
          width={440}
          height={440}
        />
      </div>

      {/* Right */}
      <div>
        <div className="w-72 md:w-64 sm:mt-7 md:mt-6">
          <h1 className="text-2xl font-bold">{product.productName}</h1>
          <p className="text-gray-700 font-semibold mt-3">
            {product.description}
          </p>
          <h2 className="text-xl font-bold mt-3">{`Rs. $${product.price}`}</h2>
          <Link href={`/addCart?productId=${product._id}`}>
            <button
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              type="button"
            >
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
