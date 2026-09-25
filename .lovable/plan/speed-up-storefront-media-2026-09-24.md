# Speed up storefront media

## Goal
Make the homepage feel faster while keeping the same photos, videos, layout, and visual quality.

## Changes
- Prioritize the first hero image and defer the remaining slideshow images until after the first view is ready.
- Stop below-the-fold videos from downloading and playing before they approach the viewport; use lightweight poster images until then.
- Remove duplicate media downloads in the reviews carousel and lazy-load its supporting thumbnails.
- Add explicit image dimensions and decoding hints where missing to reduce layout shifts and main-thread delay.
- Optimize oversized homepage photo and video files into smaller web-ready versions while preserving their current public paths and appearance.

## Verification
- Compare homepage media requests before and after the changes on desktop and mobile.
- Confirm the slideshow, model video, reviews carousel, popup, and product links still work.
- Confirm the storefront builds without errors.

## Technical details
- Use browser-native lazy loading, `IntersectionObserver`, `preload="none"` for deferred videos, one high-priority LCP image, and compressed WebP/JPEG/MP4 assets as appropriate.
- Keep all media local under `public/images/` and `public/videos/`; no external media URLs will be introduced.
