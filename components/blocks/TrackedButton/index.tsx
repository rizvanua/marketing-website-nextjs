"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { trackCtaClick } from "@/lib/tracking";

interface TrackedButtonProps {
  href: string;
  text: string;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "inherit";
  size?: "small" | "medium" | "large";
  sx?: object;
}

export default function TrackedButton({
  href,
  text,
  variant = "contained",
  color = "primary",
  size = "large",
  sx,
}: TrackedButtonProps) {
  const handleClick = () => {
    const searchParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : undefined;
    trackCtaClick(text, href, searchParams);
  };

  return (
    <Button
      component={Link}
      href={href}
      variant={variant}
      color={color}
      size={size}
      onClick={handleClick}
      sx={{ ...sx, px: 4, "&:focus-visible": {
        backgroundColor: "rgb(154, 0, 54)",
      }}}
    >
      {text}
    </Button>
  );
}

