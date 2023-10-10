import { useEffect } from "react";
import { BookingStepGlobalState } from "../components/Layout/BookingStepGlobalState";
import "../styles/bookedTickets.css";


export default function BookedTickets () {
  const { setBookingStep } = BookingStepGlobalState();
  useEffect(() => {
    setBookingStep("flightSearch");
  }, [setBookingStep]);
  
  return (
    <div className='wrapper'>
      <img
        className='background-image'
        alt='Rectangle'
        src={require('../images/BookedTicketsPageBackImage.jpg')} />
      <div className='bookedTicketsPage-container'>

        {/* add content here */}

      </div>
    </div>
  );
};


