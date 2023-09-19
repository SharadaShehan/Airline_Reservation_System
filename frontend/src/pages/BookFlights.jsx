import Booking from "../components/Booking/Booking";
import { useEffect } from "react";
import { BookingStepGlobalState } from "../components/Layout/BookingStepGlobalState";

export default function BookFlights () {
  const { setBookingStep } = BookingStepGlobalState();
  useEffect(() => {
    setBookingStep("flightSearch");
  }, [setBookingStep]);
  
  return <Booking />;
};

