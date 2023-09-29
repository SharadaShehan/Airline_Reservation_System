import requests
import json
from GetAuthToken import get_access_token


data = {
        "flightID": 45,
        "travelClass": "Economy",
        "passengers": [
            {
                "seatNumber": 31,
                "firstName": "John",
                "lastName": "Doe",
                "isAdult": True
            },
            {
                "seatNumber": 32,
                "firstName": "Jane",
                "lastName": "Doe",
                "isAdult": True
            },
            {
                "seatNumber": 33,
                "firstName": "Baby",
                "lastName": "Doe",
                "isAdult": False
            }
        ]
}


def guest_create_booking():
    global data
    url = 'http://127.0.0.1:5000/api/booking/create/guest'

    response = requests.post(url, json=data)

    if response.status_code == 201:
        data = response.json()
        bookingRefID = data.get('bookingRefID')
        price = data.get('price')
        print(f"Booking created successfully. Booking Ref ID: {bookingRefID}. Price: {price}")
    else:
        print(f"Error: {response.json()}")


def user_create_booking():
    global data
    url = 'http://127.0.0.1:5000/api/booking/create/user'

    with open('token.json', 'r') as file:
        access_token = json.load(file).get('access_token')
    headers = { 'Authorization': f'Bearer {access_token}' }

    return requests.post(url, json=data, headers=headers)


# response = user_create_booking()

# if response.status_code == 201:
#     data = response.json()
#     bookingRefID = data.get('bookingRefID')
#     price = data.get('price')
#     print(f"Booking created successfully. Booking Ref ID: {bookingRefID}. Price: {price}")
# elif response.status_code == 401:
#     if get_access_token():
#         response = user_create_booking()
#         if response.status_code == 201:
#             data = response.json()
#             bookingRefID = data.get('bookingRefID')
#             price = data.get('price')
#             print(f"Booking created successfully. Booking Ref ID: {bookingRefID}. Price: {price}")
#         else:
#             print('POST request failed with status code:', response.status_code)
#     else:
#         print("Invalid username or password")
# else:
#     print('POST request failed with status code:', response.status_code)
#     print(response.json()['message'])

guest_create_booking()

