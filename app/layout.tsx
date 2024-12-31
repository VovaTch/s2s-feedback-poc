import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

const font = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "s2s eval",
  description: "Sentence to sentence evaluation proof-of-concept",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
