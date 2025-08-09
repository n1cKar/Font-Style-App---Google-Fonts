"use client";
import { useState, useEffect } from "react";
import FontPreview from "./FontPreview";
import FontControls from "./FontControls";
import { applyTextStyle, TextStyleKey } from "../utils/textStyles";

export const runtime = "edge"; // Use Edge runtime for better performance

interface FontCardProps {
  fontFamily: string;
  fontLabel: string;
  variants: string[];
  text: string;
}

const STYLE_OPTIONS: { label: string; value: TextStyleKey }[] = [
  { label: "Normal", value: "normal" },
  { label: "Circled", value: "circled" },
  { label: "Bold Script", value: "boldScript" },
  { label: "Squared", value: "squared" },
  { label: "Small Caps", value: "smallCaps" },
];

export default function FontCard({ fontFamily, fontLabel, variants, text }: FontCardProps) {
  const [size, setSize] = useState(32);
  const [color, setColor] = useState("#000000");
  const [weight, setWeight] = useState(400);
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [textStyle, setTextStyle] = useState<TextStyleKey>("normal");

  useEffect(() => {
    const id = `font-${fontFamily.replace(/\s+/g, "-")}`;
    if (document.getElementById(id)) return;

    const weightsToLoad = ["400", "700"];
    const weightsString = weightsToLoad.join(";");

    const href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@${weightsString}&display=swap`;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [fontFamily]);

  const previewText = applyTextStyle(textStyle, text);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(previewText).then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      });
    }
  };

  return (
    <div className="border border-green-300 dark:border-green-700 rounded-lg p-4 bg-white dark:bg-green-800 shadow-sm flex flex-col gap-4 text-gray-900 dark:text-amber-50 transition-colors">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{fontLabel}</h2>
        <button
          onClick={handleCopy}
          className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md select-none"
          aria-label={`Copy preview text for ${fontLabel}`}
          type="button"
        >
          Copy
        </button>
      </div>

      {copySuccess && <p className="text-sm text-green-500 select-none">{copySuccess}</p>}

      <FontPreview font={`'${fontFamily}', sans-serif`} size={size} color={color} weight={weight} text={previewText} />

      <FontControls
        size={size}
        color={color}
        weight={weight}
        onSizeChange={setSize}
        onColorChange={setColor}
        onWeightChange={setWeight}
      />

      {/* Text Style Selector */}
      <div className="mt-2">
        <label htmlFor="textStyle" className="block mb-1 font-medium">
          Text Design Style:
        </label>
        <select
          id="textStyle"
          value={textStyle}
          onChange={(e) => setTextStyle(e.target.value as TextStyleKey)}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          {STYLE_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
