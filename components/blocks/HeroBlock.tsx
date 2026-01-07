import { Container, Typography, Box } from "@mui/material";
import { Suspense } from "react";
import { CmsBlock } from "@/lib/mockCms";
import TrackedButton from "./TrackedButton";

interface HeroBlockProps {
  block: Extract<CmsBlock, { type: "hero" }>;
}

export default function HeroBlock({ block }: HeroBlockProps) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
              mb: 3,
            }}
          >
            {block.heading}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
            }}
          >
            {block.subheading}
          </Typography>
          <TrackedButton
            href={block.ctaHref}
            text={block.ctaText}
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

