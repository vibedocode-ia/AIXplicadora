import os
import time
import json
import requests
import argparse

class ManusClient:
    BASE_URL = "https://api.manus.ai/v2"

    def __init__(self, api_key=None):
        if not api_key:
            api_key = self._load_api_key()
        self.api_key = api_key
        self.headers = {
            "Content-Type": "application/json",
            "x-manus-api-key": self.api_key
        }

    def _load_api_key(self):
        # Tenta ler do arquivo Docs ou env
        potential_path = "/home/vanderoliver/Antigravity/Projetos/01 - Em Andamento/28 - Manus/Docs/ApiKey Manus.md"
        if os.path.exists(potential_path):
            with open(potential_path, "r") as f:
                return f.read().strip()
        return os.environ.get("MANUS_API_KEY")

    def create_task(self, prompt):
        url = f"{self.BASE_URL}/task.create"
        payload = {
            "message": {
                "content": prompt
            }
        }
        response = requests.post(url, headers=self.headers, json=payload)
        response.raise_for_status()
        data = response.json()
        if not data.get("ok"):
            raise Exception(f"Erro na criação da tarefa: {data.get('error')}")
        return data["task_id"]

    def get_messages(self, task_id):
        url = f"{self.BASE_URL}/task.listMessages"
        params = {
            "task_id": task_id,
            "order": "desc",
            "limit": 10
        }
        response = requests.get(url, headers=self.headers, params=params)
        response.raise_for_status()
        return response.json()

    def run_until_complete(self, prompt, poll_interval=10):
        print(f"[*] Iniciando tarefa no Manus: {prompt[:50]}...")
        task_id = self.create_task(prompt)
        print(f"[*] Tarefa criada ID: {task_id}")

        # Aguardar um pouco para garantir que a tarefa esteja indexada
        time.sleep(2)

        retry_count = 0
        max_retries = 5

        while True:
            try:
                data = self.get_messages(task_id)
                retry_count = 0 # Reset retry on success
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 404 and retry_count < max_retries:
                    retry_count += 1
                    print(f"[*] Tarefa ainda não indexada (404). Tentativa {retry_count}/{max_retries}...")
                    time.sleep(5)
                    continue
                raise e

            if not data.get("ok"):
                print(f"[!] Erro ao listar mensagens: {data.get('error')}")
                break

            messages = data.get("messages", [])
            if not messages:
                time.sleep(poll_interval)
                continue

            # Procurar a última mensagem de status_update na lista
            status_msg = next((m for m in messages if m.get("type") == "status_update"), None)
            
            if status_msg:
                update = status_msg.get("status_update", {})
                status = update.get("agent_status")
                print(f"[*] Status do Agente: {status}")

                if status == "stopped":
                    # Procurar a última mensagem do assistente para o resultado
                    for msg in messages:
                        if msg.get("type") == "assistant_message":
                            return msg.get("assistant_message", {}).get("content")
                    return "Tarefa concluída, mas nenhum conteúdo de resposta foi encontrado."
                
                if status == "error":
                    error_detail = update.get("error_message", "Erro desconhecido")
                    raise Exception(f"Manus retornou erro: {error_detail}")

                if status == "waiting":
                    detail = update.get("status_detail", {})
                    wait_type = detail.get("waiting_for_event_type")
                    print(f"[!] Agente aguardando: {wait_type} - {detail.get('waiting_description')}")
                    raise Exception(f"Intervenção necessária no Manus: {wait_type}")

            time.sleep(poll_interval)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Manus API Client for Antigravity")
    parser.add_argument("--task", type=str, required=True, help="O prompt para o Manus")
    args = parser.parse_args()

    client = ManusClient()
    try:
        result = client.run_until_complete(args.task)
        print("\n=== RESULTADO DO MANUS ===\n")
        print(result)
        print("\n==========================\n")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
