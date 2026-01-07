import { Metadata } from "next";
import { Suspense } from "react";
import { fetchCmsData } from "@/lib/mockCms";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import PageViewTracker from "@/components/PageViewTracker";
import { FeatureGridSkeleton, CtaBannerSkeleton } from "@/components/blocks/BlockRenderer/BlockSkeleton";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const cmsData = await fetchCmsData();
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
    const cmsData = await fetchCmsData();
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

