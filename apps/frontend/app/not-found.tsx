import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/images/Rooster PSC.png'

export default function NotFound() {
  return (
    <div className="flex flex-col h-[89.3vh] p-6 items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src={logo}
              alt="PoultryLink Logo"
              width={120}
              height={120}
              className="h-40 w-auto rounded-2xl scale-50"
            />
          </Link>
        </div>
        
        {/* 404 Content */}
        <div className="text-center">
          <h1 className="text-7xl font-bold text-gray-100 mb-3">404</h1>
          <h2 className="text-2xl font-extrabold text-gray-100 sm:text-4xl">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-100 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Go back home
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link
              href="/contact"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Contact our support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
