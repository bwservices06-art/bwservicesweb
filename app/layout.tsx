import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: {
    default: "BW Services | Premium Digital Agency",
    template: "%s | BW Services"
  },
  description: "BW Services is a premium creative agency specializing in 3D web experiences, robust applications, and strategic digital growth.",
  keywords: ["Web Development", "3D Design", "Digital Agency", "Next.js", "React", "Creative Studio"],
  authors: [{ name: "BW Services" }],
  creator: "BW Services",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bwservices.dev",
    title: "BW Services | Premium Digital Agency",
    description: "Transforming ideas into digital reality with cutting-edge 3D web experiences.",
    siteName: "BW Services",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "BW Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BW Services | Premium Digital Agency",
    description: "Transforming ideas into digital reality with cutting-edge 3D web experiences.",
    images: ["/logo.png"],
  },
  verification: {
    google: "Ry_35Ef0GVRW75Wlg3s1guDpXi9itM9fX9evpWlT24c",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${plusJakarta.variable} font-sans bg-background text-foreground antialiased`}
      >
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
