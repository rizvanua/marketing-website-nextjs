import { CmsBlock } from "@/lib/mockCms";
import HeroBlock from "./HeroBlock";
import FeatureGridBlock from "./FeatureGridBlock";
import TestimonialBlock from "./TestimonialBlock";
import CtaBannerBlock from "./CtaBannerBlock";

interface BlockRendererProps {
  blocks: CmsBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "hero":
            return <HeroBlock key={index} block={block} />;
          case "featureGrid":
            return <FeatureGridBlock key={index} block={block} />;
          case "testimonial":
            return <TestimonialBlock key={index} block={block} />;
          case "ctaBanner":
            return <CtaBannerBlock key={index} block={block} />;
          default:
            // Graceful handling of unknown block types
            if (typeof window === "undefined") {
              // Server-side: log warning
              console.warn(`Unknown block type: ${(block as CmsBlock).type}`);
            }
            return null;
        }
      })}
    </>
  );
}

