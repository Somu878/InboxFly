import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
import Appbar from "@/components/Appbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InboxFly- AI Email Classifier",
  description:
    "Fly through your inbox effortlessly with this AI-powered email management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <Providers>
          <nav>
            <Appbar />
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
