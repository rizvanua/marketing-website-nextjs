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
  let cmsData;
  try {
    cmsData = await fetchCmsData();
  } catch (error) {
    console.error("Failed to fetch CMS data in layout:", error);
    cmsData = await fetchCmsData();
  }

  const siteData = cmsData?.site;
  if(!siteData) {
    return <div className="flex items-center justify-center h-screen">Error: Failed to fetch CMS data</div>;
  }
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <LayoutWrapper siteData={siteData}>{children}</LayoutWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
