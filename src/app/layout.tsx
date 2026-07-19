import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "belibuké | Premium Florist & Custom Wedding Car Decor",
  description: "Exquisite flower bouquets and bespoke wedding car floral designs and decorations by belibuké florist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
