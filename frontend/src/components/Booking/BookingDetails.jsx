import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import { UserGlobalState } from "../Layout/UserGlobalState";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import axios from "axios";
import "./BookingDetails.css";
import Cookies from "js-cookie";
import ConfirmationPopup from '../common/ConfirmationPopup';

export default function BookingDetails() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const accessToken = Cookies.get("access-token");
  const guestID = Cookies.get("guest-id");
  const { currentUserData } = UserGlobalState();
  const { bookingProcessDetails, setBookingProcessDetails } =
    BookingProcessGlobalState();
  const { setBookingStep } = BookingStepGlobalState();
  const [flightDetails, setFlightDetails] = useState({});
  const [showPopup, setShowPopup] = useState(false);

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

  function handlePopUpConfirmation() {
    async function createBookingUser() {
      try {
        const response = await axios.post(
          `${BaseURL}/booking/create/user`,
          {
            flightID: bookingProcessDetails.flightID,
            travelClass: bookingProcessDetails.travelClass,
            passengers: bookingProcessDetails.passengers,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        if (response.status === 201) {
          Cookies.set("bookingRef", response.data.bookingRefID);
          setBookingProcessDetails((prevState) => ({
            ...prevState,
            price : response.data.price,
            bookingRefID: response.data.bookingRefID
          }));
          console.log("confirmed !");
          setBookingStep("makePayment");
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function createBookingGuest() {
      let response = {};
      try {
        if (guestID) {
          response = await axios.post(`${BaseURL}/booking/create/guest`, {
            flightID: bookingProcessDetails.flightID,
            travelClass: bookingProcessDetails.travelClass,
            passengers: bookingProcessDetails.passengers,
            guestID: guestID,
            email: bookingProcessDetails.email,
            contactNumber: bookingProcessDetails.contactNumber,
          });
        } else {
          response = await axios.post(`${BaseURL}/booking/create/guest`, {
            flightID: bookingProcessDetails.flightID,
            travelClass: bookingProcessDetails.travelClass,
            passengers: bookingProcessDetails.passengers,
          });
        }
        Cookies.set("guest-id", response.data.guestID);
        console.log(response.data);
        if (response.status === 201) {
          Cookies.set("bookingRef", response.data.bookingRefID);
          setBookingProcessDetails((prevState) => ({
            ...prevState,
            price : response.data.price,
            bookingRefID: response.data.bookingRefID
          }));
          setBookingStep("makePayment");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (currentUserData.username) {
      createBookingUser();
    } else {
      createBookingGuest();
    }
  }

  function handleRemoveBooking(seatNumber) {
    setBookingProcessDetails((prevState) => ({
      ...prevState,
      passengers: prevState.passengers.filter(
        (passenger) => passenger.seatNumber !== seatNumber
      ),
    }));
  }

  function handleBack() {
    // setBookingProcessDetails((prevState) => ({ ...prevState, passengers: [] }));
    setBookingStep("seatReserve");
  }

  function handleReserveNow(){
    setShowPopup(true)
    console.log("reserve now")
  }

  function handlePopUpCancel(){
    setShowPopup(false);
  };

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
            {console.log(bookingProcessDetails)}
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
                    <div className="ticket-data">
                      <button
                        onClick={() =>
                          handleRemoveBooking(passenger.seatNumber)
                        }
                        className="rmv-bk"
                      >
                        Remove Booked Seat
                      </button>
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
                style={{ color: "black", textDecoration: "none" }}
              >
                Cancel
              </Link>
            </button>
            <button
              type="button"
              className="action-button btn"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              className="action-button btn"
              onClick={handleReserveNow}
            >
              Reserve Now
            </button>
            <ConfirmationPopup
              show={showPopup}
              message="Are you sure you want to Reserve Now?"
              onConfirm={handlePopUpConfirmation}
              onCancel={handlePopUpCancel}
            />
          </div>
        </div>
      </div>
    </>
  );
}
