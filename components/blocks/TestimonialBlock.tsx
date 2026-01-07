import { Container, Typography, Box, Paper } from "@mui/material";
import { CmsBlock } from "@/lib/mockCms";

interface TestimonialBlockProps {
  block: Extract<CmsBlock, { type: "testimonial" }>;
}

export default function TestimonialBlock({ block }: TestimonialBlockProps) {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Paper
          elevation={2}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            backgroundColor: "grey.50",
          }}
        >
          <Typography
            variant="h5"
            component="blockquote"
            sx={{
              fontStyle: "italic",
              mb: 3,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: "text.primary",
            }}
          >
            &ldquo;{block.quote}&rdquo;
          </Typography>
          <Box>
            <Typography
              variant="h6"
              component="cite"
              sx={{ fontWeight: 600, fontStyle: "normal" }}
            >
              {block.author}
            </Typography>
            {block.role && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {block.role}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

