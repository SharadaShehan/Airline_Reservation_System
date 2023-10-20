import React from "react";
import { useState } from "react";
import UserBookedTickets from "../../components/Profile/RegisteredUser/UserBookedTickets";
import UserPendingPayments from "../../components/Profile/RegisteredUser/UserPendingPayments";
import "../Profile/RegisteredUser/userProfile.css";

function UserBookedTicketsPage() {
  const [viewBookedTickets, setViewBookedTickets] = useState(true);
  const [viewPendingPayments, setViewPendingPayments] = useState(false);

  return (
    <div style={{ width: "100%" }}>
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
        {viewBookedTickets && <UserBookedTickets fromBookedTickets={true} />}
        {viewPendingPayments && (
          <UserPendingPayments fromBookedTickets={true} />
        )}
      </div>
    </div>
  );
}

export default UserBookedTicketsPage;
