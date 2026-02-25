import type { Metadata } from "next";
import { Inria_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import CartSidebar from "../components/CartSidebar";

const inriaSerif = Inria_Serif({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-inria-serif',
});

export const metadata: Metadata = {
  title: "Silk Stitch - Premium Fashion",
  description: "Your premium destination for elegant fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inriaSerif.variable} font-inria antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <CartSidebar />
        </Providers>
      </body>
    </html>
  );
}
