// utils/textStyles.ts
export type TextStyleKey =
  | "normal"
  | "circled"
  | "boldScript"
  | "squared"
  | "smallCaps"
  | "doubleStruck"
  | "fraktur"
  | "monospace"
  | "parenthesized"
  | "fullwidth"
  | "script"
  | "boldFraktur"
  | "italic"
  | "boldItalic"
  | "sansSerif"
  | "sansSerifBold"
  | "sansSerifItalic"
  | "sansSerifBoldItalic"
  | "doubleCircled"
  | "superscript";

export function applyTextStyle(style: TextStyleKey, text: string): string {
  switch (style) {
    case "circled":
      return toCircled(text);
    case "boldScript":
      return toBoldScript(text);
    case "squared":
      return toSquared(text);
    case "smallCaps":
      return toSmallCaps(text);
    case "doubleStruck":
      return toDoubleStruck(text);
    case "fraktur":
      return toFraktur(text);
    case "monospace":
      return toMonospace(text);
    case "parenthesized":
      return toParenthesized(text);
    case "fullwidth":
      return toFullwidth(text);
    case "script":
      return toScript(text);
    case "boldFraktur":
      return toBoldFraktur(text);
    case "italic":
      return toItalic(text);
    case "boldItalic":
      return toBoldItalic(text);
    case "sansSerif":
      return toSansSerif(text);
    case "sansSerifBold":
      return toSansSerifBold(text);
    case "sansSerifItalic":
      return toSansSerifItalic(text);
    case "sansSerifBoldItalic":
      return toSansSerifBoldItalic(text);
    case "doubleCircled":
      return toDoubleCircled(text);
    case "superscript":
      return toSuperscript(text);
    case "normal":
    default:
      return text;
  }
}

// 1. Circled Letters (ⒸⒾⓇⒸⓁⒺⒹ)
function toCircled(text: string): string {
  const circledCapsStart = 9398; // Ⓐ
  const circledNumbersStart = 9450; // ⓪
  return text
    .toUpperCase()
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCharCode(circledCapsStart + (code - 65));
      if (code >= 48 && code <= 57) return String.fromCharCode(circledNumbersStart + (code - 48));
      if (c === " ") return " ";
      return c;
    })
    .join("");
}

// 2. Bold Script Letters (𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽)
function toBoldScript(text: string): string {
  const base = 119808; // 𝓐
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(base + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(base + 26 + (code - 97));
      return c;
    })
    .join("");
}

// 3. Squared Letters (🄰🄱🄲)
function toSquared(text: string): string {
  const base = 127344; // 🄰
  return text
    .toUpperCase()
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(base + (code - 65));
      return c;
    })
    .join("");
}

// 4. Small Caps (ᴀ ʙ ᴄ)
function toSmallCaps(text: string): string {
  const smallCapsMap: { [key: string]: string } = {
    a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ",
    h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ",
    o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ",
    v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
  };
  return text
    .toLowerCase()
    .split("")
    .map((c) => smallCapsMap[c] || c)
    .join("");
}

// 5. Double Struck (𝔸 𝔹 𝔻)
function toDoubleStruck(text: string): string {
  const baseCaps = 120120; // 𝔸
  const baseLower = 120146; // 𝕒
  const baseNums = 120792; // 𝟘
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      if (code >= 48 && code <= 57) return String.fromCodePoint(baseNums + (code - 48));
      return c;
    })
    .join("");
}

// 6. Fraktur Letters (𝔄 𝔅 𝔇)
function toFraktur(text: string): string {
  const baseCaps = 120068; // 𝔄
  const baseLower = 120094; // 𝔞
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 7. Monospace Letters (𝙰 𝙱 𝙲)
function toMonospace(text: string): string {
  const baseCaps = 120432; // 𝙰
  const baseLower = 120458; // 𝚊
  const baseNums = 120782; // 𝟶
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      if (code >= 48 && code <= 57) return String.fromCodePoint(baseNums + (code - 48));
      return c;
    })
    .join("");
}

// 8. Parenthesized Letters (⒜⒝⒞)
function toParenthesized(text: string): string {
  const baseLower = 9424; // ⒜
  return text
    .toLowerCase()
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 97 && code <= 122) return String.fromCharCode(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 9. Fullwidth Letters (Ｆｕｌｌｗｉｄｔｈ)
function toFullwidth(text: string): string {
  const base = 65248; // fullwidth offset
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCharCode(code + base);
      return c;
    })
    .join("");
}

// 10. Script Letters (𝒜 𝒞 𝒟)
function toScript(text: string): string {
  const baseCaps = 119964; // 𝒜
  const baseLower = 119990; // 𝒶
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 11. Bold Fraktur Letters (𝕬 𝕮 𝕯)
function toBoldFraktur(text: string): string {
  const baseCaps = 120076; // 𝕬
  const baseLower = 120102; // 𝖆
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 12. Italic Letters (𝐴 𝐶 𝐷)
function toItalic(text: string): string {
  const baseCaps = 119964; // 𝐴
  const baseLower = 119990; // 𝑎
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 13. Bold Italic Letters (𝑨 𝑪 𝑫)
function toBoldItalic(text: string): string {
  const baseCaps = 119912; // 𝑨
  const baseLower = 119938; // 𝒂
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 14. Sans Serif Letters (𝗔 𝗖 𝗗)
function toSansSerif(text: string): string {
  const baseCaps = 120224; // 𝗔
  const baseLower = 120250; // 𝗮
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 15. Sans Serif Bold Letters (𝗔𝗕𝗖)
function toSansSerifBold(text: string): string {
  const baseCaps = 120276; // 𝗔
  const baseLower = 120302; // 𝗮
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 16. Sans Serif Italic Letters (𝘈 𝘊 𝘋)
function toSansSerifItalic(text: string): string {
  const baseCaps = 120328; // 𝘈
  const baseLower = 120354; // 𝘢
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 17. Sans Serif Bold Italic Letters (𝘼 𝘾 𝘿)
function toSansSerifBoldItalic(text: string): string {
  const baseCaps = 120380; // 𝘼
  const baseLower = 120406; // 𝙖
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(baseLower + (code - 97));
      return c;
    })
    .join("");
}

// 18. Double Circled Letters (🅐 🅑 🅒)
function toDoubleCircled(text: string): string {
  const base = 127344 + 26; // after squared
  return text
    .toUpperCase()
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(base + (code - 65));
      return c;
    })
    .join("");
}

// 19. Superscript (ᴬ ᴮ ᶜ)
function toSuperscript(text: string): string {
  const supMap: { [key: string]: string } = {
    a: "ᵃ",
    b: "ᵇ",
    c: "ᶜ",
    d: "ᵈ",
    e: "ᵉ",
    f: "ᶠ",
    g: "ᵍ",
    h: "ʰ",
    i: "ᶦ",
    j: "ʲ",
    k: "ᵏ",
    l: "ˡ",
    m: "ᵐ",
    n: "ⁿ",
    o: "ᵒ",
    p: "ᵖ",
    q: "ᑫ",
    r: "ʳ",
    s: "ˢ",
    t: "ᵗ",
    u: "ᵘ",
    v: "ᵛ",
    w: "ʷ",
    x: "ˣ",
    y: "ʸ",
    z: "ᶻ",
    A: "ᴬ",
    B: "ᴮ",
    C: "ᶜ",
    D: "ᴰ",
    E: "ᴱ",
    F: "ᶠ",
    G: "ᴳ",
    H: "ᴴ",
    I: "ᴵ",
    J: "ᴶ",
    K: "ᴷ",
    L: "ᴸ",
    M: "ᴹ",
    N: "ᴺ",
    O: "ᴼ",
    P: "ᴾ",
    Q: "ᑫ",
    R: "ᴿ",
    S: "ˢ",
    T: "ᵀ",
    U: "ᵁ",
    V: "ⱽ",
    W: "ᵂ",
    X: "ˣ",
    Y: "ʸ",
    Z: "ᶻ",
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
  };
  return text
    .split("")
    .map((c) => supMap[c] || c)
    .join("");
}
