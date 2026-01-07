"use client";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CmsSiteData } from "@/lib/mockCms";

interface HeaderProps {
  siteData: CmsSiteData["site"];
}

export default function Header({ siteData }: HeaderProps) {
  const pathname = usePathname();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            mr: { sm: 4 },
            textDecoration: "none",
            color: "inherit",
            fontWeight: 700,
          }}
        >
          {siteData.name}
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
          {siteData.navigation.map((navItem) => {
            const isActive = pathname === navItem.href;
            return (
              <Button
                key={navItem.href}
                component={Link}
                href={navItem.href}
                color={isActive ? "primary" : "inherit"}
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "violet",
                    outlineOffset: "2px",
                  },
                }}
              >
                {navItem.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

