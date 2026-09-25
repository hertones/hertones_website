import { Link } from "@tanstack/react-router";

const FooterLanding = () => (
  <footer className="py-6 px-6 bg-espresso">
    <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-display text-sm font-semibold text-primary-foreground/80 tracking-tight">hertones</span>
      <div className="flex items-center gap-6">
        <Link to="/privacy-policy" className="font-body text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">Privacy Policy</Link>
        <Link to="/terms-of-service" className="font-body text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">Terms of Service</Link>
      </div>
    </div>
  </footer>
);

export default FooterLanding;
