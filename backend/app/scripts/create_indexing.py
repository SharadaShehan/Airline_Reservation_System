from app.scripts.db import get_db_connection
from flask import current_app


def create_indexes():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()

        #------- Create indexes -------
        create_indexes_query = """
            CREATE INDEX idx_scheduled_flight ON scheduled_flight (Route, Airplane, Departure_Time, Delay_Minutes);
            CREATE INDEX idx_registered_user ON registered_user (Category);
            CREATE INDEX idx_booking ON booking (Scheduled_Flight, User, BPrice_Per_Booking, Final_Price, Completed);
            CREATE INDEX idx_booked_seat ON booked_seat (Booking, Seat_Number, FirstName, LastName, IsAdult, Passport_ID);
            CREATE INDEX idx_guest ON guest (Booking_Ref_ID);
        """
        cursor.execute(create_indexes_query, multi=True)

        connection.commit()
        connection.close()
    else:
        raise Exception("Failed to create indexes")


