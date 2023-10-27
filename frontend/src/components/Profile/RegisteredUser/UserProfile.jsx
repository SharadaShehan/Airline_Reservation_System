import React from "react";
import { useEffect } from "react";
import UserProfileDetails from "./UserProfileDetails";
import UserBookedTickets from "./UserBookedTickets";
import PendingPayments from "./UserPendingPayments";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { BookingStepGlobalState } from "../../Layout/BookingStepGlobalState";
import "../scrollMenu.css";
import "./userProfile.css";

export default function UserProfile({ userData }) {
  const { userMenuItem, setUserMenuItem } = UserMenuGlobalState();
  const { setBookingStep } = BookingStepGlobalState();
  useEffect(() => {
    // setUserMenuItem("profile-details");
    setBookingStep("flightSearch");
  }, [setUserMenuItem, setBookingStep]);

  return (
    <div className="wrapper">
      <img
        className="background-image"
        alt="Rectangle"
        loading="lazy"
        src={require("../../../images/UserBackImage.jpg")}
      />
      <div className="registered-user-container">{renderPage()}</div>
    </div>
  );

  function renderPage() {
    if (userMenuItem === "profile-details") {
      return <UserProfileDetails userData={userData} />;
    } else if (userMenuItem === "booked-tickets") {
      return (
        <UserBookedTickets userData={userData} fromBookedTickets={false} />
      );
    } else if (userMenuItem === "pending-payments") {
      return <PendingPayments fromBookedTickets={false} />;
    }
  }
}
