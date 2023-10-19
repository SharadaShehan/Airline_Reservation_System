import React from "react";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import { UserMenuGlobalState } from "../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../Layout/UserGlobalState";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuvidv4 } from "uuid";
import "../Profile/RegisteredUser/userProfile.css";
import Cookies from "js-cookie";

function GuestPendingPayments() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const navigate = useNavigate();
  const guestID = Cookies.get("guest-id");

  const { setBookingStep } = BookingStepGlobalState();
  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const { setBookingProcessDetails } = BookingProcessGlobalState();

  const [pendingPayments, setPendingPayments] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function getPendingPayments() {
        try {
          const response = await axios.get(
            `${BaseURL}/guest/pending-payments/${guestID}`
          );
          console.log(response.data);
          setIsLoading(false);
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
    [BaseURL, guestID, setCurrentUserData]
  );

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
        {isLoading && (
          <h4 className="loading-text">Loading Details Please Wait....</h4>
        )}
        {pendingPayments.length !== 0 && (
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
        )}
        {pendingPayments.length === 0 && !isLoading && (
          <h4 className="loading-text">
            You don't have any pending payments remaining...
          </h4>
        )}
      </div>
      <div className="user-buttonWrapper">
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

export default GuestPendingPayments;
