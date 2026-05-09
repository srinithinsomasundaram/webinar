import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Micro SaaS Webinar Registration",
  description:
    "Register for the Build & Deploy a Micro SaaS Using AI webinar and complete your seat booking online."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
