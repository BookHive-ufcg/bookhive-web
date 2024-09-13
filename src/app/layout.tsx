import type { Metadata } from "next";
import { Inter, Metamorphous } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

const metamorphous = Metamorphous({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Book Hive",
  description: "Book Hive is a platform for book lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={metamorphous.className}>
      <body>
        <Header />
        {children}
        <Navbar />
      </body>
    </html>
  );
}
