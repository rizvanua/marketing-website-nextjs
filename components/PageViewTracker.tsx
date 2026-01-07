"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/tracking";

interface PageViewTrackerProps {
  path: string;
}

export default function PageViewTracker({ path }: PageViewTrackerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    trackPageView(path, searchParams);
  }, [path, searchParams]);

  return null;
}

