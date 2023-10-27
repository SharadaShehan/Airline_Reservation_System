import { useEffect } from "react";
import { UserGlobalState } from "../components/Layout/UserGlobalState";
import { BookingStepGlobalState } from "../components/Layout/BookingStepGlobalState";
import UserBookedTickets from "../components/BookedTickets/UserBookedTickets";
import GuestLandingPage from "../components/BookedTickets/GuestLandingPage";
import Default from "../components/BookedTickets/Default";
import "../styles/bookedTickets.css";
import Cookies from "js-cookie";

export default function BookedTickets() {
  const { currentUserData } = UserGlobalState();
  const { setBookingStep } = BookingStepGlobalState();

  const guestID = Cookies.get("guest-id");

  useEffect(() => {
    setBookingStep("flightSearch");
  }, [setBookingStep]);

  return (
    <div className="wrapper">
      <img
        className="background-image"
        alt="Rectangle"
        loading="lazy"
        src={require("../images/booked-Tickets-2.jpg")}
      />
      <div className="bookedTicketsPage-container">
        {renderPage(currentUserData, guestID)}
      </div>
    </div>
  );
}

function renderPage(userData, guestID) {
  if (userData.username !== null && userData.role === undefined) {
    return <UserBookedTickets userData={userData} />;
  } else if (guestID) {
    return <GuestLandingPage userData={userData}/>;
  } else {
    return <Default />;
  }
}
