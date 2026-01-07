import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import { CmsBlock } from "@/lib/mockCms";

interface FeatureGridBlockProps {
  block: Extract<CmsBlock, { type: "featureGrid" }>;
}

export default function FeatureGridBlock({ block }: FeatureGridBlockProps) {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 600,
          }}
        >
          {block.title}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {block.items.map((item, index) => (
            <Card
              key={index}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
                transition: "box-shadow 0.3s",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

