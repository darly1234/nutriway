import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const syne   = Syne({ subsets: ["latin"], variable: "--font-syne",   weight: ["400","600","700","800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans",  weight: ["300","400","500"] });
const dmMono = DM_Mono({ subsets: ["latin"], variable: "--font-mono",  weight: ["400","500"] });

export const metadata: Metadata = {
  title: "NutriWay — Seu caminho para uma vida mais saudável",
  description: "Planejamento alimentar, hidratação, composição corporal e controle de carboidratos em um único app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        <div className="flex min-h-screen justify-center">
          <main className="flex-1 p-8 max-w-5xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
