import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ShippingReturns = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl font-semibold text-espresso mb-8">Shipping & Returns</h1>

        <section className="space-y-4 mb-12">
          <h2 className="font-display text-xl font-medium text-espresso">Shipping</h2>

          <div className="space-y-3">
            <h3 className="font-body text-sm font-semibold text-foreground">Processing Time</h3>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">Orders are processed within 1–3 business days. You will receive a confirmation email with tracking information once your order has shipped.</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-body text-sm font-semibold text-foreground">Shipping Methods</h3>
            <ul className="font-body text-sm text-foreground/80 leading-relaxed list-disc pl-5 space-y-1">
              <li>Standard Shipping (5–7 business days) — Free on orders over $75</li>
              <li>Expedited Shipping (2–3 business days) — $9.99</li>
              <li>Overnight Shipping (1 business day) — $19.99</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-body text-sm font-semibold text-foreground">Tracking</h3>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">Once your order ships, you'll receive a tracking number via email. You can use this to track your package through the carrier's website.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-xl font-medium text-espresso">Returns & Exchanges</h2>

          <div className="space-y-3">
            <h3 className="font-body text-sm font-semibold text-foreground">Return Policy</h3>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached. Due to the intimate nature of our products, worn or washed items cannot be returned for hygiene reasons.</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-body text-sm font-semibold text-foreground">How to Return</h3>
            <ol className="font-body text-sm text-foreground/80 leading-relaxed list-decimal pl-5 space-y-1">
              <li>Email us at <span className="font-medium">hello@hertones.com</span> with your order number</li>
              <li>We'll send you a prepaid return label</li>
              <li>Pack and ship the item(s) back to us</li>
              <li>Refund issued within 5–7 business days of receiving your return</li>
            </ol>
          </div>

          <div className="space-y-3">
            <h3 className="font-body text-sm font-semibold text-foreground">Exchanges</h3>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">Need a different size or color? Email us and we'll help arrange an exchange. Exchanges are subject to availability.</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-body text-sm font-semibold text-foreground">Refunds</h3>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">Refunds are processed to the original payment method. Please allow 5–7 business days for the refund to appear on your statement after we receive and inspect the returned item(s).</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingReturns;
