import requests
import json
import time

api_key = "AIzaSyDQqwYLwVp5QoMcfkaaLtXApHWUYtluWtI"

test_cases = [
    ("v1beta", "gemini-2.0-flash"),
    ("v1beta", "gemini-1.5-flash"),
    ("v1beta", "gemini-1.5-pro"),
    ("v1", "gemini-1.5-flash"),
    ("v1", "gemini-pro"),
]

prompt = {
    "contents": [{
        "parts": [{"text": "Hello, simply say 'Connected'."}]
    }]
}

print("Starting API Connectivity Tests...\n")

for version, model in test_cases:
    url = f"https://generativelanguage.googleapis.com/{version}/models/{model}:generateContent?key={api_key}"
    print(f"Testing {model} ({version})...")
    
    try:
        response = requests.post(url, headers={"Content-Type": "application/json"}, json=prompt)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print("SUCCESS: " + response.text[:100] + "...")
        else:
            error_msg = response.json().get('error', {}).get('message', 'Unknown error')
            print(f"FAILED: {error_msg}")
    except Exception as e:
        print(f"EXCEPTION: {e}")
    
    print("-" * 40)
    time.sleep(1)
