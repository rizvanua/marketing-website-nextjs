import { Container, Typography, Box, Paper } from "@mui/material";
import { CmsBlock } from "@/lib/mockCms";
import TrackedButton from "./TrackedButton";

interface CtaBannerBlockProps {
  block: Extract<CmsBlock, { type: "ctaBanner" }>;
}

export default function CtaBannerBlock({ block }: CtaBannerBlockProps) {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 3,
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 600,
            }}
          >
            {block.text}
          </Typography>
          <TrackedButton
            href={block.ctaHref}
            text={block.ctaText}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}

