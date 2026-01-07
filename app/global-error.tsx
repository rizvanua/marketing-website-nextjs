"use client";

import { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            p: 4,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Container maxWidth="sm">
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Something went wrong!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                We encountered a critical error. Please refresh the page or try again later.
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
      </body>
    </html>
  );
}

