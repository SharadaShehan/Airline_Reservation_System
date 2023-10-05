import React from 'react';
import FlightSearch from './FlightSearch';
import LoginAsk from './LoginAsk';
import SeatReserve from './SeatReserve';
import BookingSuccess from './BookingSuccess';
import MakePayment from './MakePayment';
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';


export default function Booking () {
    const { bookingStep } = BookingStepGlobalState();

    const renderPage = () => {
        switch (bookingStep) {
            case null:
                return <FlightSearch />;
            case 'flightSearch':
                return <FlightSearch />;
            case 'loginAsk':
                return <LoginAsk />;
            case 'seatReserve':
                return <SeatReserve />;
            case 'makePayment':
                return <MakePayment />;
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
