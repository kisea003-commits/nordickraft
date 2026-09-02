import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NordicKraft – Bemanning med presisjon",
  description:
    "NordicKraft matcher kvalifiserte kandidater mot oppdrag hos skoler og virksomheter, med AI-drevet matching.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="no" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
