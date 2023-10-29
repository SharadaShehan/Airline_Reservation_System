import React from "react";
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import { UserGlobalState } from "../Layout/UserGlobalState";
import "./loginAsk.css";

export default function LoginAsk() {
  const { setBookingStep } = BookingStepGlobalState();
  const { currentUserData } = UserGlobalState();
  if (currentUserData.username != null) {
    setBookingStep("seatReserve");
  }

  function handleGuest() {
    setBookingStep("seatReserve");
  }

  function handleLogin() {
    setBookingStep("userLogin");
  }

  function handleBack() {
    setBookingStep("flightSearch");
  }

  return (
    <>
      <div className="back-box">
        <div className="glass-background"></div>
        <div className="main-container">
          <div className="front-content front-text title">Book Flights</div>
          <div className="sub-content">Continue as Guest or Login ?</div>
          <div className="search-btn">
            <button className="transparent-button" onClick={handleGuest}>
              Guest
            </button>
          </div>
          <div className="search-btn">
            <button className="transparent-button" onClick={handleLogin}>
              Log in
            </button>
          </div>
          <div className="btn-set" style={{
            "paddingRight": "5vw",
            "paddingTop": "1.5vw",
            "margin": "0"
          }}>
            <button type="button" className="action-button btn">
              <Link
                to="/home"
                style={{ color: "Black", textDecoration: "none" }}
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
          </div>
        </div>
      </div>
    </>
  );
}
