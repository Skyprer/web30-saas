import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web30 - Platform UMKM",
  description: "Buat website tokomu dalam hitungan detik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}