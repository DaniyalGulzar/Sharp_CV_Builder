// app/layout.tsx
'use client'; // This makes the component a Client Component

import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }: { children: React.ReactNode}) {
  const dataLayer:any=[];
  return (
    <html lang="en">
      {/* <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YY2X84Q1P5"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-YY2X84Q1P5');
        </script>
      </head> */}
      <body className={inter.className}>
          <Toaster position="top-right" />
          <SessionProvider>
          {children}
          </SessionProvider>
      </body>
    </html>
  );
}
