import React from 'react';
import { BookingStepGlobalState } from '../../Layout/BookingStepGlobalState';
import { UserMenuGlobalState } from '../../Layout/UserMenuGlobalState';


export default function PendingPayments () {
    const { setBookingStep } = BookingStepGlobalState();
    const { setUserMenuItem } = UserMenuGlobalState();

    const handlePayNow = () => {
      setBookingStep('makePayment'); 
      setUserMenuItem('book-flights');
    };

    return (
      <>
        <h1>Pending Payments View</h1>
        <div>
              <button className='navigateBtn' onClick={handlePayNow}>Pay For Selected Booking</button>
        </div>
      </>
    );
};
