import { Link } from "@tanstack/react-router";

const Footer = () => (
  <footer className="py-16 px-6 bg-ivory border-t border-border">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <h3 className="font-display text-xl font-semibold text-espresso mb-3">hertones</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm">
            Elevated Cotton underwear in a considered spectrum of body-tone shades. Designed for softness, breathability, and everyday comfort.
          </p>
        </div>
        <div>
          <h4 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-4">Shop</h4>
          <ul className="space-y-2.5">
            <li><Link to="/collections" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Shop All</Link></li>
            <li><Link to="/shop-by-shapes" search={ { cut: "brazilian-bikini" } } className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Bikini</Link></li>
            <li><Link to="/shop-by-shapes" search={ { cut: "high-rise-french-cut" } } className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">French Cut</Link></li>
            <li><Link to="/shop-by-shapes" search={ { cut: "boy-short" } } className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Boy Short</Link></li>
            <li><Link to="/product/slip-dress" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Slip Dress</Link></li>
            <li><a href="/#why-it-feels-different" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Why It Feels Different</a></li>
            <li><a href="/#faq" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-4">Support</h4>
          <ul className="space-y-2.5">
            <li><Link to="/shipping-returns" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/privacy-policy" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-muted-foreground">© {new Date().getFullYear()} hertones. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy-policy" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          <Link to="/terms-of-service" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
