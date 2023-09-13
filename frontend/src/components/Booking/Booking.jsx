import React from 'react';
import { useState } from 'react';
import FlightSearch from './FlightSearch';
import LoginAsk from './LoginAsk';
import SeatReserve from './SeatReserve';
import BookingSuccess from './BookingSuccess';


export default function Booking () {
    const [currentView] = useState('flightSearch');

    const renderPage = () => {
        switch (currentView) {
            case 'flightSearch':
                return <FlightSearch />;
            case 'loginAsk':
                return <LoginAsk />;
            case 'seatReserve':
                return <SeatReserve />;
            case 'bookingSuccess':
                return <BookingSuccess />;
            default:
                return <h1>Not Found</h1>;
        }
    };

    return (
      <>{renderPage()}</>
    );
};
