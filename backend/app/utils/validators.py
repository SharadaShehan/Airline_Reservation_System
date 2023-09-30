import re

date_pattern = r'^\d{4}-\d{2}-\d{2}$'
time_pattern = r'^\d{2}:\d{2}$'
tail_number_pattern = r'^[A-Za-z0-9]+-?[A-Za-z0-9]+$'
password_pattern = r'^[A-Za-z0-9@]{4,40}$'
username_pattern = r'^[A-Za-z0-9@_]{3,30}$'
name_pattern = r'^[A-Za-z]{1,30}$'


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
    if isinstance(booking_ref_id, str) and booking_ref_id.isalnum() and len(booking_ref_id) == 12:
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
    if isinstance(username, str) and re.match(username_pattern, username):
        if isinstance(password, str) and re.match(password_pattern, password):
            if isinstance(firstname, str) and re.match(name_pattern, firstname):
                if isinstance(lastname, str) and re.match(name_pattern, lastname):
                    return True
    return False

def validate_origin_destination_parameters(from_airport, to_airport):
    if isinstance(from_airport, str) and len(from_airport) == 4 and from_airport.isalpha():
        if isinstance(to_airport, str) and len(to_airport) == 4 and to_airport.isalpha():
            return True
    return False

def validate_flight_id(flight_id):
    if isinstance(flight_id, int) and flight_id > 0:
        return True
    return False

def validate_icao_code(airport_code):
    if isinstance(airport_code, str) and len(airport_code) == 4 and airport_code.isalpha():
        return True
    return False

def validate_date(date):
    if isinstance(date, str) and len(date) == 10 and re.match(date_pattern, date):
        return True
    return False

def validate_date_range(from_date, to_date):
    if validate_date(from_date) and validate_date(to_date):
        return True
    return False

def validate_scheduling_data(route, airplane, departure_date, departure_time):
    if isinstance(route, int) and route > 0:
        if isinstance(airplane, str) and len(airplane) >= 4 and re.match(tail_number_pattern, airplane):
            if isinstance(departure_date, str) and len(departure_date) == 10 and re.match(date_pattern, departure_date):
                if isinstance(departure_time, str) and len(departure_time) == 5 and re.match(time_pattern, departure_time):
                    return True
    return False

def validate_user_update_data_with_password(firstname, lastname, current_password, new_password):
    if isinstance(firstname, str) and re.match(name_pattern, firstname):
        if isinstance(lastname, str) and re.match(name_pattern, lastname):
            if isinstance(current_password, str) and re.match(password_pattern, current_password):
                if isinstance(new_password, str) and re.match(password_pattern, new_password):
                    return True
    return False

def validate_user_update_data_without_password(firstname, lastname):
    if isinstance(firstname, str) and re.match(name_pattern, firstname):
        if isinstance(lastname, str) and re.match(name_pattern, lastname):
            return True
    return False

def validate_Username(username):
    if isinstance(username, str) and re.match(username_pattern, username):
        return True
    return False