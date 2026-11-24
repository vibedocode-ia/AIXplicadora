# DeepSeek Expert Skill

## Description
Esta skill permite que a Sofia AI Engine (Antigravity) consulte o modelo DeepSeek Reasoner (R1) diretamente via API, ignorando as limitações da interface gráfica.

## Usage
A Sofia invocará esta skill sempre que o usuário:
1. Usar o comando `/deepseek`
2. Pedir uma "análise profunda" ou "raciocínio especializado"
3. Pedir explicitamente para falar com o DeepSeek.

## Mechanism
A skill executa um script Python em `.agent/skills/deepseek-expert/scripts/call_deepseek.py` que se comunica com `https://api.deepseek.com`.

## Response Format
A resposta retornará dois blocos:
- **Reasoning**: O processo de pensamento do DeepSeek.
- **Answer**: A resposta final.
