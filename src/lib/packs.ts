import {
  BIKINI_IMAGES,
  FRENCH_CUT_IMAGES,
  BOY_SHORT_IMAGES,
  getLocalImages,
  type LocalImage,
} from "./productImages";

export interface PackCut {
  label: string;
  cutKey: string;
  /** Representative tone used for the cut's gallery + thumbnail imagery. */
  tone: string;
  thumbnail: LocalImage;
}

export interface Pack {
  handle: string;
  name: string;
  badge: string;
  title: string;
  price: string;
  image: string;
  description: string;
  /** Shopify product handle holding the real variants (Cut option). */
  shopifyHandle: string;
}

export const PACK_CUTS: PackCut[] = [
  {
    label: "Bikini",
    cutKey: "brazilian-bikini",
    tone: "espresso",
    thumbnail: BIKINI_IMAGES["caramel"],
  },
  {
    label: "French Cut",
    cutKey: "high-rise-french-cut",
    tone: "mocha",
    thumbnail: FRENCH_CUT_IMAGES["caramel"],
  },
  {
    label: "Boy Short",
    cutKey: "boy-short",
    tone: "caramel",
    thumbnail: BOY_SHORT_IMAGES["caramel"],
  },
];

export const PACKS: Pack[] = [
  {
    handle: "3-pack",
    name: "3-Pack",
    badge: "17% Off",
    title: "3 Pack Cotton Essentials",
    price: "$42",
    image: "/images/pack-3.jpg",
    description:
      "Three everyday pairs in a considered mix of body-tone shades. Soft, breathable cotton in the cut you choose — the easy way to start your rotation.",
    shopifyHandle: "3-pack",
  },
  {
    handle: "6-pack",
    name: "6-Pack",
    badge: "25% Off",
    title: "6 Pack Foundation Set",
    price: "$76",
    image: "/images/pack-6.webp",
    description:
      "Six pairs spanning the core tone spectrum, all in your chosen cut. A full week of soft, breathable cotton essentials in one set.",
    shopifyHandle: "6-pack",
  },
  {
    handle: "12-pack",
    name: "12-Pack",
    badge: "Best Value",
    title: "12 Pack The Full Kit",
    price: "$168",
    image: "/images/pack-all3.webp",
    description:
      "Twelve pairs across the full tone spectrum, every one in your chosen cut. The complete hertones drawer — our best value per pair.",
    shopifyHandle: "12-pack",
  },
];

export function getPackByHandle(handle?: string | null): Pack | null {
  if (!handle) return null;
  return PACKS.find((p) => p.handle === handle) || null;
}

/** Gallery for a chosen cut, falling back to the cut's flat-lay thumbnail. */
export function getCutGallery(cut: PackCut): LocalImage[] {
  const images = getLocalImages(cut.tone, cut.cutKey);
  if (images && images.length > 0) return images;
  return [cut.thumbnail];
}
