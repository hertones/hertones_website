import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, ChevronDown } from "lucide-react";
import CartDrawer from "./CartDrawer";
import MobileNavOverlay from "./MobileNavOverlay";
import { ACTIVE_CUTS } from "@/lib/productCatalog";
import { scrollToSection } from "@/lib/scrollToSection";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAnchor = (id: string) => {
    setShopOpen(false);
    navigate({ to: "/", hash: id });
    scrollToSection(id);
  };

  const goTo = (to: string) => {
    setShopOpen(false);
    navigate({ to } as never);
  };

  const otherLinks = [
    { label: "Why It Feels Different", id: "why-it-feels-different" },
    { label: "Reviews", id: "reviews" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 font-display text-2xl font-semibold tracking-tight text-espresso"
        >
          hertones
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-6">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center gap-1 text-sm font-body tracking-wide text-foreground/70 hover:text-foreground transition-colors"
            >
              Shop
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
            </button>
            {shopOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-border py-2 min-w-[200px] z-50">
                <button onClick={() => goTo("/collections")} className="w-full text-left whitespace-nowrap px-4 py-2.5 text-sm font-body text-foreground/80 hover:bg-oat hover:text-foreground transition-colors">Shop All</button>
                {ACTIVE_CUTS.map((cut) => (
                  <button key={cut.key} onClick={() => goTo(`/shop-by-shapes?cut=${cut.key}`)} className="w-full text-left whitespace-nowrap px-4 py-2.5 text-sm font-body text-foreground/80 hover:bg-oat hover:text-foreground transition-colors">
                    {cut.name}
                  </button>
                ))}
                <button onClick={() => goTo("/product/slip-dress")} className="w-full text-left whitespace-nowrap px-4 py-2.5 text-sm font-body text-foreground/80 hover:bg-oat hover:text-foreground transition-colors">Slip Dress</button>
                <button onClick={() => handleAnchor("shop-by-tone")} className="w-full text-left whitespace-nowrap px-4 py-2.5 text-sm font-body text-foreground/80 hover:bg-oat hover:text-foreground transition-colors">Shop by Tones</button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleAnchor("pack-options")}
            className="text-sm font-body tracking-wide text-foreground/70 hover:text-foreground transition-colors"
          >
            Packs
          </button>

          {otherLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleAnchor(link.id)}
              className="text-sm font-body tracking-wide text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

          <div className="flex items-center">
            <CartDrawer />
          </div>
        </div>
      </nav>
      <MobileNavOverlay open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navigation;
