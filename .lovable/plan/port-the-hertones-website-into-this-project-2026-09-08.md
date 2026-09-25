# Port the Hertones website into this project

## What the repo is

The public repo `hertones/hertones-web-production` is a Vite + React + Tailwind storefront for Hertones (intimates brand): a marketing landing page, a shop with product pages, and a cart powered by the Shopify Storefront API. It cannot be imported directly — Lovable projects use a newer framework (TanStack Start) — so we will recreate it here page by page, copying the real content, styling, and images.

## Pages to recreate

- **Home** (`/`) — main storefront page
- **Collections** (`/collections`) — product grid
- **Shop by Shapes** (`/shop-by-shapes`) — shop by cut/style
- **Product detail** (`/product/$handle`) — image carousel, options (tone/size), add to cart, sticky add-to-cart
- **Slip Dress** (`/product/slip-dress`) — dedicated product page
- **Landing** (`/landing`) — long marketing page: hero, problem/solution, how it works, testimonials, FAQ, offer, footer
- **Privacy Policy, Terms of Service, Shipping & Returns** — legal/info pages
- **Not found** page

## What gets copied over

- All text content, section layouts, and brand styling (colors, fonts, tone palette: Espresso, Chocolate, Mocha, Almond, Caramel, Nude)
- All product and landing images from the repo's assets
- Product catalog data (cuts, tones, pricing helpers)
- Shopping cart (add/remove items, quantity, cart drawer) connected to the same Shopify store checkout, so "buy" buttons work exactly as on the live site
- UI components (buttons, accordions, carousels, etc.) rebuilt with this project's component library

## Technical notes

- Pages will be rebuilt as TanStack Start routes; navigation converted from react-router-dom to TanStack Router.
- Styling converted from Tailwind v3 config to this project's Tailwind v4 theme tokens.
- The Shopify connection uses the store's public storefront key (safe for browser use) — no backend or Lovable Cloud needed.
- Supabase usage in the original is negligible (one minor component); not ported.
- Each content page gets its own SEO title/description metadata.

## Result

A working replica of hertones.com running in this project, with browsing, product pages, cart, and checkout through the existing Shopify store.
