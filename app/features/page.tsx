import { Metadata } from "next";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { fetchCmsData } from "@/lib/mockCms";
import { CMS_TAGS } from "@/lib/mockCms";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import PageViewTracker from "@/components/PageViewTracker";
import { FeatureGridSkeleton, CtaBannerSkeleton } from "@/components/blocks/BlockRenderer/BlockSkeleton";

// Tag-based revalidation instead of time-based
// Revalidate on-demand using: revalidateTag('cms-features') or revalidateTag('cms-data')
const getCachedCmsData = unstable_cache(
  async () => fetchCmsData(),
  ['cms-data'],
  {
    tags: [CMS_TAGS.ALL, CMS_TAGS.FEATURES],
    revalidate: false, // No time-based revalidation, only tag-based
  }
);

export async function generateMetadata(): Promise<Metadata> {
  try {
    const cmsData = await getCachedCmsData();
    const page = cmsData?.pages?.features;

    if (!page) {
      throw new Error("Features page data not found");
    }

    return {
      title: page.seo?.title || "Guesty Features | Built for Property Managers",
      description: page.seo?.description || "Explore Guesty's automation, insights, and integrations.",
      ...(page.seo?.canonical && {
        alternates: {
          canonical: page.seo.canonical,
        },
      }),
    };
  } catch (error) {
    console.error("Error generating metadata for features page:", error);
    return {
      title: "Guesty Features | Built for Property Managers",
      description: "Explore Guesty's automation, insights, and integrations.",
    };
  }
}

export default async function FeaturesPage() {
  try {
    const cmsData = await getCachedCmsData();
    const page = cmsData?.pages?.features;

    if (!page || !page.blocks || page.blocks.length === 0) {
      throw new Error("Features page data or blocks not found");
    }

    return (
      <>
        <Suspense fallback={null}>
          <PageViewTracker path="/features" />
        </Suspense>
        <Suspense
          fallback={
            <>
              <FeatureGridSkeleton />
              <CtaBannerSkeleton />
            </>
          }
        >
          <BlockRenderer blocks={page.blocks} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error("Error rendering features page:", error);
    throw error;
  }
}

