import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { UserGlobalState } from "../Layout/UserGlobalState";
import axios from "axios";
import "./seatReserve.css";

export default function SeatReserve() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const { setBookingStep } = BookingStepGlobalState();
  const { currentUserData } = UserGlobalState();
  const { bookingProcessDetails, setBookingProcessDetails } =
    BookingProcessGlobalState();
  const [seatsObj, setSeatsObj] = useState({
    availableSeats: [],
    availableSeatsCount: 0,
    className: null,
    totalSeatsCount: 0,
  });

  const [selectedOption, setSelectedOption] = useState("");
  console.log(bookingProcessDetails);

  let prevPage = "loginAsk";
  if (currentUserData.username != null) {
    prevPage = "flightSearch";
  }

  useEffect(() => {
    async function getSeats() {
      try {
        const response = await axios.get(
          `${BaseURL}/flight/${bookingProcessDetails.flightID}/seats?className=${bookingProcessDetails.travelClass}`
        );
        console.log(response.data);
        setSeatsObj(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSeats();
  }, [
    bookingProcessDetails.flightID,
    BaseURL,
    bookingProcessDetails.travelClass,
  ]);

  // setAvailableSeats(seatsObj.availableSeats);

  function handleSeatClick(seatNumber) {
    console.log(seatNumber);
  }

  function handlePayNow() {
    setBookingStep("makePayment");
  }
  function handleBack() {
    setBookingStep(prevPage);
  }
  return (
    <>
      <div className="cen-box">
        <div className="glass-background"></div>
        <div className="main-container">
          <div className="front-content front-text title">
            Seat Reservations : {bookingProcessDetails.travelClass}
          </div>
          <div className="tbl-grp">
            <div className="tbl-itm-1">
              {seatsObj.totalSeatsCount % 12 !== 0 ? (
                <div className="tbl-container">
                  {[...Array(Math.ceil(seatsObj.totalSeatsCount / 12))].map(
                    (_, rowIndex) => (
                      <div className="btn-row" key={rowIndex}>
                        {[...Array(12)].map((_, seatIndex) => {
                          const seatNumber = rowIndex * 12 + seatIndex + 1;
                          if (seatNumber > seatsObj.totalSeatsCount) {
                            return null;
                          }
                          const isSeatAvailable =
                            seatsObj.availableSeats.includes(seatNumber);

                          const isDisabled = !isSeatAvailable;
                          const className = `seat-btn btn ${
                            isDisabled ? "disabled" : ""
                          }`;
                          return (
                            <button
                              type="button"
                              className={className}
                              disabled={isDisabled}
                              key={seatIndex}
                              onClick={() => handleSeatClick(seatNumber)}
                            >
                              {seatNumber}
                            </button>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="no-seat">No Seats Available At The Moment</div>
              )}
            </div>
            <div className="tbl-itm-2">
              <form className="seat-data">
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Last Name"
                  />
                </div>
                <label>
                  Adult / Child :&nbsp;&nbsp;
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    style={{ width: "100%", height: "30px" }}
                  >
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                  </select>
                </label>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Passport ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Passport ID"
                  />
                </div>
                <div className="reserve-btn-set">
                  <button type="button" className="reserve-btn btn">
                    Cancel
                  </button>
                  <button type="button" className="reserve-btn btn">
                    Reserve
                  </button>
                </div>
              </form>
            </div>
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
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              className="action-button btn"
              onClick={handlePayNow}
            >
              Pay&nbsp;Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
