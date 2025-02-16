
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-gray-100">
      <div className="flex justify-between items-center h-12 px-4 md:px-10">
        {/* Logo */}
        <div className="ml-2">
          <Image src="/images/jordan.png" alt="logo" width={40} height={40} />
        </div>

      
        <div
          className='w-auto'>
          <ul className="flex items-center gap-3 sm:gap-8">
            <li className=''>
              <Link href="../allproducts">
                Find Store
              </Link>
            </li>
            <li className='hidden sm:block'>
              <Link href="/">
                Help
              </Link>
            </li>
            <li className='hidden sm:block'>
              <Link href="../joinus">
                Join Us
              </Link>
            </li>
            <li className='mr-5 sm:mr-0'>
              <Link href="../login">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
