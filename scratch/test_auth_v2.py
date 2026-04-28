import os
from playwright.sync_api import sync_playwright

def test_auth_full():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        try:
            # 1. Sign Up
            print("Passo 1: Cadastro...")
            page.goto("http://localhost:3000/sign-up")
            email = "test_" + os.urandom(4).hex() + "@example.com"
            password = "password123"
            page.fill("input[name='fullName']", "Test User")
            page.fill("input[name='email']", email)
            page.fill("input[name='password']", password)
            page.click("button[type='submit']")
            
            page.wait_for_timeout(5000)
            print(f"URL após cadastro: {page.url}")
            
            # Se logou direto, vamos deslogar para testar o login
            if "Logout" in page.content():
                print("Logado automaticamente. Deslogando...")
                page.click("text=Logout")
                page.wait_for_timeout(3000)
                print(f"URL após logout: {page.url}")

            # 2. Sign In
            print("Passo 2: Login...")
            page.goto("http://localhost:3000/sign-in")
            page.wait_for_load_state("networkidle")
            
            print(f"Tentando login com: {email}")
            page.fill("input[name='email']", email)
            page.fill("input[name='password']", password)
            page.click("button[type='submit']")
            
            page.wait_for_timeout(5000)
            print(f"URL final: {page.url}")
            page.screenshot(path="auth_success_final.png")
            
            if "Logout" in page.content() or email in page.content():
                print("✅ SUCESSO: Cadastro, Logout e Login funcionando perfeitamente!")
            else:
                print("❌ FALHA: O login não parece ter funcionado.")
                
        except Exception as e:
            print(f"❌ ERRO: {e}")
            page.screenshot(path="auth_error_final.png")
        finally:
            browser.close()

if __name__ == "__main__":
    test_auth_full()
