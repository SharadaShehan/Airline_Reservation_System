import React from "react";
import { UserGlobalState } from "../Layout/UserGlobalState";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Profile/RegisteredUser/userProfile.css";
import Cookies from "js-cookie";

function GuestBookedTickets() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const guestID = Cookies.get("guest-id");

  const { setCurrentUserData } = UserGlobalState();
  const [bookedTickets, setBookedTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function getBookedTickets() {
        try {
          const response = await axios.get(
            `${BaseURL}/tickets/guest/search?guestID=${guestID}`
          );
          console.log(response.data);
          setIsLoading(false);
          setBookedTickets(response.data);
        } catch (error) {
          console.log(error);
          if (error.response.status === 404) {
            setIsLoading(false);
            setBookedTickets([]);
          }
          if (error.response && error.response.status === 401) {
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
    [BaseURL, guestID, setCurrentUserData]
  );

  return (
    <div className="profileDetailsWrapper">
      <h1 className="user-header">Booked Tickets</h1>
      <div className="scrollable-body">
        {isLoading && (
          <h4 className="loading-text">Loading Details Please Wait....</h4>
        )}
        {bookedTickets.length !== 0 && (
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
        )}
        {bookedTickets.length === 0 && !isLoading && (
          <h4 className="loading-text">
            You haven't booked any tickets yet.
          </h4>
        )}
      </div>
    </div>
  );
}

export default GuestBookedTickets;
