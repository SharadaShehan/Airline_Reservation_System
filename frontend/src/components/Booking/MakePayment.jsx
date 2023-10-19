import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserGlobalState } from "../Layout/UserGlobalState";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import axios from "axios";
import "./makePayment.css";
import Cookies from "js-cookie";

export default function MakePayment() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const accessToken = Cookies.get("access-token");
  const guestID = Cookies.get("guest-id");
  const { currentUserData } = UserGlobalState();
  const { bookingProcessDetails, setBookingProcessDetails } =
    BookingProcessGlobalState();
  const { setBookingStep } = BookingStepGlobalState();
  const [bookingRef, setBookingRef] = useState("");

  useEffect(() => {
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
        setBookingRef(response.data.bookingRefID);
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
          });
        } else {
          response = await axios.post(`${BaseURL}/booking/create/guest`, {
            flightID: bookingProcessDetails.flightID,
            travelClass: bookingProcessDetails.travelClass,
            passengers: bookingProcessDetails.passengers,
            guestID: guestID,
            email: bookingProcessDetails.email,
            contactNumber: bookingProcessDetails.contactNumber,
          });
        }
        console.log(response.data);
        setBookingRef(response.data.bookingRefID);
      } catch (error) {
        console.log(error);
      }
    }

    if (currentUserData.username) {
      createBookingUser();
    } else {
      createBookingGuest();
    }
  }, [
    BaseURL,
    accessToken,
    bookingProcessDetails.contactNumber,
    bookingProcessDetails.email,
    bookingProcessDetails.flightID,
    bookingProcessDetails.passengers,
    bookingProcessDetails.travelClass,
    currentUserData.username,
    guestID,
  ]);

  function handlePayNow() {
    setBookingStep("bookingSuccess");
    Cookies.set("bookingRef", bookingRef);
  }

  function handleBack() {
    setBookingStep("seatReserve");
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
                <label>Date : </label>
              </div>
              <div>
                <label>Origin :</label>
              </div>
              <div>
                <label>Plane Model : </label>
              </div>
              <div>
                <label>IATA : </label>
              </div>
            </div>
            <div className="data-col">
              <div>
                <label>Time : </label>
              </div>
              <div>
                <label>Destination : </label>
              </div>
              <div>
                <label>Travel Class : </label>
              </div>
            </div>
          </div>
          <div className="tck-details">
            <div className="ticket-box">
              <div className="ticket-box-back"></div>
              <div className="tck-data">
                <div className="ticket-data">
                  <label>First name : </label>
                </div>
                <div className="ticket-data">
                  <label>Last Name : </label>
                </div>
                <div className="ticket-data">
                  <label>Adult / Child : </label>
                </div>
                <div className="ticket-data">
                  <label>Passport ID : </label>
                </div>
                <div className="ticket-data">
                  <label>Seat Number : </label>
                </div>
              </div>
            </div>
            <div className="ticket-box">
              <div className="ticket-box-back"></div>
              <div className="tck-data">
                <div className="ticket-data">
                  <label>First name : </label>
                </div>
                <div className="ticket-data">
                  <label>Last Name : </label>
                </div>
                <div className="ticket-data">
                  <label>Adult / Child : </label>
                </div>
                <div className="ticket-data">
                  <label>Passport ID : </label>
                </div>
                <div className="ticket-data">
                  <label>Seat Number : </label>
                </div>
              </div>
            </div>
            <div className="ticket-box">
              <div className="ticket-box-back"></div>
              <div className="tck-data">
                <div className="ticket-data">
                  <label>First name : </label>
                </div>
                <div className="ticket-data">
                  <label>Last Name : </label>
                </div>
                <div className="ticket-data">
                  <label>Adult / Child : </label>
                </div>
                <div className="ticket-data">
                  <label>Passport ID : </label>
                </div>
                <div className="ticket-data">
                  <label>Seat Number : </label>
                </div>
              </div>
            </div>
            <div className="ticket-box">
              <div className="ticket-box-back"></div>
              <div className="tck-data">
                <div className="ticket-data">
                  <label>First name : </label>
                </div>
                <div className="ticket-data">
                  <label>Last Name : </label>
                </div>
                <div className="ticket-data">
                  <label>Adult / Child : </label>
                </div>
                <div className="ticket-data">
                  <label>Passport ID : </label>
                </div>
                <div className="ticket-data">
                  <label>Seat Number : </label>
                </div>
              </div>
            </div>
            <div className="ticket-box">
              <div className="ticket-box-back"></div>
              <div className="tck-data">
                <div className="ticket-data">
                  <label>First name : </label>
                </div>
                <div className="ticket-data">
                  <label>Last Name : </label>
                </div>
                <div className="ticket-data">
                  <label>Adult / Child : </label>
                </div>
                <div className="ticket-data">
                  <label>Passport ID : </label>
                </div>
                <div className="ticket-data">
                  <label>Seat Number : </label>
                </div>
              </div>
            </div>
            <div className="ticket-box">
              <div className="ticket-box-back"></div>
              <div className="tck-data">
                <div className="ticket-data">
                  <label>First name : </label>
                </div>
                <div className="ticket-data">
                  <label>Last Name : </label>
                </div>
                <div className="ticket-data">
                  <label>Adult / Child : </label>
                </div>
                <div className="ticket-data">
                  <label>Passport ID : </label>
                </div>
                <div className="ticket-data">
                  <label>Seat Number : </label>
                </div>
              </div>
            </div>
            <div className="ticket-box">
              <div className="ticket-box-back"></div>
              <div className="tck-data">
                <div className="ticket-data">
                  <label>First name : </label>
                </div>
                <div className="ticket-data">
                  <label>Last Name : </label>
                </div>
                <div className="ticket-data">
                  <label>Adult / Child : </label>
                </div>
                <div className="ticket-data">
                  <label>Passport ID : </label>
                </div>
                <div className="ticket-data">
                  <label>Seat Number : </label>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-set">
            <button type="button" class="action-button btn">
              <Link
                to="/home"
                style={{ color: "white", textDecoration: "none" }}
              >
                Cancel
              </Link>
            </button>
            <button
              type="button"
              class="action-button btn"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              class="action-button btn"
              onClick={handlePayNow}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
