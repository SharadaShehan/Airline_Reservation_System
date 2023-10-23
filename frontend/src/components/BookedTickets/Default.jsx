import React from "react";
import { useState } from "react";
import "./bookedTicketsPages.css";
import axios from "axios";
import { debounce } from "lodash";

function Default() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [bookedTickets, setBookedTickets] = useState([]);

  const delayedSearch = debounce(async (searchTerm) => {
    try {
      const response = await axios.get(
        `${BaseURL}/tickets/guest/search-by-ref-id?bookingRefID=${searchTerm}`
      );
      console.log("Response: ", response);
      setBookedTickets(response.data);
    } catch (err) {
      console.log(err);
    }
  }, 500);

  function handleSearch(event) {
    console.log("Search Term: ", searchTerm);
    setSearchTerm(event.target.value);
    if (event.target.value.length >= 12) delayedSearch(event.target.value);
  }

  return (
    <div className="content">
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            className="search"
            type="search"
            placeholder={"Search By Booking Ref ID"}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="booking-details-wrapper">
        {bookedTickets.length ? (
          <div className="booking-details-container">
            <h1 className="booking-details">Booking Details</h1>
            <div className="scrollable-body">
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
                    <th className="user-th">Depature Time</th>
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
                        {new Date(ticket.departureDate).toLocaleDateString()}
                      </td>

                      <td className="user-td">{ticket.departureTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <h4 className="loading-text">Enter a Valid Booking Ref ID</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default Default;
