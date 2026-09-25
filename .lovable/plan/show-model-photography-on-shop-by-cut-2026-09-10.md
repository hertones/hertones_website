# Show model photography on Shop by Cut

## What will change
- On the Shop by Cut page, use the exact existing on-site model photo as the main card image when its cut and color match that product.
- Keep the current underwear-only image as the fallback when that exact product does not yet have a model photo.
- Leave product galleries and other shopping pages unchanged.

## Technical details
- Add a shared image lookup that identifies the product’s cut and tone, then selects its first existing on-site model gallery image for that exact cut and color.
- Add an optional model-photo mode to the existing product card and enable it only on Shop by Cut.
- Verify the page on mobile and desktop, including links and fallback images.
