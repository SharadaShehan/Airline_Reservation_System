import React from "react";
import { BookingStepGlobalState } from "../../Layout/BookingStepGlobalState";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import { BookingProcessGlobalState } from "../../Layout/BookingProcessGlobalState";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuvidv4 } from "uuid";
import "./userProfile.css";

/* <button className='navigateBtn' onClick={handlePayNow}>Pay For Selected Booking</button> */

export default function PendingPayments() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");
  const navigate = useNavigate();

  const { setBookingStep } = BookingStepGlobalState();
  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const { setBookingProcessDetails } = BookingProcessGlobalState();

  const [isViewing, setIsViewing] = useState(false);
  const [pendingPayments, setPendingPayments] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState({});

  useEffect(
    function () {
      async function getPendingPayments() {
        try {
          const response = await axios.get(`${BaseURL}/user/pending-payments`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setPendingPayments(response.data);
        } catch (error) {
          console.log(error);
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
      getPendingPayments();
    },
    [BaseURL, token, setCurrentUserData]
  );

  function handleViewClick() {
    setIsViewing(true);
  }

  const handlePayNow = () => {
    setBookingStep("makePayment");
    setBookingProcessDetails(selectedBooking);
    setUserMenuItem("profile-details");
    navigate("/book-flights");
  };

  console.log(selectedBooking);

  return (
    <div className="profileDetailsWrapper">
      <h1 className="user-header">Pending Payments</h1>
      <div style={{ height: "375px", overflow: "auto", width: "100%" }}>
        {isViewing ? (
          <table className="user-table">
            <thead className="user-thead">
              <tr className="user-tr">
                <th className="user-th">Select / Deselect</th>
                <th className="user-th">Booking Ref ID</th>
                <th className="user-th">Flight ID</th>
                <th className="user-th">Passengers</th>
                <th className="user-th">Price</th>
                <th className="user-th">Travel Class</th>
              </tr>
            </thead>
            <tbody className="user-tbody">
              {pendingPayments.map((payment) => (
                <tr className="user-tr" key={payment.bookingRefID}>
                  <td className="user-td">
                    <input
                      className="radio"
                      type="radio"
                      value={payment}
                      checked={selectedBooking === payment}
                      onChange={() => setSelectedBooking(payment)}
                    />
                  </td>
                  <td className="user-td">{payment.bookingRefID}</td>
                  <td className="user-td">{payment.flightID}</td>
                  <td className="user-td">
                    <ul>
                      {payment.passengers.map((passenger) => (
                        <li key={uuvidv4()}>
                          {passenger.firstName} {passenger.lastName} (
                          {passenger.isAdult ? "Adult" : "Child"},{" "}
                          {"Passport ID : "}
                          {passenger.passportID}, {" Seat No : "}
                          {passenger.seatNumber})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="user-td">{payment.price}</td>
                  <td className="user-td">{payment.travelClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="not-clicked">
              Click View to see your pending payments
            </p>
          </div>
        )}
      </div>
      <div className="user-buttonWrapper">
        <button
          className="user-button"
          onClick={() => setUserMenuItem("profile-details")}
        >
          Back to Profile
        </button>
        <button className="user-button" onClick={handleViewClick}>
          View
        </button>
        <button
          className="user-button"
          onClick={() => setUserMenuItem("booked-tickets")}
        >
          Go to Booked Tickets
        </button>
        <button
          disabled={!selectedBooking}
          className="user-button"
          onClick={handlePayNow}
        >
          Pay For Selected Booking
        </button>
      </div>
    </div>
  );
}
