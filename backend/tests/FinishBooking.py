import requests
import json
from GetAuthToken import get_access_token


def complete_booking():

    data = {
        'transactionID' : 'N8J5FG7UNJIO8TFB'
    }

    booking_ref_id = '5NKKVE2UT8G9'
    url = f'http://127.0.0.1:5000/api/booking/complete/{booking_ref_id}'

    response = requests.post(url, json=data)

    if response.status_code == 200:
        print("Booking completed successfully")
    else:
        print(f"Error: {response.json()}")




def guest_cancel_booking():

    booking_ref_id = 'KRSC5GIYZRKB'
    url = f'http://127.0.0.1:5000/api/booking/cancel/guest/{booking_ref_id}'

    response = requests.delete(url)

    if response.status_code == 204:
        print("Booking cancelled successfully")
    else:
        print(f"Error: {response.json()}")



def user_cancel_booking():
    
    booking_ref_id = 'KRSC5GIYZRKB'
    url = f'http://127.0.0.1:5000/api/booking/cancel/user/{booking_ref_id}'

    with open('token.json', 'r') as file:
        access_token = json.load(file).get('access_token')
    headers = { 'Authorization': f'Bearer {access_token}' }

    return requests.delete(url, headers=headers)


# response = user_cancel_booking()

# if response.status_code == 204:
#     print("Booking cancelled successfully")
# elif response.status_code == 401:
#     if get_access_token():
#         response = user_cancel_booking()
#         if response.status_code == 204:
#             print("Booking cancelled successfully")
#         else:
#             print('DELETE request failed with status code:', response.status_code)
#     else:
#         print("Invalid username or password")
# else:
#     print('DELETE request failed with status code:', response.status_code)
#     print(response.json()['message'])

guest_cancel_booking()

# complete_booking()