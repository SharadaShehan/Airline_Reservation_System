import re

date_pattern = r'^\d{4}-\d{2}-\d{2}$'


def validate_user_data(data):
    return True

def validate_booking_data(flightID, travelClass, passengers):
    if isinstance(flightID, int) and flightID > 0:
        if isinstance(travelClass, str) and travelClass in ['Economy', 'Business', 'First']:
            if isinstance(passengers, list) and len(passengers) > 0:
                for passenger in passengers:
                    if not isinstance(passenger, dict):
                        return False
                    if not isinstance(passenger['seatNumber'], int) or passenger['seatNumber'] < 1:
                        return False
                    if not isinstance(passenger['firstName'], str) or len(passenger['firstName']) == 0:
                        return False
                    if not isinstance(passenger['lastName'], str) or len(passenger['lastName']) == 0:
                        return False
                    if not isinstance(passenger['isAdult'], bool):
                        return False
                return True
    return False

def validate_booking_set_id_format(booking_ref_id):
    if isinstance(booking_ref_id, str) and len(booking_ref_id) == 12:
        return True

def validate_payment(booking_ref_id, transaction_id):
    return validate_booking_set_id_format(booking_ref_id)

def validate_search_parameters(from_airport, to_airport, date):
    if isinstance(from_airport, str) and len(from_airport) == 4 and from_airport.isalpha():
        if isinstance(to_airport, str) and len(to_airport) == 4 and to_airport.isalpha():
            if isinstance(date, str) and len(date) == 10 and re.match(date_pattern, date):
                return True
    return False

def validate_user_register_data(username, password, firstname, lastname):
    if isinstance(username, str) and len(username) > 0 and len(username) <= 30:
        if isinstance(password, str) and len(password) > 0 and len(password) <= 40:
            if isinstance(firstname, str) and len(firstname) > 0 and len(firstname) <= 30:
                if isinstance(lastname, str) and len(lastname) > 0 and len(lastname) <= 30:
                    return True
    return False
