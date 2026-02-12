import requests
import json

api_key = "AIzaSyDQqwYLwVp5QoMcfkaaLtXApHWUYtluWtI"
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"

try:
    response = requests.get(url)
    if response.status_code == 200:
        models = response.json().get('models', [])
        for model in models:
            if 'generateContent' in model.get('supportedGenerationMethods', []):
                print(model['name'])
    else:
        print(f"Error: {response.status_code} - {response.text}")
except Exception as e:
    print(f"Exception: {e}")
