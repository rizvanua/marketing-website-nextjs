import { Metadata } from "next";
import { Suspense } from "react";
import { fetchCmsData } from "@/lib/mockCms";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import PageViewTracker from "@/components/PageViewTracker";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await fetchCmsData();
  const page = cmsData.pages.features;

  return {
    title: page.seo.title,
    description: page.seo.description,
    ...(page.seo.canonical && {
      alternates: {
        canonical: page.seo.canonical,
      },
    }),
  };
}

export default async function FeaturesPage() {
  const cmsData = await fetchCmsData();
  const page = cmsData.pages.features;

  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker path="/features" />
      </Suspense>
      <BlockRenderer blocks={page.blocks} />
    </>
  );
}

