import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { X, ChevronRight } from "lucide-react";
const hero1 = "/images/hero-1.jpg";
const hero2 = "/images/hero-2.jpg";
const hero3 = "/images/hero-3.jpg";
const pack3 = "/images/pack-3.jpg";
const assortmentPack = "/images/assortment-pack.jpg";
import { scrollToSection } from "@/lib/scrollToSection";

interface MobileNavOverlayProps {
  open: boolean;
  onClose: () => void;
  variant?: "light" | "dark";
}

const menuItems = [
  {
    label: "Shop",
    image: hero1,
    hasSubmenu: true,
  },
  {
    label: "Packs",
    image: pack3,
    href: "/",
    scrollTo: "pack-options",
  },
  {
    label: "Reviews",
    image: hero2,
    href: "/",
    scrollTo: "reviews",
  },
  {
    label: "Why It Feels Different",
    image: hero3,
    href: "/",
    scrollTo: "why-it-feels-different",
  },
  {
    label: "FAQ",
    image: assortmentPack,
    href: "/",
    scrollTo: "faq",
  },
];

const MobileNavOverlay = ({ open, onClose }: MobileNavOverlayProps) => {
  const [shopExpanded, setShopExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setVisible(true);
      setClosing(false);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    setClosing(true);
    document.body.style.overflow = "";
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setShopExpanded(false);
      onClose();
    }, 300);
  };

  const handleNavigate = (href: string, scrollTo?: string) => {
    handleClose();
    navigate({ to: href } as never);
    if (scrollTo) scrollToSection(scrollTo, 320);
  };

  const handleTones = () => {
    handleClose();
    navigate({ to: "/", hash: "tones" });
    scrollToSection("shop-by-tone", 320);
  };

  const goTo = (to: string) => {
    handleClose();
    navigate({ to } as never);
  };

  if (!visible && !open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-foreground/30" onClick={handleClose} aria-hidden="true" />
      <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={`relative h-full w-1/3 min-w-[240px] max-w-[85vw] overflow-y-auto flex flex-col bg-espresso ${
        closing ? "animate-slide-out-left" : "animate-slide-in-left"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-espresso" />

      {/* Header */}
      <div className="relative z-10 flex shrink-0 items-center justify-between px-3 pt-5 h-16">
        <button
          onClick={handleClose}
          aria-label="Close menu"
          className="p-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <span className="font-display text-2xl font-semibold tracking-tight text-primary-foreground">
          hertones
        </span>
        <div className="w-9" /> {/* Spacer for balance */}
      </div>

      {/* Menu Items */}
      <div className="relative z-10 flex flex-col gap-1 px-4 mt-6">
        {menuItems.map((item, index) => (
          <div
            key={item.label}
            className="opacity-0 animate-nav-item-in"
            style={{ animationDelay: `${(index + 1) * 80}ms` }}
          >
            {item.hasSubmenu ? (
              <div>
                <button
                  onClick={() => setShopExpanded(!shopExpanded)}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 w-full py-3 group text-left"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="min-w-0 font-display text-lg text-primary-foreground group-hover:text-primary-foreground/80 transition-colors">
                    {item.label}
                  </span>
                  <ChevronRight
                    className={`h-5 w-5 text-primary-foreground/50 ml-auto transition-transform duration-300 ${
                      shopExpanded ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Sub-items */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    shopExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-13 pb-2 space-y-3 pr-2">
                    <button onClick={() => goTo("/collections")} className="block w-full text-left whitespace-normal break-words text-base font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors">Shop All</button>
                    <Link to="/shop-by-shapes" search={{ cut: undefined }} onClick={handleClose} className="block w-full text-left whitespace-normal break-words text-base font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors">Shop by Cut</Link>
                    <Link to="/product/slip-dress" onClick={handleClose} className="block w-full text-left whitespace-normal break-words text-base font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors">Slip Dress</Link>
                    <button onClick={handleTones} className="block w-full text-left whitespace-normal break-words text-base font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors">Shop by Tones</button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { if (item.href) handleNavigate(item.href, item.scrollTo); }}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 w-full py-3 group text-left"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className="min-w-0 font-display text-lg text-primary-foreground group-hover:text-primary-foreground/80 transition-colors">
                  {item.label}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer links */}
      <div
        className="relative z-10 mt-auto px-4 pb-8 pt-6 opacity-0 animate-nav-item-in"
        style={{ animationDelay: `${(menuItems.length + 1) * 80}ms` }}
      >
        <div className="border-t border-primary-foreground/10 pt-6 grid grid-cols-2 gap-x-3 gap-y-2.5">
          <button
            onClick={() => goTo("/shipping-returns")}
            className="text-left text-xs tracking-[0.15em] uppercase font-body text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
          >
            Shipping & Returns
          </button>
          <button
            onClick={() => goTo("/collections")}
            className="text-left text-xs tracking-[0.15em] uppercase font-body text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
          >
            Shop All
          </button>
          <button
            onClick={() => goTo("/privacy-policy")}
            className="text-left text-xs tracking-[0.15em] uppercase font-body text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
          >
            Privacy
          </button>
          <button
            onClick={() => goTo("/terms-of-service")}
            className="text-left text-xs tracking-[0.15em] uppercase font-body text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
          >
            Terms
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MobileNavOverlay;
