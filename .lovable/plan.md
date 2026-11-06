# Foundation Collection: still model, moves on hover

## What changes
- All three model cards (Bikini | Espresso, French Cut | Mocha, Boy Short | Caramel) show a still photo of the model by default.
- When a shopper hovers over a card, the model starts moving (the same front-to-back turn the Bikini card has now). Moving the mouse away pauses it and returns to the still photo.
- Labels, links, "Cotton" badge and layout stay exactly the same.

## Videos for each card
- Bikini | Espresso: use the existing turn video; its still is the current cover image.
- Boy Short | Caramel: use the existing turn video already made for this model (v3), with its matching still.
- French Cut | Mocha: no video exists yet. I'll create a new silent, realistic turn video from the current Mocha model photo, keeping her face and look the same, and use her current photo as the still.

## Phones and tablets (no hover)
- Tapping the image plays the movement; tapping again pauses. A tap on the label/text still opens the product page.

## Speed
- Videos only start downloading when a shopper first hovers/taps (or the card is close on screen), so the page stays fast.

## Technical details
- Add `HoverVideo` component: `<img>` poster layered over a `<video muted loop playsInline preload="none">`; on `pointerenter` set src + `play()`, on `pointerleave` `pause()` + `currentTime=0`, fade poster via opacity. Touch: `onClick` toggles play with `preventDefault` on the media only.
- Update `MODEL_LOOKS` in `ProductShowcase.tsx` to give every look `video` + `poster`.
- Generate French Cut Mocha video, re-encode with ffmpeg (H.264, CRF 25, faststart, no audio) into `public/videos/`, extract poster into `public/images/video-posters/`.
- Verify with Playwright: still on load, playing after hover, paused after leave, on desktop and mobile.
