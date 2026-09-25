import { useEffect, useState } from "react";
import { ShoppingBag, Loader2 } from "lucide-react";

interface StickyAddToCartProps {
  productTitle: string;
  price: string;
  onAddToCart: () => void;
  isLoading: boolean;
  isAvailable: boolean;
  hasSizeSelected: boolean;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const StickyAddToCart = ({
  productTitle,
  price,
  onAddToCart,
  isLoading,
  isAvailable,
  hasSizeSelected,
  triggerRef,
}: StickyAddToCartProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const el = triggerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [triggerRef]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary-foreground/95 backdrop-blur-md border-t border-border px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-body text-xs text-foreground truncate">{productTitle}</p>
          <p className="font-display text-sm text-espresso">${price}</p>
        </div>
        <button
          onClick={onAddToCart}
          disabled={isLoading || !isAvailable || !hasSizeSelected}
          className="h-10 px-6 bg-espresso text-primary-foreground font-body text-xs tracking-wider rounded-sm hover:bg-espresso/90 transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : !hasSizeSelected ? (
            "Pick a Size"
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" />
              Add — ${price}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StickyAddToCart;
