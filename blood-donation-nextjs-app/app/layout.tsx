import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TN Blood Request",
  description:
    "Find blood donors quickly and easily. Connect with potential donors through WhatsApp for urgent blood donation needs.",
  keywords: [
    "blood donation",
    "blood request",
    "emergency blood",
    "donors",
    "WhatsApp blood donors",
  ],
  authors: [{ name: "Technonext" }],
  openGraph: {
    title: "TN Blood Request - Find Blood Donors",
    description:
      "Connect with potential blood donors quickly through WhatsApp for urgent blood donation needs.",
    url: "https://yourdomain.com",
    siteName: "TN Blood Request",
    images: [
      {
        url: "/tn_blood_OG.png",
        width: 1200,
        height: 630,
        alt: "TN Blood Request - Find Blood Donors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TN Blood Request - Find Blood Donors",
    description:
      "Connect with potential blood donors quickly through WhatsApp for urgent blood donation needs.",
    images: ["/og-image.png"], // Replace with your Twitter image path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Optional: Add Google Search Console verification
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
