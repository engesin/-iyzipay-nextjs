import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iyzico Payment Integration",
  description: "Secure payment processing with Iyzico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-white antialiased min-h-screen`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
