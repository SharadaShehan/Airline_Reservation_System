import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import axios from "axios";
import "./makePayment.css";
import Cookies from "js-cookie";

export default function MakePayment() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const { bookingProcessDetails } = BookingProcessGlobalState();
  const { setBookingStep } = BookingStepGlobalState();
  const [flightDetails, setFlightDetails] = useState({});
  const bookingRef = Cookies.get("bookingRef");

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

  async function handlePayNow() {
    try {
      const transactionID = Math.floor(Math.random() * 1000000000).toString();
      const response = await axios.post(
        `${BaseURL}/booking/complete/${bookingRef}`,
        {
          transactionID: transactionID,
        }
      );
      if (response.status === 200) {
        setBookingStep("bookingSuccess");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="cen-box">
        <div className="glass-background"></div>
        <div className="main-container">
          <div className="front-content front-text title">Booking Details</div>
          <div className="main-details">
            <div className="data-col">
              <div>
                <label>Date & Time of Departure: &nbsp;</label>
                <span>{flightDetails.departureDateAndTime}</span>
              </div>
              <div>
                <label>Origin : &nbsp;</label>
                <span>{flightDetails.originAddress}</span>
              </div>
              <div>
                <label>IATA : &nbsp;</label>
                <span>{flightDetails.originIATA}</span>
              </div>
              <div>
                <label>Plane Model : &nbsp;</label>
                <span>{flightDetails.airplaneModel}</span>
              </div>
            </div>
            <div className="data-col">
              <div>
                <label>Date & Time of Arrival: &nbsp;</label>
                <span>{flightDetails.arrivalDateAndTime}</span>
              </div>
              <div>
                <label>Destination : &nbsp;</label>
                <span>{flightDetails.destinationAddress}</span>
              </div>
              <div>
                <label>IATA : &nbsp;</label>
                <span>{flightDetails.destinationIATA}</span>
              </div>
              <div>
                <label>Travel Class : &nbsp;</label>
                <span>{bookingProcessDetails.travelClass}</span>
              </div>
            </div>
          </div>
          <div className="tck-details">
            {bookingProcessDetails.passengers.map((passenger) => {
              return (
                <div key={passenger.seatNumber} className="ticket-box">
                  <div className="ticket-box-back"></div>
                  <div className="tck-data">
                    <div className="ticket-data">
                      <label>First name : &nbsp; </label>
                      <span>{passenger.firstName}</span>
                    </div>
                    <div className="ticket-data">
                      <label>Last Name : &nbsp;</label>
                      <span>{passenger.lastName}</span>
                    </div>
                    <div className="ticket-data">
                      <label>Adult / Child : &nbsp;</label>
                      <span>{passenger.isAdult ? "Adult" : "Child"}</span>
                    </div>
                    <div className="ticket-data">
                      <label>Passport ID : &nbsp;</label>
                      <span>{passenger.passportID}</span>
                    </div>
                    <div className="ticket-data">
                      <label>Seat Number : &nbsp; </label>
                      <span>{passenger.seatNumber}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btn-set">
            <button type="button" className="action-button btn">
              <Link
                to="/home"
                style={{ color: "white", textDecoration: "none" }}
              >
                Cancel
              </Link>
            </button>
            <button
              type="button"
              className="action-button btn"
              onClick={handlePayNow}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
