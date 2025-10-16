import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";



export const metadata: Metadata = {
  title: "Rooster Poultry Supply Chain",
  description: "SignUp SignIn authentication and authorization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-br bg-gray-900 from-line-400 to-cyan-700'>
          <Navbar />
          {children}
      </body>
    </html>
  );
}
