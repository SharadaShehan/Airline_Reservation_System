import React from "react";
import FlightSearch from "./FlightSearch";
import LoginAsk from "./LoginAsk";
import SeatReserve from "./SeatReserve";
import BookingSuccess from "./BookingSuccess";
import MakePayment from "./MakePayment";
import UserLoginForm from "./../Profile/Authentication/UserLoginForm";
import BookingDetails from "./BookingDetails";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import "./booking.css";

export default function Booking() {
  const { bookingStep } = BookingStepGlobalState();
  const renderPage = () => {
    switch (bookingStep) {
      case null:
        return <FlightSearch />;
      case "flightSearch":
        return <FlightSearch />;
      case "loginAsk":
        return <LoginAsk />;
      case "seatReserve":
        return <SeatReserve />;
      case "bookingDetails":
        return <BookingDetails />;
      case "makePayment":
        return <MakePayment />;
      case "bookingSuccess":
        return <BookingSuccess />;
      case "userLogin":
        return <UserLoginForm />;
      default:
        return <h1>Not Found</h1>;
    }
  };

  return (
    <div className="wrapper">
      <img
        className="background-image"
        alt="Rectangle"
        src={require("../../images/BookingBackImage.jpg")}
      />
      <div className="booking-container">{renderPage()}</div>
    </div>
  );
}
