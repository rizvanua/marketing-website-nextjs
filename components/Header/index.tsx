"use client";

import { useState } from "react";
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, Typography, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CmsSiteData } from "@/lib/mockCms";
import Image from "next/image";

interface HeaderProps {
  siteData: CmsSiteData["site"];
}

export default function Header({ siteData }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!siteData) {
    return null;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <>
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
              src={siteData.logoUrl || "/assets/guesty-logo.svg"}
              alt={siteData.logoAltText || `${siteData.name} Logo`}
              width={133}
              height={35}
              style={{ height: "32px", width: "auto" }}
              priority
            />
          </Box>
          {/* Desktop Navigation */}
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
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                    },
                  }}
                >
                  {navItem.label}
                </Button>
              );
            })}
          </Box>
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open navigation menu"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", sm: "none" }, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {siteData.name}
          </Typography>
          <IconButton
            onClick={handleDrawerClose}
            aria-label="close navigation menu"
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {siteData.navigation.map((navItem) => {
            const isActive = pathname === navItem.href;
            return (
              <ListItem key={navItem.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={navItem.href}
                  onClick={handleDrawerClose}
                  selected={isActive}
                  sx={{
                    color: isActive ? "primary.main" : "text.primary",
                    fontWeight: isActive ? 600 : 400,
                    "&.Mui-selected": {
                      backgroundColor: "action.selected",
                      "&:hover": {
                        backgroundColor: "action.selected",
                      },
                    },
                    "&:focus-visible": {
                      outline: "2px solid",
                      outlineColor: "primary.main",
                      outlineOffset: "-2px",
                    },
                  }}
                >
                  {navItem.label}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}

