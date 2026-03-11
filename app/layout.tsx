import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "printtie",
    template: "%s | printtie",
  },
  description: "아티스트와 일러스트레이터가 작품을 등록하고 판매할 수 있는 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* AppShell is a client component that contains AppHeader and CartProvider.
            Ensure AppShell is only mounted here to prevent duplicate headers when
            pages/components also try to render headers. */}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
