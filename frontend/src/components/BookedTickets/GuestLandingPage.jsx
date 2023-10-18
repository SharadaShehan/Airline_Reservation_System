import React from "react";
import { useState } from "react";
import "./bookedTicketsPages.css";
import GuestBookedTickets from "./GuestBookedTickets";
import GuestPendingPayments from "./GuestPendingPayments";

function GuestLandingPage({ guestID }) {
  const [viewBookedTickets, setViewBookedTickets] = useState(true);
  const [viewPendingPayments, setViewPendingPayments] = useState(false);

  return (
    <div>
      <div className="heading-buttons">
        <button
          onClick={() => {
            setViewBookedTickets(true);
            setViewPendingPayments(false);
          }}
        >
          View Booked Tickets
        </button>
        <button
          onClick={() => {
            setViewPendingPayments(true);
            setViewBookedTickets(false);
          }}
        >
          View Pending Payments
        </button>
      </div>
      <div className="content">
        {viewBookedTickets && <GuestBookedTickets guestID={guestID} />}
        {viewPendingPayments && <GuestPendingPayments guestID={guestID} />}
      </div>
    </div>
  );
}

export default GuestLandingPage;
