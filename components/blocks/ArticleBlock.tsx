import { Container, Typography, Box } from "@mui/material";
import { CmsBlock } from "@/lib/mockCms";

interface ArticleBlockProps {
  block: Extract<CmsBlock, { type: "article" }>;
}

export default function ArticleBlock({ block }: ArticleBlockProps) {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box
          component="article"
          sx={{
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 3,
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 600,
            }}
          >
            {block.title}
          </Typography>
          
          {(block.author || block.publishDate) && (
            <Box
              sx={{
                mb: 4,
                pb: 2,
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 3 },
                color: "text.secondary",
              }}
            >
              {block.author && (
                <Typography variant="body2" component="span">
                  By {block.author}
                </Typography>
              )}
              {block.publishDate && (
                <Typography variant="body2" component="time" dateTime={block.publishDate}>
                  {new Date(block.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              )}
            </Box>
          )}

          <Box
            component="div"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
            }}
          >
            {block.content.split("\n\n").map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                component="p"
                sx={{
                  mb: 2,
                }}
              >
                {paragraph.trim()}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

