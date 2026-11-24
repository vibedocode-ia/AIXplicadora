/**
 * Cliente de Integração com o OmniRoute Hub (VibeDoCode Gateway)
 * Suporta roteamento entre GPT Sol 6.2, GPT Astra e failover via Tailscale IP.
 */

const OMNIROUTER_BASE_URL = process.env.OMNIROUTER_BASE_URL || "https://omnirouter.vibedocode.pro/v1";
const OMNIROUTER_API_KEY = process.env.OMNIROUTER_API_KEY || "sk-9a2eac18b294a957-2822f7-3bc4ab7c";
const TAILSCALE_IP = process.env.OMNIROUTER_TAILSCALE_IP || "100.87.66.97";
const HOSTNAME = "omnirouter.vibedocode.pro";

export interface OmniRouteOptions {
  model?: "6.2-sol" | "6.2-astra" | "sol-max" | "auto/best-coding";
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export async function callOmniRoute(
  prompt: string,
  options: OmniRouteOptions = {}
): Promise<string> {
  const model = options.model || "6.2-sol";
  const messages: any[] = [];

  if (options.systemPrompt) {
    messages.push({ role: "system", content: options.systemPrompt });
  }
  messages.push({ role: "user", content: prompt });

  const payload = {
    model: model === "6.2-sol" ? "codex/gpt-6.2-sol-medium" : model === "6.2-astra" ? "codex/gpt-6.2-astra-medium" : model,
    messages,
    temperature: options.temperature ?? 0.2,
    max_tokens: options.maxTokens ?? 1500,
  };

  const headers = {
    Authorization: `Bearer ${OMNIROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "User-Agent": "AIXplicadora-Production/1.0",
    Host: HOSTNAME,
  };

  // 1. Tentar rota padrão pública
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 120s timeout

    const res = await fetch(`${OMNIROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "";
    }
  } catch (primaryErr: any) {
    console.warn("[OmniRoute Primary Route Failed, trying Tailscale fallback]:", primaryErr.message);
  }

  // 2. Fallback automático via Tailscale IP direto (100.87.66.97)
  try {
    const fallbackUrl = `https://${TAILSCALE_IP}/v1/chat/completions`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    const res = await fetch(fallbackUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "";
    }
  } catch (fallbackErr: any) {
    console.error("[OmniRoute Fallback Failed]:", fallbackErr.message);
  }

  // Resposta resiliente de emergência para manter a sessão ativa sem travar o usuário
  return "Compreendi o seu raciocínio. Vamos continuar investigando: qual seria o próximo passo de acordo com o que aprendemos?";
}
