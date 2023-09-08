import requests
import json


def get_access_token():
    url = 'http://127.0.0.1:5000/api/user/auth'

    data = {
        'username': 'SamC',
        'password': 'k8p3rW'
    }

    response = requests.post(url, json=data)

    if response.status_code == 200:
        data = response.json()
        access_token = data.get('access_token')
        with open('token.json', 'w') as file:
            json.dump({'access_token': access_token}, file)
        return True
    else:
        return False
