
import ShoesData from "@/components/ShoesData";
import Image from "next/image";
import Link from "next/link";
// import allProducts from "./allproducts/querydata";

export default function Home() {
  return (
    <>
      {/* Section-1 */}
      <div className='flex flex-col bg-gray-100 justify-center text-xs mt-3 py-2 sm:text-lg'>
        <div className='text-center'><p>Hello Nike App</p></div>
        <div className='text-center'><p>Download the app to access everything Nike. <a className='underline' href="#">Get App</a> </p></div>
      </div>

      <div className="w-auto mx-auto flex flex-col items-center mb-8 ">
        <div className="w-[94%] inline-block">
          <Image className="w-full" src='/images/homepage.png' alt='photo' width={1200} height={1200} />
        </div>

        <div className="flex  flex-col justify-center items-center mt-10">
          <p className="text-center font-semibold mb-2 text-lg">First Look</p>
          <p className=" text-center text-3xl sm:text-5xl font-semibold mb-3 sm:tracking-wider sm:mb-6">NIKE AIR MAX PULSE</p>
          <p className="text-center w-3/5 text-xs sm:font-semibold sm:text-sm mb-6">Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse designed to push you past your limits and help you go to the max.</p>

          <div className="text-center flex gap-2">
            <button type="button" className="bg-black text-white px-5 py-2 text-sm rounded-3xl">Notify Me</button>
            <button type="button" className="bg-black text-white px-5 py-2 text-sm rounded-3xl">Shop Air Max</button>
          </div>
        </div>
      </div>

      {/*Cards Section*/}
      <Link href="./allProducts">Click</Link>
       <ShoesData />

     {/* Section -2 */}

      {/* Image div */}
      <div className="mx-auto flex flex-col items-center mb-8 mt-10 ">
        {/* image */}
        <div className="w-[94%]">
          <p className="mb-2 font-semibold text-lg">Featured</p>
          <Image className="w-full" src='/images/running.jpg' alt='photo' width={1200} height={1200} />
        </div>

        {/*text 02 */}
        <div className="flex flex-col justify-center items-center mt-10">
          <p className=" text-center text-2xl sm:text-4xl font-semibold mb-3 md:text-5xl md:tracking-wide sm:mb-4">STEP INTO WHAT FEELS GOOD</p>
          <p className="text-center w-3/5 text-xs sm:font-semibold sm:text-xs mb-4">Cause everyone should know the feeling of running in that perfect pair.</p>

          <div className="text-center flex">
            <button type="button" className="bg-black text-white px-5 py-2 text-sm rounded-3xl">Find Your Shoe</button>
          </div>
        </div>
      </div>

   

      {/*Section-3 Cards 02*/}


      {/* Image div */}
      <div className="w-auto mx-auto flex flex-col items-center mb-8 mt-10 ">
        {/* image */}
        <div className="w-[94%] mb-6">
          <p className="mb-2 font-semibold text-lg">Dont Miss</p>
          <Image className="w-full" src='/images/jordndob.png' alt='photo' width={1200} height={1200} />
        </div>

        {/*text 02 */}
        <div className="flex  flex-col justify-center items-center">
          <p className=" text-center text-2xl sm:text-3xl font-semibold mb-3 md:text-5xl md:tracking-wide sm:mb-4">FLIGHT ESSENTIALS</p>
          <p className="text-center w-3/5 text-xs sm:font-semibold sm:text-xs mb-4">Your built-to-last, all-week wears—but with style only Jordan Brand can deliver.</p>

          <div className="text-center flex">
            <button type="button" className="bg-black text-white px-5 py-2 text-sm rounded-3xl">Shop</button>
          </div>
        </div>
      </div>


      <div className='w-[94%] pb-14 mx-auto mt-10'>
        {/* 01 */}
        <div className='flex justify-between items-center'>
          <div className='mb-4 text-xl font-semibold'><p>The Essentials</p></div>
        </div>

        {/* 02 */}
        <div className='grid grid-cols-3 gap-1'>
          {/* cart-1 */}
          <div className=''>
            <Image className="w-full" src='/images/mens.png' alt='photo' width={500} height={500} />
            <button className="relative bottom-14 left-6 bg-white rounded-full px-3 py-1" type="button">Mens</button>
          </div>

          {/* cart-2 */}
          <div className=''>
            <Image className="w-full" src='/images/womens.png' alt='photo' width={500} height={500} />
            <button className="relative bottom-14 left-6 bg-white rounded-full px-3 py-1" type="button">Womens</button>
          </div>

          {/* cart-3 */}
          <div className=''>
            <Image className="w-full" src='/images/kids.png' alt='photo' width={500} height={500} />
            <button className="relative bottom-14 left-6 bg-white rounded-full px-3 py-1" type="button">kids</button>
          </div>
        </div>
      </div>
    </>
  );
}
