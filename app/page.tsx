import { Metadata } from "next";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { fetchCmsData } from "@/lib/mockCms";
import { CMS_TAGS } from "@/lib/mockCms";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import PageViewTracker from "@/components/PageViewTracker";
import { BlockRendererSkeleton } from "@/components/blocks/BlockRenderer/BlockSkeleton";

// Tag-based revalidation instead of time-based
// Revalidate on-demand using: revalidateTag('cms-home') or revalidateTag('cms-data')
const getCachedCmsData = unstable_cache(
  async () => fetchCmsData(),
  ['cms-data'],
  {
    tags: [CMS_TAGS.ALL, CMS_TAGS.HOME],
    revalidate: false, // No time-based revalidation, only tag-based
  }
);

export async function generateMetadata(): Promise<Metadata> {
  try {
    const cmsData = await getCachedCmsData();
    const page = cmsData?.pages?.home;

    if (!page) {
      throw new Error("Home page data not found");
    }

    return {
      title: page.seo?.title || "Guesty | Property Management Platform",
      description:
        page.seo?.description ||
        "Guesty helps property managers automate operations and grow their business.",
      ...(page.seo?.canonical && {
        alternates: {
          canonical: page.seo.canonical,
        },
      }),
    };
  } catch (error) {
    console.error("Error generating metadata for homepage:", error);
    return {
      title: "Guesty | Property Management Platform",
      description:
        "Guesty helps property managers automate operations and grow their business.",
    };
  }
}

export default async function HomePage() {
  const cmsData = await getCachedCmsData();
  const page = cmsData?.pages?.home;

  if (!page || !page.blocks || page.blocks.length === 0) {
    return <div>Error: Home page data or blocks not found</div>;
  }

  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker path="/" />
      </Suspense>
      <Suspense fallback={<BlockRendererSkeleton />}>
        <BlockRenderer blocks={page.blocks} />
      </Suspense>
    </>
  );
}
