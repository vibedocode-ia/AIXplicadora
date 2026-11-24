#!/usr/bin/env python3
"""
Execução da Task 012 via GPT Astra: Motor Socrático e FSM de Missão.
"""

import os
import importlib.machinery

loader = importlib.machinery.SourceFileLoader('omnirouter', '/home/vanderoliver/.local/bin/omnirouter')
omni = loader.load_module()

prompt = """Você é o GPT Astra (OpenAI Codex), especialista em lógica socrática e arquitetura de software para o VibeDoCode.
Escreva o arquivo TypeScript de produção para 'services/socratic-service.ts' da AIXplicadora.

Requisitos Obrigatórios:
1. Enum / Union de Estados da FSM:
   'INITIALIZING' | 'DIAGNOSING' | 'CHALLENGING' | 'HINTING' | 'VERIFYING' | 'AUTONOMY_CHECK' | 'COMPLETED' | 'PAUSED'
2. Prompts Socráticos Especializados para os 3 perfis:
   - STUDENT: Ajusta linguagem do Fundamental I ao Doutorado, nunca dá a resposta final, faz perguntas orientadoras.
   - PARENT: Ensina o pai/mãe a didática de como explicar para a criança em casa com analogias.
   - TEACHER: Auxilia com metodologias ativas e roteiros socráticos para turmas.
3. Função generateSocraticGuidance(params: { academicLevel: string; role: string; subject: string; userMessage: string; hintLevel: number; currentState: string })
4. Função processSocraticStep(params: { missionId: string; userResponse: string; requestHint: boolean; currentHintCount: number; currentState: string; academicLevel: string; role: string; subject: string })
   Retorna: { nextState: string; aiMessage: string; newHintCount: number; isAutonomyReady: boolean }

Retorne APENAS o código TypeScript puro, sem textos introdutórios ou comentários desnecessários fora do código.
"""

print("[*] Chamando GPT Astra para projetar o Motor Socrático...")
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

target_path = "/home/vanderoliver/Antigravity/Projetos/01 - Em Andamento/51- AIxplicadora/services/socratic-service.ts"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(clean.strip() + "\n")

print(f"[✓] services/socratic-service.ts gravado com sucesso! ({len(clean)} caracteres)")
