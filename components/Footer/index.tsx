import { Box, Container, Typography } from "@mui/material";
import { CmsSiteData } from "@/lib/mockCms";

interface FooterProps {
  siteData: CmsSiteData["site"];
}

export default function Footer({ siteData }: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: "auto",
        backgroundColor: "grey.100",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} {siteData.name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

