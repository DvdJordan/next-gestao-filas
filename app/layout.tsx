import type { Metadata, Viewport } from "next"; // Importe Viewport
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
    apple: '/apple-touch-icon.png', // Aqui aponta para a tua logo nova
  },
};

// Nova forma correta de definir a cor do navegador
export const viewport: Viewport = {
  themeColor: '#0F172A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-ao">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}