import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zuhaira Nasrin Zakaria | Software Developer",
  description: "Book-inspired developer portfolio for Zuhaira Nasrin Zakaria.",
  icons: { icon: "/img/logo.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
