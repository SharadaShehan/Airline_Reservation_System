import React from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function UserBookedTickets({ userData, fromBookedTickets }) {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [responseCheck, setResponseCheck] = useState(true);
  const [bookedTickets, setBookedTickets] = useState([]);

  useEffect(
    function () {
      async function getBookedTickets() {
        try {
          const response = await axios.get(`${BaseURL}/tickets/user/search`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          if (!response.data.length) {
            setResponseCheck(false);
          }
          setBookedTickets(response.data);
        } catch (error) {
          console.log(error);
          if (error.response.status === 404) {
            setResponseCheck(false);
          }
          if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            setCurrentUserData({
              username: null,
              firstName: null,
              lastName: null,
              isAdmin: null,
              isDataEntryOperator: null,
              bookingsCount: null,
              category: null,
            });
          }
        }
      }
      getBookedTickets();
    },
    [BaseURL, token, setCurrentUserData]
  );

  return (
    <div className="profileDetailsWrapper">
      <h1 className="user-header">Booked Tickets</h1>
      <div className="scrollable-body">
        {bookedTickets.length ? (
          <table className="user-table">
            <thead className="user-thead">
              <tr className="user-tr">
                <th className="user-th">Ticket Number</th>
                <th className="user-th">Passenger</th>
                <th className="user-th">Passport ID</th>
                <th className="user-th">From</th>
                <th className="user-th">To</th>
                <th className="user-th">Seat</th>
                <th className="user-th">Class</th>
                <th className="user-th">Depature Date</th>
              </tr>
            </thead>
            <tbody className="user-tbody">
              {bookedTickets.map((ticket) => (
                <tr className="user-tr" key={ticket.ticketNumber}>
                  <td className="user-td">{ticket.ticketNumber}</td>
                  <td className="user-td">{ticket.passenger}</td>
                  <td className="user-td">{ticket.passportID}</td>
                  <td className="user-td">{ticket.from.city}</td>
                  <td className="user-td">{ticket.to.city}</td>
                  <td className="user-td">{ticket.seat}</td>
                  <td className="user-td">{ticket.class}</td>
                  <td className="user-td">
                    {ticket.departureDate.slice(0, -12)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : responseCheck ? (
          <h4 className="loading-text">Loading Details Please Wait....</h4>
        ) : (
          <h4 className="loading-text">You haven't Booked any Tickets yet.</h4>
        )}
      </div>
      {!fromBookedTickets && (
        <div className="user-buttonWrapper">
          <button
            className="user-button"
            onClick={() => setUserMenuItem("profile-details")}
          >
            Back to Profile
          </button>
          <button
            className="user-button"
            onClick={() => setUserMenuItem("pending-payments")}
          >
            Go to Pending Payments
          </button>
        </div>
      )}
    </div>
  );
}
