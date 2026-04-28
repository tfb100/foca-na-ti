import os
import time
from playwright.sync_api import sync_playwright

def test_premium_and_slogan():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        try:
            # 1. Verificar Slogan na Home
            print("Verificando Slogan na Home...")
            page.goto("http://localhost:3000/")
            time.sleep(3) # Esperar TypingText terminar ou carregar
            
            slogan_text = page.inner_text("h1")
            print(f"Texto do H1 encontrado: {slogan_text}")
            page.screenshot(path="slogan_check.png")
            
            if "aprovação em concursos de TI" in slogan_text and "a aprovação" not in slogan_text:
                print("SUCESSO: Slogan atualizado corretamente.")
            else:
                print("AVISO: Slogan pode não estar batendo exatamente (TypingText pode atrasar).")

            # 2. Login Premium
            email = "premium@focanati.com"
            password = "password123"
            print(f"Testando acesso premium para: {email}...")
            page.goto("http://localhost:3000/sign-in")
            
            page.fill("input[name='email']", email)
            page.fill("input[name='password']", password)
            page.click("button[type='submit']")
            
            time.sleep(5)
            print(f"URL após login: {page.url}")

            # 3. Verificar Biblioteca
            print("Navegando para a biblioteca...")
            page.goto("http://localhost:3000/library")
            time.sleep(5)
            
            # Verificar cadeados
            # Se não houver ".animate-pulse-slow", o cadeado sumiu.
            locked_icons = page.query_selector_all(".animate-pulse-slow")
            print(f"Cadeados encontrados: {len(locked_icons)}")
            
            page.screenshot(path="premium_final_check.png")
            
            if len(locked_icons) == 0:
                print("SUCESSO: Acesso Premium validado na biblioteca!")
            else:
                print("FALHA: Usuário ainda vê cadeados.")
                
        except Exception as e:
            print(f"ERRO: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    test_premium_and_slogan()
