// Avatar.jsx

import React from "react";
import { Image } from "react-bootstrap";

/**
 * Avatar component for displaying profile images with fallback initials.
 * Pure React Bootstrap + inline CSS to match Radix + Tailwind behavior.
 * Components: Avatar, AvatarImage, AvatarFallback
 */

export const Avatar = ({ children, size = 32, style = {}, ...props }) => {
  return (
    <div
      data-slot="avatar"
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f3f5", // matches Tailwind's bg-muted
        position: "relative",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt = "Avatar", style = {}, ...props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      data-slot="avatar-image"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        aspectRatio: "1/1",
        ...style,
      }}
      roundedCircle
      {...props}
    />
  );
};

export const AvatarFallback = ({ initials = "NA", style = {}, className = "", ...props }) => {
  return (
    <span
      data-slot="avatar-fallback"
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        fontSize: "0.875rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#6c757d", // Bootstrap's text-muted
        ...style,
      }}
      className={className}
      {...props}
    >
      {initials}
    </span>
  );
};
