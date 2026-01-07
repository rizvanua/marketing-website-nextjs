"use client";

import { AppBar, Toolbar, Box, Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CmsSiteData } from "@/lib/mockCms";
import Image from "next/image";

interface HeaderProps {
  siteData: CmsSiteData["site"];
}

export default function Header({ siteData }: HeaderProps) {
  const pathname = usePathname();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box
          component={Link}
          href="/"
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            mr: { sm: 4 },
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Image
            src="/assets/guesty-logo.svg"
            alt="Guesty Logo"
            width={133}
            height={35}
            style={{ height: "32px", width: "auto" }}
            priority
          />
        </Box>
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

