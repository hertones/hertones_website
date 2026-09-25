// Local product images organized by tone for the French Cut
// Order: hero front → side/angle → front alt → detail → full model
const caramel1 = "/images/products/caramel-1.png";
const caramel2 = "/images/products/caramel-2.png";
const caramel3 = "/images/products/caramel-3.png";
const caramel4 = "/images/products/caramel-4.png";
const caramel5 = "/images/products/caramel-5.png";const espresso1 = "/images/products/espresso-1.png";
const espresso2 = "/images/products/espresso-2.png";
const espresso3 = "/images/products/espresso-3.png";
const espresso4 = "/images/products/espresso-4.png";
const espresso5 = "/images/products/espresso-5.png";const bikiniEspresso = { url: "/images/bikini/espresso.png" };
const bikiniChocolate = { url: "/images/bikini/chocolate.png" };
const bikiniMocha = { url: "/images/bikini/mocha.png" };
const bikiniAlmond = { url: "/images/bikini/almond.png" };
const bikiniCaramel = { url: "/images/bikini/caramel.png" };
const bikiniNude = { url: "/images/bikini/nude.png" };
const bikiniEspressoModelFront = { url: "/images/models/bikini-espresso-model-front.jpg" };
const bikiniEspressoModelRear = { url: "/images/models/bikini-espresso-model-rear.jpg" };
const bikiniNudeModel = { url: "/images/models/bikini-nude-model.jpg" };
const bikiniAlmondModelRear = { url: "/images/models/bikini-almond-model-rear.jpg" };
const frenchMochaModelFront = { url: "/images/models/french-cut-mocha-model-front.jpg" };
const frenchMochaModelRear = { url: "/images/models/french-cut-mocha-model-rear.jpg" };
const boyShortCaramelModelFront = { url: "/images/models/boy-short-caramel-model-front.jpg" };
const boyShortCaramelModelRear = { url: "/images/models/boy-short-caramel-model-rear.jpg" };
const boyShortMochaModelFront = { url: "/images/models/boyshort-mocha-model-front.jpg" };
const boyShortMochaModelRear = { url: "/images/models/boyshort-mocha-model-rear.jpg" };
const boyShortCaramelTurn = { url: "/videos/boy-short-caramel-turn-v2-muted.mp4" };
const boyShortCaramelStraight = { url: "/images/models/boy-short-caramel-asian-rear-straight-ahead-v3.jpg" };
const bikiniEspressoTurn = { url: "/videos/bikini-espresso-turn-v4-muted.mp4" };
const boyShortCaramelTurnV3 = { url: "/videos/boy-short-caramel-turn-v3-muted.mp4" };
const frenchEspresso = { url: "/images/french-cut/espresso.png" };
const frenchChocolate = { url: "/images/french-cut/chocolate.png" };
const frenchMocha = { url: "/images/french-cut/mocha.png" };
const frenchAlmond = { url: "/images/french-cut/almond.png" };
const frenchCaramel = { url: "/images/french-cut/caramel.png" };
const frenchNude = { url: "/images/french-cut/nude.png" };
const boyEspresso = { url: "/images/boy-short/espresso.png" };
const boyChocolate = { url: "/images/boy-short/chocolate.png" };
const boyMocha = { url: "/images/boy-short/mocha.png" };
const boyAlmond = { url: "/images/boy-short/almond.png" };
const boyCaramel = { url: "/images/boy-short/caramel.png" };
const boyNude = { url: "/images/boy-short/nude.png" };
const placeholderHighRise = "/images/products/placeholder-high-rise-french-cut.jpg";
const placeholderBoyShort = "/images/products/placeholder-boy-short.jpg";
import { ACTIVE_CUTS } from "./productCatalog";

export interface LocalImage {
  url: string;
  alt: string;
  type?: "image" | "video";
}

// Map of tone → ordered image array
export const LOCAL_PRODUCT_IMAGES: Record<string, LocalImage[]> = {
  caramel: [
    { url: caramel1, alt: "hertones French Cut in Caramel — Front" },
    { url: caramel2, alt: "hertones French Cut in Caramel — Side" },
    { url: caramel3, alt: "hertones French Cut in Caramel — Front Alt" },
    { url: caramel4, alt: "hertones French Cut in Caramel — Detail" },
    { url: caramel5, alt: "hertones French Cut in Caramel — Model" },
  ],
  espresso: [
    { url: espresso1, alt: "hertones French Cut in Espresso — Model Front" },
    { url: espresso2, alt: "hertones French Cut in Espresso — Detail" },
    { url: espresso3, alt: "hertones French Cut in Espresso — Model Angle" },
    { url: espresso4, alt: "hertones French Cut in Espresso — Model Side" },
    { url: espresso5, alt: "hertones French Cut in Espresso — Model Alt" },
  ],
};

// Bikini product photography — one flat-lay per tone.
export const BIKINI_IMAGES: Record<string, LocalImage> = {
  espresso:  { url: bikiniEspresso.url,  alt: "hertones Bikini in Espresso" },
  chocolate: { url: bikiniChocolate.url, alt: "hertones Bikini in Chocolate" },
  mocha:     { url: bikiniMocha.url,     alt: "hertones Bikini in Mocha" },
  almond:    { url: bikiniAlmond.url,    alt: "hertones Bikini in Almond" },
  caramel:   { url: bikiniCaramel.url,   alt: "hertones Bikini in Caramel" },
  nude:      { url: bikiniNude.url,      alt: "hertones Bikini in Nude" },
};

export function getBikiniImage(tone?: string | null): LocalImage | null {
  if (!tone) return null;
  return BIKINI_IMAGES[tone] || null;
}

// French Cut product photography — one flat-lay per tone.
export const FRENCH_CUT_IMAGES: Record<string, LocalImage> = {
  espresso:  { url: frenchEspresso.url,  alt: "hertones French Cut in Espresso" },
  chocolate: { url: frenchChocolate.url, alt: "hertones French Cut in Chocolate" },
  mocha:     { url: frenchMocha.url,     alt: "hertones French Cut in Mocha" },
  almond:    { url: frenchAlmond.url,    alt: "hertones French Cut in Almond" },
  caramel:   { url: frenchCaramel.url,   alt: "hertones French Cut in Caramel" },
  nude:      { url: frenchNude.url,      alt: "hertones French Cut in Nude" },
};

export function getFrenchCutImage(tone?: string | null): LocalImage | null {
  if (!tone) return null;
  return FRENCH_CUT_IMAGES[tone] || null;
}

// Boy Short product photography — one flat-lay per tone.
export const BOY_SHORT_IMAGES: Record<string, LocalImage> = {
  espresso:  { url: boyEspresso.url,  alt: "hertones Boy Short in Espresso" },
  chocolate: { url: boyChocolate.url, alt: "hertones Boy Short in Chocolate" },
  mocha:     { url: boyMocha.url,     alt: "hertones Boy Short in Mocha" },
  almond:    { url: boyAlmond.url,    alt: "hertones Boy Short in Almond" },
  caramel:   { url: boyCaramel.url,   alt: "hertones Boy Short in Caramel" },
  nude:      { url: boyNude.url,      alt: "hertones Boy Short in Nude" },
};

export function getBoyShortImage(tone?: string | null): LocalImage | null {
  if (!tone) return null;
  return BOY_SHORT_IMAGES[tone] || null;
}

/**
 * Returns local images for a given tone (and optionally cut) if available.
 */
export function getLocalImages(tone: string, cutKey?: string | null): LocalImage[] | null {
  if (cutKey === "brazilian-bikini") {
    const img = getBikiniImage(tone);
    if (!img) return null;
    if (tone === "espresso") {
      return [
        img,
        { url: bikiniEspressoModelFront.url, alt: "hertones Bikini in Espresso — On Model Front" },
        { url: bikiniEspressoModelRear.url, alt: "hertones Bikini in Espresso — On Model Back" },
        { url: bikiniEspressoTurn.url, alt: "hertones Bikini in Espresso — On Model Turn", type: "video" },
      ];
    }
    if (tone === "nude") {
      return [
        img,
        { url: bikiniNudeModel.url, alt: "hertones Bikini in Nude — On Model Front" },
      ];
    }
    if (tone === "almond") {
      return [
        img,
        { url: bikiniAlmondModelRear.url, alt: "hertones Bikini in Almond — On Model Back" },
      ];
    }
    return [img];
  }
  if (cutKey === "boy-short") {
    const img = getBoyShortImage(tone);
    if (!img) return null;
    if (tone === "caramel") {
      return [
        img,
        { url: boyShortCaramelTurn.url, alt: "hertones Boy Short in Caramel — On Model Turn", type: "video" },
        { url: boyShortCaramelTurnV3.url, alt: "hertones Boy Short in Caramel — On Model Turn 2", type: "video" },
        { url: boyShortCaramelModelFront.url, alt: "hertones Boy Short in Caramel — On Model Front" },
        { url: boyShortCaramelModelRear.url, alt: "hertones Boy Short in Caramel — On Model Back" },
        { url: boyShortCaramelStraight.url, alt: "hertones Boy Short in Caramel — On Model Back Straight" },
      ];
    }
    if (tone === "mocha") {
      return [
        img,
        { url: boyShortMochaModelFront.url, alt: "hertones Boy Short in Mocha — On Model Front" },
        { url: boyShortMochaModelRear.url, alt: "hertones Boy Short in Mocha — On Model Back" },
      ];
    }
    return [img];
  }
  if (cutKey && cutKey !== "high-rise-french-cut") return null;
  const french = getFrenchCutImage(tone);
  if (tone === "mocha" && french) {
    return [
      french,
      { url: frenchMochaModelFront.url, alt: "hertones French Cut in Mocha — On Model Front" },
      { url: frenchMochaModelRear.url, alt: "hertones French Cut in Mocha — On Model Back" },
    ];
  }
  if (french) return [french];
  return LOCAL_PRODUCT_IMAGES[tone] || null;
}

// Returns an on-model image only when one exists for this exact cut and tone.
// Gallery arrays are ordered with the underwear-only product image first.
export function getModelImageForProduct(
  title?: string | null,
  handle?: string | null,
): LocalImage | null {
  const cutKey = getCutKeyFromTitle(title, handle);
  const tone = getToneFromText(title, handle);
  if (!cutKey || !tone) return null;

  const images = getLocalImages(tone, cutKey);
  if (!images || images.length < 2) return null;
  // French Cut cards on Shop by Cut lead with the rear on-model shot.
  if (cutKey === "high-rise-french-cut" && images.length > 2) {
    return images[2] || null;
  }
  return images[1] || null;
}

// Cut-specific model/mannequin placeholder images used as fallback whenever
// a product does not have real photography yet.
const CUT_PLACEHOLDERS: Record<string, LocalImage> = {
  "brazilian-bikini": BIKINI_IMAGES["caramel"],
  "high-rise-french-cut": FRENCH_CUT_IMAGES["caramel"] || {
    url: placeholderHighRise,
    alt: "hertones French Cut in Cotton — shown on form",
  },
  "boy-short": BOY_SHORT_IMAGES["caramel"] || {
    url: placeholderBoyShort,
    alt: "hertones Boy Short in Cotton — shown on form",
  },
};

// Best-effort match of a product title/handle to one of the active cuts.
export function getCutKeyFromTitle(title?: string | null, handle?: string | null): string | null {
  const hay = `${title || ""} ${handle || ""}`.toLowerCase();
  for (const cut of ACTIVE_CUTS) {
    if (cut.matchTokens.some((tok) => hay.includes(tok))) return cut.key;
  }
  return null;
}

export function getPlaceholderForCut(cutKey?: string | null): LocalImage {
  if (cutKey && CUT_PLACEHOLDERS[cutKey]) return CUT_PLACEHOLDERS[cutKey];
  return CUT_PLACEHOLDERS["high-rise-french-cut"];
}

const HANDLE_TONE_ALIAS: Record<string, string> = {
  ivory: "nude",
  sand: "almond",
  toasted: "almond",
  nude: "nude",
  almond: "almond",
  caramel: "caramel",
  mocha: "mocha",
  chocolate: "chocolate",
  espresso: "espresso",
};

export function getToneFromText(title?: string | null, handle?: string | null): string | null {
  const hay = `${handle || ""} ${title || ""}`.toLowerCase();
  for (const key of Object.keys(HANDLE_TONE_ALIAS)) {
    if (hay.includes(key)) return HANDLE_TONE_ALIAS[key];
  }
  return null;
}

function localCutImage(title?: string | null, handle?: string | null, cutKey?: string | null): LocalImage | null {
  const tone = getToneFromText(title, handle);
  if (cutKey === "brazilian-bikini") return getBikiniImage(tone);
  if (cutKey === "boy-short") return getBoyShortImage(tone);
  if (cutKey === "high-rise-french-cut") return getFrenchCutImage(tone);
  return null;
}

export function getPlaceholderFromProduct(title?: string | null, handle?: string | null): LocalImage {
  const cutKey = getCutKeyFromTitle(title, handle);
  const img = localCutImage(title, handle, cutKey);
  if (img) return img;
  return getPlaceholderForCut(cutKey);
}

// Prefers real hertones photography over Shopify imagery where we have it.
export function resolveProductImage(
  title?: string | null,
  handle?: string | null,
  shopifyUrl?: string | null,
  shopifyAlt?: string | null,
): LocalImage {
  const cutKey = getCutKeyFromTitle(title, handle);
  const img = localCutImage(title, handle, cutKey);
  if (img) return img;
  if (shopifyUrl) return { url: shopifyUrl, alt: shopifyAlt || title || "" };
  return getPlaceholderForCut(cutKey);
}
