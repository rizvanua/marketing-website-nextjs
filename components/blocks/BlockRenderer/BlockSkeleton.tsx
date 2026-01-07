import { Box, Container, Skeleton } from "@mui/material";

export function HeroSkeleton() {
  return (
    <Box
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
          <Skeleton
            variant="text"
            width="80%"
            height={60}
            sx={{ mx: "auto", mb: 3, bgcolor: "rgba(255,255,255,0.2)" }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={40}
            sx={{ mx: "auto", mb: 4, bgcolor: "rgba(255,255,255,0.2)" }}
          />
          <Skeleton
            variant="rectangular"
            width={200}
            height={48}
            sx={{ mx: "auto", borderRadius: 1, bgcolor: "rgba(255,255,255,0.2)" }}
          />
        </Box>
      </Container>
    </Box>
  );
}

export function FeatureGridSkeleton() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Skeleton
          variant="text"
          width="40%"
          height={50}
          sx={{ mx: "auto", mb: 6 }}
        />
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
          {[1, 2, 3].map((i) => (
            <Box key={i}>
              <Skeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: 1 }} />
              <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export function TestimonialSkeleton() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
          <Skeleton
            variant="text"
            width="90%"
            height={40}
            sx={{ mx: "auto", mb: 3 }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height={30}
            sx={{ mx: "auto", mb: 2 }}
          />
          <Skeleton variant="text" width="40%" height={24} sx={{ mx: "auto" }} />
        </Box>
      </Container>
    </Box>
  );
}

export function CtaBannerSkeleton() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
          <Skeleton
            variant="text"
            width="50%"
            height={40}
            sx={{ mx: "auto", mb: 3 }}
          />
          <Skeleton
            variant="rectangular"
            width={200}
            height={48}
            sx={{ mx: "auto", borderRadius: 1 }}
          />
        </Box>
      </Container>
    </Box>
  );
}

export function BlockRendererSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <FeatureGridSkeleton />
      <TestimonialSkeleton />
    </>
  );
}

