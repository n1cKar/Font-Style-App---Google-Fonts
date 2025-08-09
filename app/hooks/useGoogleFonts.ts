"use client";
import { useState, useEffect } from "react";

export interface GoogleFont {
  family: string;
  category: string;
  variants: string[]; // e.g. ["regular","700","italic"]
  subsets: string[];
}

export function useGoogleFonts() {
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = "Replace with your actual API key"; // Replace with your actual API key
    if (!apiKey) {
      setError("Missing Google Fonts API key in environment");
      setLoading(false);
      return;
    }

    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setFonts(data.items);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return { fonts, loading, error };
}
