import os
import json
import requests
import sys

def call_deepseek(prompt, model="deepseek-reasoner"):
    api_key = "sk-dbf2e2c02fa747caae2405d6534cf959"  # Chave nova atualizada
    url = "https://api.deepseek.com/chat/completions"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": "Você é um assistente especialista que fornece respostas profundas e detalhadas."},
            {"role": "user", "content": prompt}
        ],
        "stream": False
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=60)
        response.raise_for_status()
        result = response.json()
        
        # O Reasoner retorna o conteúdo em 'content'
        # e o raciocínio em 'reasoning_content' se disponível
        content = result['choices'][0]['message'].get('content', '')
        reasoning = result['choices'][0]['message'].get('reasoning_content', '')
        
        return {
            "content": content,
            "reasoning": reasoning
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Prompt não fornecido"}))
        sys.exit(1)
        
    user_prompt = sys.argv[1]
    output = call_deepseek(user_prompt)
    print(json.dumps(output, indent=2, ensure_ascii=False))
