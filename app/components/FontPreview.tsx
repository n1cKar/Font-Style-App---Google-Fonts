"use client";
import React from "react";

export const runtime = "edge"; // Use Edge runtime for better performance

interface FontPreviewProps {
  text: string;
  font: string;
  size: number;
  color: string;
  weight: number;
}

export default function FontPreview({ text, font, size, color, weight }: FontPreviewProps) {
  return (
    <div className="p-6 border rounded-lg bg-white dark:bg-emerald-200 shadow-sm min-h-[100px]">
      <p
        style={{
          fontFamily: font,
          fontSize: `${size}px`,
          color: color,
          fontWeight: weight,
        }}
      >
        {text || "Type something to preview..."}
      </p>
    </div>
  );
}
