import type { Metadata } from "next";
import { Syne, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beto — Senior Software Engineer",
  description:
    "Alberto Cambronero — senior software engineer building backend systems that hold up under load. Python, Flask and AWS.",
  openGraph: {
    title: "Beto — Senior Software Engineer",
    description:
      "Backend systems, APIs and automation. Eight years of Python, Flask and AWS.",
    url: "https://beto-s-landing-page.netlify.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${archivo.variable} ${mono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
