
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

