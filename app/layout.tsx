import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
});

const notoSerifSC = Noto_Serif_SC({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: "中国少年茶人 - 学校端官方入口",
  description: "传承中华茶文化，培养新时代少年茶人。为学校提供专业的茶文化教育课程体系、教学资源与管理平台。",
  keywords: "茶文化教育,少年茶人,学校茶艺课程,传统文化教育,公益教育",
  openGraph: {
    title: "中国少年茶人 - 学校端官方入口",
    description: "传承中华茶文化，培养新时代少年茶人",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSerifSC.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
