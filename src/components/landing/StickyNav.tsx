const StickyNav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-border h-[64px] flex items-center">
    <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center justify-between">
      <span className="font-display text-xl font-semibold text-espresso tracking-tight">hertones</span>
      <a
        href="#offer"
        className="inline-flex items-center justify-center h-10 px-6 bg-espresso text-primary-foreground font-body text-sm tracking-wide rounded-sm hover:bg-espresso/90 transition-colors"
      >
        Start with Your First Pair
      </a>
    </div>
  </nav>
);

export default StickyNav;
