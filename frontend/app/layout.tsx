import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Hackathonify',
  description: 'Your hub for hackathon applications',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="w-full h-full min-h-full min-w-full bg-white box-border"
    >
      <body className={inter.className + 'w-full h-full min-h-full min-w-full'}>
        <>
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: '#A21CAF',
                color: '#fff',
              },
            }}
          />
        </>
      </body>
    </html>
  );
}
