import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myeongjo = localFont({ src: "../../public/fonts/NanumMyeongjo-Regular.ttf", variable: "--font-poetry", display: "swap", weight: "400" });
export const metadata: Metadata = {
  title: { default: "첫소절", template: "%s · 첫소절" },
  description: "이름으로 만나는 한 곡의 노래와 당신을 위한 편지.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#121212" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" className={myeongjo.variable}><body>{children}</body></html>;
}
