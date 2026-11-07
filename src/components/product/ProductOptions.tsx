import { ACTIVE_TONES, getTone, type ActiveTone } from "@/lib/productCatalog";

const SIZES = ["XS", "S", "M", "L", "XL", "2X"] as const;

interface ProductOptionsProps {
  currentTone: string;
  selectedFlow?: string;          // legacy prop kept for backward compatibility
  selectedSize: string;
  onToneChange: (tone: string) => void;
  onFlowChange?: (flow: string) => void; // legacy prop kept for backward compatibility
  onSizeChange: (size: string) => void;
  showTones?: boolean;
  tones?: ActiveTone[];
  toneLabel?: string;
}

const ProductOptions = ({
  currentTone,
  selectedSize,
  onToneChange,
  onSizeChange,
  showTones = true,
  tones = ACTIVE_TONES,
  toneLabel = "Tone",
}: ProductOptionsProps) => {
  const activeHex = getTone(currentTone)?.hex || ACTIVE_TONES[0].hex;
  const currentToneName = getTone(currentTone)?.name || currentTone;
  return (
    <div className="space-y-5">
      {/* Color selector — filled circles with ring */}
      <div className={showTones ? undefined : "hidden"}>
        <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
          {toneLabel} — <span className="normal-case tracking-normal">{currentToneName}</span>
        </p>
        <div className="flex gap-2.5">
          {tones.map((tone) => (
            <button
              key={tone.key}
              onClick={() => onToneChange(tone.key)}
              className={`w-8 h-8 rounded-full transition-all duration-200 ${
                tone.key === currentTone
                  ? "ring-2 ring-espresso ring-offset-2 ring-offset-background"
                  : "hover:ring-1 hover:ring-border hover:ring-offset-1 hover:ring-offset-background"
              }`}
              style={{ backgroundColor: tone.hex }}
              aria-label={tone.name}
              title={tone.name}
            />
          ))}
        </div>
      </div>

      {/*
        Absorption / Flow selector is intentionally not rendered in the V2 Cotton launch.
        The component still accepts `selectedFlow` / `onFlowChange` props so legacy callers
        do not break. The block is preserved in git history and the underlying logic lives
        in src/components/product/ScienceAbsorption.tsx (also intentionally not rendered).
      */}

      {/* Size — horizontal button row */}
      <div>
        <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
          Size
        </p>
        <div className="flex gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`h-10 flex-1 rounded-sm font-body text-sm transition-all duration-200 ${
                selectedSize === size
                  ? "text-primary-foreground"
                  : "border border-border text-foreground hover:border-espresso/40"
              }`}
              style={selectedSize === size ? { backgroundColor: activeHex } : undefined}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;
