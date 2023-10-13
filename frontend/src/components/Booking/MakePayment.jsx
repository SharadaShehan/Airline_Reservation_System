import React from 'react';
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';

export default function MakePayment () {
    const { setBookingStep } = BookingStepGlobalState();

    function handlePayNow() {
      setBookingStep('bookingSuccess');
    }

    return (
      <>
        <h1>Make Payment View</h1>
        <div>
              <button className='navigateBtn' onClick={handlePayNow}>Pay Now</button>
        </div>
      </>
    );
};
