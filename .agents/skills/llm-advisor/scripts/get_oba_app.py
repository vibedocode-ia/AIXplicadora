import urllib.request
import json

url = "http://187.77.34.1:8000/api/v1/applications"
headers = {
    "Authorization": "Bearer 6|QL9qjStees7Kqu98sY6njGahZbhaZFJSKWvVXkEMe6766691",
    "Accept": "application/json"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        oba_apps = [app for app in data if "OBA" in app.get("name", "")]
        for app in oba_apps:
            print(f"ID: {app.get('id')}")
            print(f"UUID: {app.get('uuid')}")
            print(f"Name: {app.get('name')}")
            print(f"Repository: {app.get('git_repository')}")
            print(f"Branch: {app.get('git_branch')}")
            print(f"FQDN: {app.get('fqdn')}")
            print(f"Webhook/Deploy Endpoint: {app.get('deploy_webhook') or 'None'}")
            print("-" * 40)
except Exception as e:
    print(f"Error: {e}")
