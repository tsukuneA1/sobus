import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku-gothic-new",
});

export const metadata: Metadata = {
  title: "ソービズ | 早稲田大学ソーシャルビジネスサークル",
  description: "社会課題とビジネスの架け橋になる。早稲田大学のソーシャルビジネスサークル「ソービズ」の活動紹介サイトです。",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="ja">
      <body className={`${zenKakuGothicNew.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header className="border-b border-border" />
          <main className="flex-1 bg-secondary">{children}</main>
          <Footer className="border-t border-border bg-muted/30" />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
