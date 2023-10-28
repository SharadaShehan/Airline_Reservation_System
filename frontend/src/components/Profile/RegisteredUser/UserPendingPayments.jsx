import React from "react";
import { BookingStepGlobalState } from "../../Layout/BookingStepGlobalState";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import { BookingProcessGlobalState } from "../../Layout/BookingProcessGlobalState";
import { useState, useEffect, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuvidv4 } from "uuid";
import "./userProfile.css";
import ConfirmationPopup from '../../common/ConfirmationPopup';
import Snackbar from "../../common/Snackbar"
/* <button className='navigateBtn' onClick={handlePayNow}>Pay For Selected Booking</button> */

export default function PendingPayments({ fromBookedTickets }) {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");
  const navigate = useNavigate();

  const { setBookingStep } = BookingStepGlobalState();
  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const { setBookingProcessDetails } = BookingProcessGlobalState();

  const [pendingPayments, setPendingPayments] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [responseCheck, setResponseCheck] = useState(true);

  const [bookingRefID_cancel, setBookingRefID_cancel] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const snackbarRef_fail = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Failed to Cancel!"
  };
  const snackbarRef_success = useRef(null);
  const Snackbardata_success = {
    type: "success",
    message: "Canceled the Flight Successfully !"
  };

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
          if (!response.data.length) {
            setResponseCheck(false);
          }
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

  const handlePayNow = () => {
    setBookingStep("makePayment");
    setBookingProcessDetails(selectedBooking);
    setUserMenuItem("profile-details");
    navigate("/book-flights");
  };

  async function handlePopUpConfirmation() {
    const bookingRefID = bookingRefID_cancel;
    try {
      const response = await axios.delete(
        `${BaseURL}/booking/cancel/user/${bookingRefID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 204) {
        const newPendingPayments = pendingPayments.filter(
          (payment) => payment.bookingRefID !== bookingRefID
        );
        setPendingPayments(newPendingPayments);
        setShowPopup(false);
        snackbarRef_success.current.show();
        // alert("Booking Cancelled Successfully");
      }
    } catch (error) {
      console.log(error);
      setShowPopup(false);
      snackbarRef_fail.current.show();
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

  function handleCancelBooking(bookingRefID){
    setBookingRefID_cancel(bookingRefID);
    setShowPopup(true)
  }

  function handlePopUpCancel(){
    setBookingRefID_cancel(null);
    setShowPopup(false);
  }

  console.log(selectedBooking);

  return (
    <div className="profileDetailsWrapper">
      <h1 className="user-header">Pending Payments</h1>
      <div className="scrollable-body">
        {pendingPayments.length ? (
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
                      onClick={() => handleCancelBooking(payment.bookingRefID)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : responseCheck ? (
          <h4 className="loading-text">Loading Details Please Wait....</h4>
        ) : (
          <h4 className="loading-text">
            You don't have any Pending Payments left.
          </h4>
        )}
      </div>
      <div className="user-buttonWrapper">
        {!fromBookedTickets && (
          <>
            <button
              className="user-button"
              onClick={() => setUserMenuItem("profile-details")}
            >
              Back to Profile
            </button>
            <button
              className="user-button"
              onClick={() => setUserMenuItem("booked-tickets")}
            >
              Go to Booked Tickets
            </button>
          </>
        )}
        <button
          disabled={!selectedBooking}
          className="user-button"
          onClick={handlePayNow}
        >
          Pay For Selected Booking
        </button>
      </div>
      <ConfirmationPopup
        show={showPopup}
        message="Are you sure you want to Cancel?"
        onConfirm={handlePopUpConfirmation}
        onCancel={handlePopUpCancel}
      />
      <Snackbar
        ref={snackbarRef_fail}
        message={Snackbardata_fail.message}
        type={Snackbardata_fail.type}
      />
      <Snackbar
        ref={snackbarRef_success}
        message={Snackbardata_success.message}
        type={Snackbardata_success.type}
      />
    </div>
  );
}
