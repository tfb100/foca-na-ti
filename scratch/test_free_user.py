import os
import asyncio
from playwright.async_api import async_playwright

async def run_test():
    async with async_playwright() as p:
        # Usar o Chrome local instalado
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        print("Navegando para a biblioteca como VISITANTE (Free)...")
        await page.goto("http://localhost:3000/library")
        await page.wait_for_timeout(3000)

        # Contar cards premium visíveis
        premium_cards = await page.query_selector_all(".animate-pulse-slow") # Cadeado tem essa classe
        print(f"Cadeados encontrados (Visitante): {len(premium_cards)}")
        
        # Tirar print
        await page.screenshot(path="free_user_check.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_test())
