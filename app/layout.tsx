import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InboxFly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`inter.className overflow-hidden`}>
        <Providers>
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mt-4">
            InboxFly
          </h1>
          {children}
        </Providers>
      </body>
    </html>
  );
}
