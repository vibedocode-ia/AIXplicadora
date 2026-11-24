#!/usr/bin/env python3
"""
Execução da Task 013 via GPT Astra: Validação de Autonomia & Exercício Gêmeo.
"""

import os
import importlib.machinery

loader = importlib.machinery.SourceFileLoader('omnirouter', '/home/vanderoliver/.local/bin/omnirouter')
omni = loader.load_module()

prompt = """Você é o GPT Astra (OpenAI Codex), especialista em avaliação de competências e didática socrática para o VibeDoCode.
Escreva o arquivo TypeScript de produção para 'services/autonomy-service.ts' da AIXplicadora.

Requisitos Obrigatórios:
1. Função generateTwinChallenge(subject: string, academicLevel: string, originalProblem: string):
   - Gera um exercício gêmeo com rigor equivalente, mesma estrutura de raciocínio mas dados/contexto inéditos.
2. Função evaluateAutonomySolution(params: { originalProblem: string; twinChallenge: string; studentSolution: string; academicLevel: string }):
   - Avalia a resposta do estudante. Verifica se ele aplicou o raciocínio correto sem ajuda de terceiros.
   - Retorna: { isAutonomous: boolean; feedbackMessage: string; masteryLevel: 'introduced' | 'practiced' | 'autonomous' | 'mastered' }
3. Função recordLearningEvidence(params: { userId: string; missionId: string; subject: string; topic: string; demonstratedAutonomy: boolean; hintCount: number }):
   - Persiste a evidência de aprendizagem no banco de dados ou fallback estruturado.

Retorne APENAS o código TypeScript puro, sem blocos de texto fora do código.
"""

print("[*] Chamando GPT Astra para projetar o Serviço de Autonomia e Desafio Gêmeo...")
res = omni.chat_completion(prompt, model="6.2-astra", max_tokens=2200)

clean = res.strip()
if clean.startswith("```typescript"):
    clean = clean[13:]
elif clean.startswith("```ts"):
    clean = clean[5:]
elif clean.startswith("```"):
    clean = clean[3:]

if clean.endswith("```"):
    clean = clean[:-3]

target_path = "/home/vanderoliver/Antigravity/Projetos/01 - Em Andamento/51- AIxplicadora/services/autonomy-service.ts"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(clean.strip() + "\n")

print(f"[✓] services/autonomy-service.ts gravado com sucesso! ({len(clean)} caracteres)")
