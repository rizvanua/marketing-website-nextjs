"use client";

import { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

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
          <Typography variant="h4" component="h1" gutterBottom>
            Something went wrong!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            We encountered an unexpected error. Please try again.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={reset}
            size="large"
          >
            Try again
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

