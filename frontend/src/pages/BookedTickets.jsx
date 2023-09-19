import { useEffect } from "react";
import { BookingStepGlobalState } from "../components/Layout/BookingStepGlobalState";


export default function BookedTickets () {
  const { setBookingStep } = BookingStepGlobalState();
  useEffect(() => {
    setBookingStep("flightSearch");
  }, [setBookingStep]);
  
  return <h1>BookedTickets Page</h1>;
};
  

