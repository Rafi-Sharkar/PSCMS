import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/Rooster PSC.png'

export default function WelcomePage() {
  return (
    <div className='min-h-[89.3vh] flex flex-col items-center justify-center'>
    <div className="max-w-2xl rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
      {/* Logo/Brand Section */}
      <div className="mb-8 text-center">
        {/* You can replace this with your actual logo */}
        <Image
          src= {logo} // Make sure you have a logo.png in your public folder
          alt="Poultry Supply Logo"
          width={150}
          height={150}
          className="mx-auto scale-100 mb-4 rounded-3xl shadow-2xl"
        />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
          Welcome to <span className="text-green-600">PoultryLink</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your seamless connection for fresh poultry supply, from farm to table.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-sm">
        <Link href="/auth/login" passHref className="w-full">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
            Login
          </button>
        </Link>
        <Link href="/auth/register" passHref className="w-full">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Optional: Footer/Tagline */}
      <div className="mt-12 text-gray-500 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} PoultryLink. All rights reserved.</p>
        <p className="mt-1">Connecting Farmers, Employees, Customers, and Owners.</p>
      </div>
    </div>
  </div>
  );
}
