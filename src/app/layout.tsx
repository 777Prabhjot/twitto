import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitto",
  description: "Twitto is home page",
  keywords:
    "twitter, twitto, twittoo, twitto vercel, twittoo vercel, twitter clone, nextjs, tailwindcss, prabh, prabhjot, project, website, mernstack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
