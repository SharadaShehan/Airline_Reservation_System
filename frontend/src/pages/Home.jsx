import "../styles/home.css";
import { useEffect } from "react";
import Booking from "../components/Booking/Booking";
import { BookingStepGlobalState } from "../components/Layout/BookingStepGlobalState";

export default function Home() {
  const { setBookingStep } = BookingStepGlobalState();
  useEffect(() => {
    setBookingStep("flightSearch");
  }, [setBookingStep]);

  return (
    <div className="homeWrapper">
    </div>
  );
}
