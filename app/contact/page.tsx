import { Metadata } from "next";
import { Suspense } from "react";
import { fetchCmsData } from "@/lib/mockCms";
import { Container, Typography, Box, Paper, Link as MuiLink } from "@mui/material";
import PageViewTracker from "@/components/PageViewTracker";

// SSG: Static generation (no revalidate)
// This page will be generated at build time

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await fetchCmsData();
  const page = cmsData.pages.contact;

  return {
    title: page.seo.title,
    description: page.seo.description || "Get in touch with the Guesty team to learn more.",
    ...(page.seo.canonical && {
      alternates: {
        canonical: page.seo.canonical,
      },
    }),
  };
}

export default async function ContactPage() {
  const cmsData = await fetchCmsData();
  const page = cmsData.pages.contact;

  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker path="/contact" />
      </Suspense>
      <Box component="main" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Paper elevation={2} sx={{ p: { xs: 4, md: 6 } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 600,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, fontSize: "1.1rem", color: "text.secondary" }}
            >
              {page.description}
            </Typography>
            <Box>
              <Typography variant="h6" component="p" sx={{ mb: 1 }}>
                Email:
              </Typography>
              <MuiLink
                href={`mailto:${page.contactEmail}`}
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {page.contactEmail}
              </MuiLink>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

