import { Link, useNavigate } from "@tanstack/react-router";

import { SLIP_DRESS } from "@/lib/productCatalog";
const slipDressAsset = { url: "/images/models/tonya-slip-dress-closeup-real.jpg" };
const SlipDressCard = ({ className = "", imageContainerClassName = "" }: { className?: string; imageContainerClassName?: string }) => {
  const navigate = useNavigate();

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate({ to: "/product/$handle", params: { handle: SLIP_DRESS.handle } });
  };

  return (
    <Link to="/product/$handle" params={{ handle: SLIP_DRESS.handle }} className={`group block ${className}`}>
      <div className={`rounded-lg bg-sand/40 border border-border overflow-hidden mb-4 relative ${imageContainerClassName || "aspect-[3/4]"}`}>

        <img
          src={slipDressAsset.url}
          alt={`${SLIP_DRESS.name} in Champagne`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <button
          onClick={handleCta}
          className="absolute bottom-3 right-3 h-9 px-4 bg-espresso text-primary-foreground text-xs font-body tracking-wide rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-espresso/90 flex items-center"
        >
          Pre-Order Now
        </button>
      </div>
      <h3 className="font-display text-sm font-medium text-espresso mb-1">{SLIP_DRESS.name}</h3>
      <p className="font-body text-sm text-muted-foreground">{SLIP_DRESS.price}</p>
    </Link>
  );
};

export default SlipDressCard;
