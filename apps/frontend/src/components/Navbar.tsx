"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  name: string;
  phone: string;
  role: string;
  businessId?:string;
  exp: number;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<JwtPayload | null>(null);

  // Check JWT token from cookies
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setUser(decoded);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid JWT", error);
        Cookies.remove("token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = "/"; // redirect to login
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MyApp
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          </div>

          {/* Auth Buttons + User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && user && (
              <>
                {/* User Profile */}
                <div title={`Name: ${user.name}\nPhone: ${user.phone}\nRole: ${user.role} ${user.businessId?`\nBusinessId: ${user.businessId}`:""}`} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">
                    {user.name} ({user.role})
                  </span>
                </div>

                {/* Logout */}
                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </>
            )}

            {!isLoggedIn && !user && (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-sm">
              <Link href="/auth/login" passHref className="w-full">
                <button className="w-30 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
                  Login
                </button>
              </Link>
              <Link href="/auth/register" passHref className="w-full">
                <button className="w-30 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
                  Sign Up
                </button>
              </Link>
            </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t shadow">
          <Link
            href="/"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/dashboard"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>

          {/* User + Logout */}
          {isLoggedIn && user && (
            <div className="mt-4 space-y-2 border-2 ">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md">
                <User className="w-5 h-5 border-2 text-gray-600" />
                <span className="text-gray-800 font-medium">
                  {user.name} ({user.role})
                </span>
              </div>
              <Button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                variant="destructive"
                className="w-full mt-2"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
