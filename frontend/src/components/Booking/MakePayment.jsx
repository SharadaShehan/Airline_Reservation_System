import React, { useEffect, useState, useRef } from "react";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import axios from "axios";
import "./makePayment.css";
import Cookies from "js-cookie";
import ConfirmationPopup from '../common/ConfirmationPopup';
import Snackbar from "../common/Snackbar"

export default function MakePayment() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const { bookingProcessDetails } = BookingProcessGlobalState();

  const { setBookingStep } = BookingStepGlobalState();
  const [flightDetails, setFlightDetails] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const snackbarRef_fail = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Failed to create booking !"
  };

  useEffect(() => {
    async function getFlightDetails() {
      try {
        const response = await axios.get(
          `${BaseURL}/flight/${bookingProcessDetails.flightID}`
        );
        console.log(response.data);
        setFlightDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFlightDetails();
  }, [BaseURL, bookingProcessDetails.flightID]);

  async function handlePopUpConfirmation() {
    try {
      const bookingRefID = Cookies.get("bookingRef");
      console.log(bookingRefID);
      const transactionID = Math.floor(Math.random() * 1000000000).toString();
      const response = await axios.post(
        `${BaseURL}/booking/complete/${bookingRefID}`,
        {
          transactionID: transactionID,
        }
      );
      if (response.status === 200) {
        setBookingStep("bookingSuccess");
      }
    } catch (error) {
      console.log(error);
      setShowPopup(false);
      snackbarRef_fail.current.show();
    }
  }

  function handlePayNow(){
    setShowPopup(true)
  }

  function handlePopUpCancel(){
    setShowPopup(false);
  }

  console.log(bookingProcessDetails);
  return (
    <>
      <div className="cen-box">
        <div className="glass-background"></div>
        <div className="main-container">
          <div className="front-content front-text title">Pending Payment Details</div>
          <div className="main-details-2">
            <div className="data-col-2">
              <div>
                <label>Booking Ref ID: &nbsp;</label>
                <span>{bookingProcessDetails.bookingRefID}</span>
              </div>
              <div>
                <label>Price: &nbsp;</label>
                <span>$ {bookingProcessDetails.price}</span>
              </div>
              <div>
                <label>Travel Class : &nbsp;</label>
                <span>{bookingProcessDetails.travelClass}</span>
              </div>
              <div>
                <label>Number Of Seats : &nbsp;</label>
                <span>{bookingProcessDetails.passengers.length}</span>
              </div>
              <div>
                <label></label>
              </div>
              <div>
                <label>Origin City : &nbsp;</label>
                <span>{flightDetails.originAddress}</span>
              </div>
              <div>
                <label>Departure : &nbsp;</label>
                <span>{flightDetails.departureDateAndTime}</span>
              </div>
              <div>
                <label>Destination City : &nbsp;</label>
                <span>{flightDetails.destinationAddress}</span>
              </div>
              <div>
                <label>Arrival : &nbsp;</label>
                <span>{flightDetails.arrivalDateAndTime}</span>
              </div>
            </div>
          </div>
          <div className="btn-set-2">
            <button
              type="button"
              className="action-button btn"
              onClick={handlePayNow}
            >
              Pay Now
            </button>
            <ConfirmationPopup
              show={showPopup}
              message="Are you sure you want to Pay?"
              onConfirm={handlePopUpConfirmation}
              onCancel={handlePopUpCancel}
            />
            <Snackbar
              ref={snackbarRef_fail}
              message={Snackbardata_fail.message}
              type={Snackbardata_fail.type}
            />
          </div>
        </div>
      </div>
    </>
  );
}
