import requests
import json
import time

api_key = "AIzaSyDQqwYLwVp5QoMcfkaaLtXApHWUYtluWtI"

test_cases = [
    ("v1beta", "gemini-2.5-flash"), 
    ("v1beta", "gemini-2.5-pro"),
    ("v1beta", "gemini-2.0-flash"), 
]

prompt = {
    "contents": [{
        "parts": [{"text": "Hello"}]
    }]
}

output_file = "specific_results.txt"

with open(output_file, "w", encoding="utf-8") as f:
    f.write("Starting Specific Model Tests...\n\n")

    for version, model in test_cases:
        url = f"https://generativelanguage.googleapis.com/{version}/models/{model}:generateContent?key={api_key}"
        msg = f"Testing {model} ({version})..."
        print(msg)
        f.write(msg + "\n")
        
        try:
            response = requests.post(url, headers={"Content-Type": "application/json"}, json=prompt)
            status_msg = f"Status: {response.status_code}"
            f.write(status_msg + "\n")
            
            if response.status_code == 200:
                success_msg = "SUCCESS: " + response.text[:100] + "..."
                f.write(success_msg + "\n")
            else:
                error_msg = response.json().get('error', {}).get('message', 'Unknown error')
                fail_msg = f"FAILED: {error_msg}"
                f.write(fail_msg + "\n")
        except Exception as e:
            exc_msg = f"EXCEPTION: {e}"
            f.write(exc_msg + "\n")
        
        f.write("-" * 40 + "\n")
        time.sleep(1)
