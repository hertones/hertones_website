export type SizeUnit = "cm" | "in";

/** Body measurements in centimetres: [min, max]. */
export const SIZE_CHART = [
  { size: "S", waist: [66, 71], hip: [91, 95] },
  { size: "M", waist: [72, 77], hip: [96, 100] },
  { size: "L", waist: [78, 83], hip: [101, 105] },
  { size: "XL", waist: [84, 89], hip: [106, 110] },
  { size: "2X", waist: [90, 95], hip: [111, 115] },
] as const;

export const formatRange = ([min, max]: readonly [number, number], unit: SizeUnit) => {
  if (unit === "cm") return `${min} - ${max}`;
  const toIn = (cm: number) => Math.round((cm / 2.54) * 2) / 2;
  return `${toIn(min)} - ${toIn(max)}`;
};
