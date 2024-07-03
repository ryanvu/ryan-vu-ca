import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import SmoothScroller from "@/components/Lenis";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ryan Vu | CA",
  description: "Ryan Vu | Software Developer | Photographer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <SmoothScroller />
          <Header />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
