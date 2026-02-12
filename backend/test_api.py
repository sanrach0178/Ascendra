import requests
import json

url = 'http://localhost:8080/api/analyze'
files = {'file': ('test_resume.pdf', open('test_resume.pdf', 'rb'), 'application/pdf')}
data = {
    'jobRole': 'Frontend Developer',
    'companies': json.dumps(['Google', 'Amazon'])
}

try:
    response = requests.post(url, files=files, data=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
