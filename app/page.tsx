import { Metadata } from "next";
import { Suspense } from "react";
import { fetchCmsData } from "@/lib/mockCms";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import PageViewTracker from "@/components/PageViewTracker";
import { BlockRendererSkeleton } from "@/components/blocks/BlockRenderer/BlockSkeleton";

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await fetchCmsData();
  const page = cmsData.pages.home;

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

export default async function HomePage() {
  const cmsData = await fetchCmsData();
  const page = cmsData.pages.home;

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
