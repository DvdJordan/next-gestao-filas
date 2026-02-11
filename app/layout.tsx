import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'NEXT. | Gestão de Filas',
    template: '%s | NEXT.' 
  },
  description: "Sistema premium de gestão de filas para Angola.",
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'NEXT. Filas',
    statusBarStyle: 'default',
    capable: true,
  },
  icons: {
    icon: [
      { url: '/favicon.png?v=1', href: '/favicon.png?v=1' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=1', href: '/apple-touch-icon.png?v=1' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-ao">
      <head>
        {/* Link extra para garantir o favicon no PC */}
        <link rel="icon" href="/favicon.png?v=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}