#!/usr/bin/env python3
"""
Auditoria Profunda via GPT-6.2 Astra: Confrontação do Sistema AIXplicadora vs PRD.
"""
import os
import sys
import importlib.machinery
import urllib.request

# Patch timeout para modelo de raciocínio profundo
orig_urlopen = urllib.request.urlopen
def patched_urlopen(req, *args, **kwargs):
    if 'timeout' not in kwargs or kwargs['timeout'] < 450:
        kwargs['timeout'] = 450
    return orig_urlopen(req, *args, **kwargs)
urllib.request.urlopen = patched_urlopen

loader = importlib.machinery.SourceFileLoader('omnirouter', '/home/vanderoliver/.local/bin/omnirouter')
omni = loader.load_module()

# Ler trechos chave do PRD e do código
with open("Docs/PRD.md", "r", encoding="utf-8") as f:
    prd_content = f.read()[:15000] # primeiras seções críticas e requisitos

audit_prompt = f"""Você é o GPT Astra (OpenAI Codex), árbitro de arquitetura de software e engenharia reversa do ecossistema VibeDoCode.
O usuário nos chamou com a seguinte queixa legítima:
"vi que o sistema esta pronto, só que nao funciona. Entao, analise e me diga oque aconteceu."

Examinamos a codebase e descobrimos falhas críticas de fiação (wiring), dados mockados e desconexão entre camadas:
1. No Frontend:
   - app/admin/page.tsx: Dashboard 100% mockado em useState local; login rejeita vibedocode@gmail.com porque só aceitava string 'vibedocode'.
   - app/missao/[id]/page.tsx: Não chama a API /api/missions/[id]/interact. Possui um setTimeout com respostas mockadas fixas sobre equação '2x + 5 = 15', ignorando o assunto e o nível acadêmico do usuário!
   - app/professor/page.tsx: Não chama API de IA; possui setTimeout com plano fixo de 'Entropia / Quarto Bagunçado' para qualquer matéria!
   - app/familia/page.tsx: Alunos dependentes são apenas um array estático em useState, sem persistência no banco.
2. No Backend & IA:
   - services/socratic-service.ts e services/autonomy-service.ts: Chamam fetch('https://api.openai.com/v1/chat/completions') exigindo process.env.OPENAI_API_KEY (que NÃO existe no ambiente!), em vez de usar o lib/omniroute.ts configurado.
   - app/api/missions/create/route.ts: Tenta inserir IDs como 'm-123456' e 'guest-123456' em colunas do PostgreSQL tipadas estritamente como UUID, gerando erro de sintaxe SQL silencioso que cancela a gravação.
3. No PRD:
   - O PRD exige cobertura do Ensino Fundamental ao Doutorado, 3 personas ativas (Aluno, Família com Pai-Educador, Professor com Laboratório Didático), Motor Socrático FSM de 5 fases sem alucinação, Desafio Gêmeo de Autonomia e Multimodalidade real.

Com base nisso, faça uma AUDITORIA CIRÚRGICA, PROFUNDA E IMPLACÁVEL respondendo:
1. CONFRONTAÇÃO REALISTA: O que foi cumprido vs o que foi 'fingido/mockado' no sistema atual.
2. CAUSA RAIZ: Explicação técnica exata de por que o sistema 'parece pronto visualmente mas não funciona na prática'.
3. DIAGNÓSTICO DAS 4 GRANDES FALHAS: (A) Desconexão Frontend-Backend, (B) Quebra de Integração com LLM (OpenAI vs OmniRoute), (C) Erro de Tipagem UUID no Banco, (D) Falha de Autenticação e RBAC no Super Admin.
4. PLANO DE AÇÃO PARA TORNAR O SISTEMA 100% FUNCIONAL DE VERDADE: O que precisa ser reescrito e interligado para que o PRD seja cumprido na prática.

Retorne em formato Markdown estruturado, técnico, transparente e em português do Brasil.
"""

print("[*] Disparando auditoria profunda com GPT-6.2 Astra...")
res = omni.chat_completion(audit_prompt, model="6.2-astra", max_tokens=3500)

with open(".agents/scripts/astra_audit_result.md", "w", encoding="utf-8") as out:
    out.write(res)

print("[✓] Auditoria do Astra salva com sucesso em .agents/scripts/astra_audit_result.md")
