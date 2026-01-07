import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { fetchCmsData } from "@/lib/mockCms";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: {
    default: "Guesty | Property Management Platform",
    template: "%s | Guesty",
  },
  description: "Guesty helps property managers automate operations and grow their business.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cmsData = await fetchCmsData();

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <LayoutWrapper siteData={cmsData.site}>{children}</LayoutWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
