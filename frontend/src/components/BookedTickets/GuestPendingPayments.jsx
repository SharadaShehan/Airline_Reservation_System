import React, { useState, useEffect } from "react";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import { UserMenuGlobalState } from "../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../Layout/UserGlobalState";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuvidv4 } from "uuid";
import "../Profile/RegisteredUser/userProfile.css";
import Cookies from "js-cookie";
import ConfirmationPopup from "../common/ConfirmationPopup";

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
  const [showPopup, setShowPopup] = useState(false);

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

  async function handlePopUpConfirmation(bookingRefID) {
    console.log("working");
    try {
      const response = await axios.delete(
        `${BaseURL}/booking/cancel/guest/${bookingRefID}/${guestID}`
      );
      console.log(response.data);
      if (response.status === 204) {
        const newPendingPayments = pendingPayments.filter(
          (payment) => payment.bookingRefID !== bookingRefID
        );
        setPendingPayments(newPendingPayments);
        // alert("Booking Cancelled Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancelBooking() {
    setShowPopup(true);
  }

  function handlePopUpCancel() {
    setShowPopup(false);
  }

  console.log(selectedBooking);

  return (
    <div className="profileDetailsWrapper">
      <h1 className="user-header">Pending Payments</h1>
      <div className="scrollable-body">
        {isLoading && (
          <h4 className="loading-text">Loading Details Please Wait....</h4>
        )}
        {pendingPayments.length !== 0 && (
          <table className="user-table">
            <thead className="user-thead">
              <tr className="user-tr">
                <th className="user-th"></th>
                <th className="user-th">Booking Ref ID</th>
                <th className="user-th">Flight ID</th>
                <th className="user-th">Passengers</th>
                <th className="user-th">Price</th>
                <th className="user-th">Travel Class</th>
                <th className="user-th"></th>
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
                  <td className="user-td-psg">
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
                  <td className="user-td">$ {payment.price}</td>
                  <td className="user-td">{payment.travelClass}</td>
                  <td className="user-td">
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelBooking()}
                    >
                      Cancel
                    </button>
                    <ConfirmationPopup
                      show={showPopup}
                      message="Are you sure you want to Cancel?"
                      onConfirm={() =>
                        handlePopUpConfirmation(payment.bookingRefID)
                      }
                      onCancel={handlePopUpCancel}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {pendingPayments.length === 0 && !isLoading && (
          <h4 className="loading-text">
            You don't have any pending payments remaining.
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
