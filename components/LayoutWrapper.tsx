"use client";

import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { CmsSiteData } from "@/lib/mockCms";

interface LayoutWrapperProps {
  siteData: CmsSiteData["site"];
  children: React.ReactNode;
}

export default function LayoutWrapper({
  siteData,
  children,
}: LayoutWrapperProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header siteData={siteData} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer siteData={siteData} />
    </Box>
  );
}

