"use client";
import React from "react";

export const runtime = "edge"; // Use Edge runtime for better performance

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-lg font-medium text-black dark:text-emerald-500">
        Enter Text:
      </label>
    <input
      type="text"
      value={value}
      placeholder="Type your text here..."
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 mb-6 border rounded-lg bg-white dark:bg-gray-700 dark:text-white text-lg"
    />
    </div>
  );
}
