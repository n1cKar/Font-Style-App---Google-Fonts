"use client";
import React from "react";

interface FontOption {
  name: string;
  label: string;
}

interface FontSelectorProps {
  fonts: FontOption[];
  selected: string;
  onChange: (font: string) => void;
}

export default function FontSelector({ fonts, selected, onChange }: FontSelectorProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
    >
      {fonts.map((f) => (
        <option key={f.name} value={f.name}>
          {f.label}
        </option>
      ))}
    </select>
  );
}
