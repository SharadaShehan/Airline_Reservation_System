import Booking from "../components/Booking/Booking";
import { useEffect } from "react";
import { BookingStepGlobalState } from "../components/Layout/BookingStepGlobalState";

export default function BookFlights () {
  const { bookingStep, setBookingStep } = BookingStepGlobalState();
  useEffect(() => {
    if (bookingStep !== "makePayment") {
      setBookingStep("flightSearch");
    };
  }, [setBookingStep, bookingStep]);
  
  return <Booking />;
};

