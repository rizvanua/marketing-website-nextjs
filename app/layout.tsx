import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { fetchCmsData, CMS_TAGS } from "@/lib/mockCms";
import LayoutWrapper from "@/components/LayoutWrapper";

// Tag-based revalidation for site data
const getCachedCmsData = unstable_cache(
  async () => fetchCmsData(),
  ['cms-data'],
  {
    tags: [CMS_TAGS.ALL, CMS_TAGS.SITE],
    revalidate: false, // No time-based revalidation, only tag-based
  }
);

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
    cmsData = await getCachedCmsData();
  } catch (error) {
    console.error("Failed to fetch CMS data in layout:", error);
    cmsData = await getCachedCmsData();
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
