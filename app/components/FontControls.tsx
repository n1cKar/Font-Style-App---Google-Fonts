"use client";
import React from "react";

interface FontControlsProps {
  size: number;
  color: string;
  weight: number;
  onSizeChange: (val: number) => void;
  onColorChange: (val: string) => void;
  onWeightChange: (val: number) => void;
}

export default function FontControls({
  size,
  color,
  weight,
  onSizeChange,
  onColorChange,
  onWeightChange,
}: FontControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-2">
        Size:
        <input
          type="range"
          min="12"
          max="72"
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="flex-1"
        />
        <span>{size}px</span>
      </label>

      <label className="flex items-center gap-2">
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-12 h-8 p-0 border-0"
        />
      </label>

      <label className="flex items-center gap-2">
        Weight:
        <input
          type="range"
          min="100"
          max="900"
          step="100"
          value={weight}
          onChange={(e) => onWeightChange(Number(e.target.value))}
          className="flex-1"
        />
        <span>{weight}</span>
      </label>
    </div>
  );
}
