"""Regression checks for the Shop dropdown's individual-page destinations."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

DESTINATIONS = {
    'Shop by Cut': '/shop-by-shapes',
    'Bikini': '/product/espresso-brazilian-bikini',
    'French Cut': '/product/mocha-high-waisted',
    'Boy Short': '/product/caramel-boy-short',
    'Slip Dress': '/product/slip-dress',
}

async def check():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for width, height in [(1280, 1800), (797, 729), (390, 844)]:
            page = await browser.new_page(viewport={'width': width, 'height': height})
            await page.goto('http://localhost:8080/shop-by-shapes?cut=brazilian-bikini')
            await page.evaluate("localStorage.setItem('hertones_signup_popup_v2', Date.now().toString()); localStorage.setItem('hertones_popup_submitted_at', Date.now().toString())")
            await page.reload()
            await page.wait_for_timeout(1500)
            for name, target in DESTINATIONS.items():
                if width < 768:
                    await page.locator('nav button').first.click()
                    menu = page.get_by_role('dialog', name='Navigation menu')
                    await menu.get_by_role('button', name='Shop', exact=True).click()
                else:
                    await page.get_by_role('button', name='Shop', exact=True).click()
                    menu = page.locator('nav')
                link = menu.get_by_role('link', name=name, exact=True)
                await link.wait_for(state='visible')
                assert await link.get_attribute('href') == target, (width, name)
                if name == 'Shop by Cut':
                    await page.screenshot(path=f'/tmp/browser/dropdown/menu-{width}.png')
                await link.click()
                await page.wait_for_url('http://localhost:8080' + target)
                await page.wait_for_timeout(450)
                assert await page.locator('h1').count() > 0, (width, name, 'missing page heading')
                print(f'{width}: {name} -> {target} verified')
            await page.screenshot(path=f'/tmp/browser/dropdown/destination-{width}.png')
            await page.close()
        await browser.close()

if __name__ == '__main__':
    asyncio.run(check())
