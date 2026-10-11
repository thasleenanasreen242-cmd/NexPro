import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexPro | Smart Tech. Better Living.",
  description: "Discover smartphones, laptops, audio, wearables and everyday tech at NexPro. Shop smart in Kerala, India.",
  metadataBase: new URL("https://nexpro.vercel.app"),
  openGraph: {
    title: "NexPro — Smart Tech. Better Living.",
    description: "Your next favourite tech, all in one place.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
