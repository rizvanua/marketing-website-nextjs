import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h1" component="h1" sx={{ fontSize: "6rem", fontWeight: 700, mb: 2 }}>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The page you are looking for does not exist or has been moved.
          </Typography>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
            >
              Go to Homepage
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

