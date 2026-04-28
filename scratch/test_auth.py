import os
from playwright.sync_api import sync_playwright

def test_auth():
    with sync_playwright() as p:
        # Launch browser in headless mode
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        try:
            print("Navegando para a página de cadastro...")
            page.goto("http://localhost:3000/sign-up")
            page.wait_for_load_state("networkidle")
            
            # Tentar cadastrar um usuário de teste
            email = "test_user_" + os.urandom(4).hex() + "@example.com"
            password = "password123"
            full_name = "Test Bot"
            
            print(f"Tentando cadastrar: {email}")
            page.fill("input[name='fullName']", full_name)
            page.fill("input[name='email']", email)
            page.fill("input[name='password']", password)
            page.click("button[type='submit']")
            
            # Esperar por feedback ou redirecionamento
            page.wait_for_timeout(5000)
            
            print("Verificando se fomos para a página de login ou dashboard...")
            current_url = page.url
            print(f"URL atual: {current_url}")
            
            # Se ainda estiver na página de sign-up ou deu erro, tentar login direto
            if "/sign-up" in current_url:
                print("Cadastro pode ter falhado ou requer confirmação. Tentando login...")
                page.goto("http://localhost:3000/sign-in")
            
            # Teste de Login
            print("Navegando para a página de login...")
            page.goto("http://localhost:3000/sign-in")
            page.wait_for_load_state("networkidle")
            
            print("Preenchendo formulário de login...")
            page.fill("input[name='email']", email)
            page.fill("input[name='password']", password)
            page.click("button[type='submit']")
            
            # Esperar redirecionamento
            page.wait_for_timeout(5000)
            
            print(f"URL final após login: {page.url}")
            page.screenshot(path="auth_test_result.png")
            
            if page.url == "http://localhost:3000/" or "/profile" in page.url or "/library" in page.url:
                print("SUCESSO: Autenticação realizada!")
            else:
                print("FALHA: Não houve redirecionamento esperado.")
                
        except Exception as e:
            print(f"ERRO durante o teste: {e}")
            page.screenshot(path="auth_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    test_auth()
