import re

date_pattern = r'^\d{4}-\d{2}-\d{2}$'
time_pattern = r'^\d{2}:\d{2}$'
tail_number_pattern = r'^[A-Za-z0-9]+-?[A-Za-z0-9]+$'
password_pattern = r'^[A-Za-z0-9@]{4,40}$'
username_pattern = r'^[A-Za-z0-9@_]{3,30}$'
name_pattern = r'^[A-Za-z]{1,30}$'
location_pattern = r'^[A-Za-z0-9 ]{1,20}$'
model_name_pattern = r'^[A-Za-z0-9 -]{4,40}$'
address_pattern = r'^[A-Za-z0-9 -,.]{1,50}$'
email_pattern = r'^[A-Za-z0-9@.]{1,50}$'
contact_number_pattern = r'^[0-9+]{8,16}$'
classes = ['Economy', 'Business', 'Platinum']


def validate_user_data(username, password):
    if isinstance(username, str) and re.match(username_pattern, username):
        if isinstance(password, str) and re.match(password_pattern, password):
            return True
    return False

def validate_booking_data(flightID, travelClass, passengers):
    if isinstance(flightID, int) and flightID > 0:
        if isinstance(travelClass, str) and travelClass in classes:
            if isinstance(passengers, list) and len(passengers) > 0:
                for passenger in passengers:
                    if not isinstance(passenger, dict):
                        return False
                    if not isinstance(passenger['seatNumber'], int) or passenger['seatNumber'] < 1:
                        return False
                    if not isinstance(passenger['firstName'], str) or not re.match(name_pattern, passenger['firstName']):
                        return False
                    if not isinstance(passenger['lastName'], str) or not re.match(name_pattern, passenger['lastName']):
                        return False
                    if not isinstance(passenger['isAdult'], int) or passenger['isAdult'] not in (0, 1):
                        return False
                    if not isinstance(passenger['passportID'], str) or not passenger['passportID'].isalnum():
                        return False
                return True
    return False

def validate_booking_set_id_format(booking_ref_id):
    if isinstance(booking_ref_id, str) and booking_ref_id.isalnum() and len(booking_ref_id) == 12:
        return True
    return False

def validate_guest_id_format(guest_id):
    if isinstance(guest_id, str) and guest_id.isalnum() and len(guest_id) == 12:
        return True
    return False

def validate_payment(booking_ref_id, transaction_id):
    return validate_booking_set_id_format(booking_ref_id)

def validate_search_parameters(from_airport, to_airport, date):
    if isinstance(from_airport, str) and len(from_airport) == 4 and from_airport.isalpha():
        if isinstance(to_airport, str) and len(to_airport) == 4 and to_airport.isalpha():
            if isinstance(date, str) and len(date) == 10 and re.match(date_pattern, date):
                return True
    return False

def validate_user_register_data(username, password, firstname, lastname, passportID, address, birthDate, gender, email, contactNumber):
    if isinstance(username, str) and re.match(username_pattern, username):
        if isinstance(password, str) and re.match(password_pattern, password):
            if isinstance(firstname, str) and re.match(name_pattern, firstname):
                if isinstance(lastname, str) and re.match(name_pattern, lastname):
                    if isinstance(passportID, str) and len(passportID) <= 15 and passportID.isalnum():
                        if isinstance(address, str) and re.match(address_pattern, address):
                            if isinstance(birthDate, str) and re.match(date_pattern, birthDate):
                                if isinstance(gender, str) and len(gender) <= 15:
                                    if isinstance(email, str) and re.match(email_pattern, email):
                                        if isinstance(contactNumber, str) and re.match(contact_number_pattern, contactNumber):
                                            return True
    return False

def validate_staff_register_data(username, password, firstname, lastname):
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

def validate_iata_code(airport_code):
    if isinstance(airport_code, str) and len(airport_code) == 3 and airport_code.isalpha():
        return True
    return False

def validate_airport_data(icao_code, iata_code, location_list):
    if validate_icao_code(icao_code) and validate_iata_code(iata_code):
        if isinstance(location_list, list) and len(location_list) > 0:
            for location in location_list:
                if not isinstance(location, str) or not re.match(location_pattern, location):
                    return False
            return True
    return False

def validate_model_data(model_name, seats_count):
    if isinstance(model_name, str) and re.match(model_name_pattern, model_name) :
        if isinstance(seats_count, dict) and len(seats_count) == 3:
            for travel_class, count in seats_count.items():
                if travel_class not in classes:
                    return False
                if not isinstance(count, int) or count < 0:
                    return False
            return True

def validate_airplane_data(tail_number, model_id):
    if isinstance(tail_number, str) and len(tail_number) >= 4 and re.match(tail_number_pattern, tail_number):
        if isinstance(model_id, int) and model_id > 0:
            return True
    return False

def validate_tail_number(tail_number):
    if isinstance(tail_number, str) and len(tail_number) >= 4 and re.match(tail_number_pattern, tail_number):
        return True
    return False

def validate_model_id(model_id):
    if isinstance(model_id, int) and model_id > 0:
        return True
    return False

def validate_route_id(route_id):
    if isinstance(route_id, int) and route_id > 0:
        return True
    return False

def validate_route_data(origin, destination, duration_minutes, base_price):
    if validate_icao_code(origin) and validate_icao_code(destination):
        if isinstance(duration_minutes, int) and duration_minutes > 0:
            if isinstance(base_price, dict) and len(base_price) > 0:
                for travel_class, price in base_price.items():
                    if travel_class not in classes:
                        return False
                    if not (isinstance(price, float) or isinstance(price, int)) or price < 0:
                        return False
                return True

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

def validate_user_update_data_with_password(firstname, lastname, current_password, new_password, passportID, address, birthDate, gender, email, contactNumber):
    if isinstance(firstname, str) and re.match(name_pattern, firstname):
        if isinstance(lastname, str) and re.match(name_pattern, lastname):
            if isinstance(current_password, str) and re.match(password_pattern, current_password):
                if isinstance(new_password, str) and re.match(password_pattern, new_password):
                    if isinstance(passportID, str) and len(passportID) <= 15 and passportID.isalnum():
                        if isinstance(address, str) and re.match(address_pattern, address):
                            if isinstance(birthDate, str) and re.match(date_pattern, birthDate):
                                if isinstance(gender, str) and len(gender) <= 15:
                                    if isinstance(email, str) and re.match(email_pattern, email):
                                        if isinstance(contactNumber, str) and re.match(contact_number_pattern, contactNumber):
                                            return True
    return False

def validate_user_update_data_without_password(firstname, lastname, passportID, address, birthDate, gender, email, contactNumber):
    if isinstance(firstname, str) and re.match(name_pattern, firstname):
        if isinstance(lastname, str) and re.match(name_pattern, lastname):
            if isinstance(passportID, str) and len(passportID) <= 15 and passportID.isalnum():
                if isinstance(address, str) and re.match(address_pattern, address):
                    if isinstance(birthDate, str) and re.match(date_pattern, birthDate):
                        if isinstance(gender, str) and len(gender) <= 15:
                            if isinstance(email, str) and re.match(email_pattern, email):
                                if isinstance(contactNumber, str) and re.match(contact_number_pattern, contactNumber):
                                    return True
    return False

def validate_staff_update_data_with_password(firstname, lastname, current_password, new_password):
    if isinstance(firstname, str) and re.match(name_pattern, firstname):
        if isinstance(lastname, str) and re.match(name_pattern, lastname):
            if isinstance(current_password, str) and re.match(password_pattern, current_password):
                if isinstance(new_password, str) and re.match(password_pattern, new_password):
                    return True
    return False

def validate_staff_update_data_without_password(firstname, lastname):
    if isinstance(firstname, str) and re.match(name_pattern, firstname):
        if isinstance(lastname, str) and re.match(name_pattern, lastname):
            return True
    return False

def validate_Username(username):
    if isinstance(username, str) and re.match(username_pattern, username):
        return True
    return False

def validate_update_delay_data(flight_id, new_delay):
    if isinstance(flight_id, int) and flight_id > 0:
        if isinstance(new_delay, int) and new_delay >= 0:
            return True
    return False

def validate_contact_number(contact_number):
    if isinstance(contact_number, str) and re.match(contact_number_pattern, contact_number):
        return True
    return False

def validate_email(email):
    if isinstance(email, str) and re.match(email_pattern, email):
        return True
    return False

def validate_seat_search_parameters(flight_id, travel_class):
    if isinstance(flight_id, int) and flight_id > 0:
        if isinstance(travel_class, str) and travel_class in classes:
            return True
    return False