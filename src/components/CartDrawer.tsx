import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { resolveProductImage } from "@/lib/productImages";

interface CartDrawerProps {
  variant?: "light" | "default";
}

const CartDrawer = ({ variant = "default" }: CartDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  const iconColor = variant === "light"
    ? "text-primary-foreground/90 hover:text-primary-foreground"
    : "text-foreground hover:text-accent";
  const badgeBg = variant === "light"
    ? "bg-primary-foreground text-espresso"
    : "bg-accent text-accent-foreground";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className={`relative p-2 transition-colors ${iconColor}`}>
          <ShoppingBag className="h-5 w-5" />
          <span className={`absolute -top-1 -right-1 h-4 w-4 rounded-full text-[10px] flex items-center justify-center font-medium ${badgeBg}`}>
            {totalItems}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-ivory">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-xl">Your Bag</SheetTitle>
          <SheetDescription className="font-body text-sm">
            {totalItems === 0 ? "Your bag is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground font-body text-sm">Nothing here yet</p>
                <p className="text-muted-foreground/60 font-body text-xs mt-1">Comfort is just a click away</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 p-3 bg-oat rounded-lg">
                    <div className="w-16 h-20 bg-sand rounded overflow-hidden flex-shrink-0">
                      {(() => {
                        const shopifyImg = item.product.node.images?.edges?.[0]?.node;
                        const img = resolveProductImage(
                          item.product.node.title,
                          item.product.node.handle,
                          shopifyImg?.url,
                          shopifyImg?.altText
                        );
                        return <img src={img.url} alt={img.alt || item.product.node.title} className="w-full h-full object-cover" />;
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-medium truncate">{item.product.node.title}</h4>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">{item.selectedOptions.map(o => o.value).join(' · ')}</p>
                      <p className="font-body text-sm font-medium mt-1">${parseFloat(item.price.amount).toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-sand transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-body w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-sand transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                        <button onClick={() => removeItem(item.variantId)} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-border mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-display text-base">Total</span>
                  <span className="font-display text-lg font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-espresso hover:bg-espresso/90 text-primary-foreground font-body tracking-wide"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Checkout
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
