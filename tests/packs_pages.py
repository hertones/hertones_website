"""Regression checks for the Packs page and pack product pages.

Rules under test (from the packs brief):
- /packs shows all three packs with name, badge, title, price, and a
  "Choose Your Cut" button; clicking a card goes to /pack/<handle>.
- /pack/<handle> requires exactly one cut before pre-order: the button is
  disabled until a cut is chosen, and clicking it anyway shows
  "Please choose a cut to continue."
- Selecting a cut swaps the gallery image to that cut.
"""
import asyncio
from playwright.async_api import async_playwright

PACKS = [
    ('3-Pack', '17% Off', '3 Pack Cotton Essentials', '$42', '3-pack'),
    ('6-Pack', '25% Off', '6 Pack Foundation Set', '$76', '6-pack'),
    ('12-Pack', 'Best Value', '12 Pack The Full Kit', '$168', '12-pack'),
]
CUTS = ['Bikini', 'French Cut', 'Boy Short']


async def check():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for width, height in [(1280, 1800), (390, 844)]:
            page = await browser.new_page(viewport={'width': width, 'height': height})
            await page.goto('http://localhost:8080/packs')
            await page.evaluate("localStorage.setItem('hertones_signup_popup_v2', Date.now().toString()); localStorage.setItem('hertones_popup_submitted_at', Date.now().toString())")
            await page.reload()
            await page.wait_for_timeout(1200)

            # All three packs render with name, badge, title, price, CTA.
            for name, badge, title, price, handle in PACKS:
                card = page.locator('a', has_text=title).first
                text = await card.inner_text()
                for expected in (name, badge.upper(), title.upper(), price, 'CHOOSE YOUR CUT'):
                    assert expected.upper() in text.upper(), (width, name, expected, text)

            # Card click navigates to the pack product page.
            await page.locator('a', has_text='3 Pack Cotton Essentials').first.click()
            await page.wait_for_url('http://localhost:8080/pack/3-pack')
            await page.wait_for_timeout(800)

            # Cut selector: three radio tiles, none selected by default.
            group = page.get_by_role('radiogroup', name='Choose your cut')
            radios = group.get_by_role('radio')
            assert await radios.count() == 3, (width, 'cut count')
            for i, cut in enumerate(CUTS):
                assert cut in await radios.nth(i).inner_text(), (width, cut)
                assert await radios.nth(i).get_attribute('aria-checked') == 'false', (width, cut)

            # Pre-order blocked until a cut is chosen.
            cta = page.get_by_role('button', name='Choose Your Cut').last
            assert await cta.is_disabled(), (width, 'cta should start disabled')

            # Selecting a cut enables pre-order and swaps the gallery image.
            await radios.nth(1).click()  # French Cut
            assert await radios.nth(1).get_attribute('aria-checked') == 'true', (width, 'french cut selected')
            cta = page.locator('button', has_text='Pre-Order Now').last
            assert await cta.is_enabled(), (width, 'cta should enable after cut')
            await page.wait_for_timeout(400)
            gallery_src = await page.locator('section img').first.get_attribute('src')
            assert 'french-cut' in gallery_src, (width, 'gallery did not swap', gallery_src)
            assert 'All pieces in your pack come in your chosen cut.' in await page.locator('section').first.inner_text(), (width, 'helper line')

            # Radio behavior: only one cut selectable at a time.
            await radios.nth(2).click()  # Boy Short
            assert await radios.nth(2).get_attribute('aria-checked') == 'true', (width, 'boy short selected')
            assert await radios.nth(1).get_attribute('aria-checked') == 'false', (width, 'french cut deselected')
            await page.wait_for_timeout(400)
            gallery_src = await page.locator('section img').first.get_attribute('src')
            assert 'boy-short' in gallery_src, (width, 'gallery did not swap to boy short', gallery_src)

            # Nav Packs link goes to /packs.
            if width < 768:
                await page.locator('nav button').filter(has=page.locator('svg.lucide-menu')).click()
                menu = page.get_by_role('dialog', name='Navigation menu')
                await menu.locator('button', has_text='Packs').first.click()
            else:
                await page.get_by_role('link', name='Packs', exact=True).first.click()
            await page.wait_for_url('http://localhost:8080/packs')
            print(f'{width}: packs page, cut gating, gallery swap, nav link verified')
            await page.close()
        await browser.close()


if __name__ == '__main__':
    asyncio.run(check())
