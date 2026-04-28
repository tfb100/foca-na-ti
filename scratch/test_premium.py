import os
from playwright.sync_api import sync_playwright

def test_premium_access():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        try:
            email = "premium@focanati.com"
            password = "password123"

            # 1. Login
            print(f"Testando acesso premium para: {email}...")
            page.goto("http://localhost:3000/sign-in")
            page.wait_for_load_state("networkidle")
            
            page.fill("input[name='email']", email)
            page.fill("input[name='password']", password)
            page.click("button[type='submit']")
            
            page.wait_for_timeout(5000)
            print(f"URL após login: {page.url}")

            # 2. Verificar Biblioteca
            print("Navegando para a biblioteca...")
            page.goto("http://localhost:3000/library")
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(3000) # Esperar renderizar cards
            
            # Verificar se existem cadeados pulsantes (classe que indica bloqueio)
            # No summary-card.tsx vimos: isLocked ? "bg-amber-500 text-black border-amber-600 animate-pulse-slow"
            locked_icons = page.query_selector_all(".animate-pulse-slow")
            
            print(f"Cadeados encontrados: {len(locked_icons)}")
            page.screenshot(path="premium_test_result.png")
            
            if len(locked_icons) == 0:
                print("✅ SUCESSO: Nenhum conteúdo está bloqueado para o usuário Premium!")
            else:
                print(f"❌ FALHA: Ainda existem {len(locked_icons)} itens bloqueados.")
                
        except Exception as e:
            print(f"❌ ERRO: {e}")
            page.screenshot(path="premium_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    test_premium_access()
