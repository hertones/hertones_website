// Shared product catalog — single source of truth for the V2 Cotton launch.
// Only the three active cuts and six active tones live here. Legacy names (Ivory,
// Sand, Toasted Almond, High Waisted, High-Waisted Brief, etc.) must not appear
// in any rendered UI — use the helpers below to map legacy data at render time.

export interface ActiveTone {
  key: string;
  name: string;
  hex: string;
  textColor: string;
  bgTint: string;
}

export const ACTIVE_TONES: ActiveTone[] = [
  { key: "espresso",  name: "Espresso",  hex: "#1F1A17", textColor: "#FFFFFF", bgTint: "hsl(24, 12%, 95%)" },
  { key: "chocolate", name: "Chocolate", hex: "#5A3A22", textColor: "#FFFFFF", bgTint: "hsl(22, 16%, 95%)" },
  { key: "mocha",     name: "Mocha",     hex: "#724128", textColor: "#FFFFFF", bgTint: "hsl(28, 14%, 95%)" },
  { key: "almond",    name: "Almond",    hex: "#A67B5B", textColor: "#FFFFFF", bgTint: "hsl(30, 22%, 95%)" },
  { key: "caramel",   name: "Caramel",   hex: "#C68E5A", textColor: "#FFFFFF", bgTint: "hsl(33, 18%, 95%)" },
  { key: "nude",      name: "Nude",      hex: "#D9B9A3", textColor: "hsl(24, 28%, 22%)", bgTint: "hsl(30, 30%, 96%)" },
];

export const ACTIVE_TONE_KEYS = ACTIVE_TONES.map((t) => t.key);

// Champagne — the single shade the Slip Dress is offered in. Kept out of
// ACTIVE_TONES so it never appears in underwear tone selectors.
export const CHAMPAGNE_TONE: ActiveTone = {
  key: "champagne",
  name: "Champagne",
  hex: "#E4CBA5",
  textColor: "hsl(24, 28%, 22%)",
  bgTint: "hsl(38, 34%, 96%)",
};

export function getTone(key: string): ActiveTone | undefined {
  if (key === CHAMPAGNE_TONE.key) return CHAMPAGNE_TONE;
  return ACTIVE_TONES.find((t) => t.key === key);
}

export function isActiveTone(key: string): boolean {
  return ACTIVE_TONE_KEYS.includes(key);
}

export interface ActiveCut {
  key: string;            // url slug
  name: string;           // display name
  shortDescription: string;
  matchTokens: string[];  // lowercase tokens to match Shopify titles/handles to this cut
}

export const ACTIVE_CUTS: ActiveCut[] = [
  {
    key: "brazilian-bikini",
    name: "Bikini",
    shortDescription: "A flattering everyday cut with a higher leg and minimal back coverage.",
    matchTokens: ["brazilian", "bikini"],
  },
  {
    key: "high-rise-french-cut",
    name: "French Cut",
    shortDescription: "A waist-defining silhouette with an elongated leg line and comfortable coverage.",
    matchTokens: ["high-rise", "high rise", "french", "high waisted", "high-waisted", "high waist"],
  },
  {
    key: "boy-short",
    name: "Boy Short",
    shortDescription: "A soft, full-coverage shape designed for lounging, layering, and everyday wear.",
    matchTokens: ["boy short", "boyshort", "boy-short"],
  },
];

// Display-only renamer — converts legacy Shopify titles to the V2 cut name.
// Strips any leading legacy tone prefix from the title so we render just the cut.
export function renameCut(title: string): string {
  if (!title) return title;
  // Strip legacy or active tone prefixes (Ivory High Waisted -> High Waisted)
  let t = title.replace(
    /^(ivory|sand|toasted\s*almond|espresso|chocolate|mocha|almond|caramel|nude)\s+/i,
    ""
  );
  const lower = t.toLowerCase();
  for (const cut of ACTIVE_CUTS) {
    if (cut.matchTokens.some((tok) => lower.includes(tok))) return cut.name;
  }
  return t;
}

// Maps an active tone + cut to the Shopify product handle. Because the live
// Shopify store currently only carries a subset of tone variants, tones without
// a real variant alias to the closest existing one so links never 404. This is
// a temporary alias layer — remove once Shopify variants are renamed.
export const SHOPIFY_TONE_ALIAS: Record<string, string> = {
  espresso: "espresso",
  chocolate: "espresso",
  mocha: "mocha",
  almond: "caramel",
  caramel: "caramel",
  nude: "caramel",
};

const CUT_TO_SHOPIFY_SHAPE: Record<string, string> = {
  "brazilian-bikini": "brazilian-bikini",
  "high-rise-french-cut": "high-waisted",
  "boy-short": "boy-short",
};

export function mapToneHandle(tone: string, cutKey: string): string {
  const shopifyTone = SHOPIFY_TONE_ALIAS[tone] || "caramel";
  const shape = CUT_TO_SHOPIFY_SHAPE[cutKey] || cutKey;
  return `${shopifyTone}-${shape}`;
}

// Slip Dress — separate category. Never include in homepage product surfaces.
export const SLIP_DRESS = {
  key: "slip-dress",
  name: "Tonya Slip Dress",
  handle: "slip-dress",
  price: "$50.00",
  shortDescription:
    "A softly draped Silk-focused slip designed for layering, lounging, and quiet everyday luxury.",
};
