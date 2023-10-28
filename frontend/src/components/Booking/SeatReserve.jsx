import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { UserGlobalState } from "../Layout/UserGlobalState";
import axios from "axios";
import "./seatReserve.css";
import Snackbar from "../common/Snackbar"

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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passportID, setPassportID] = useState("");
  const [selectedOption, setSelectedOption] = useState("adult");
  const [selectedSeat, setSelectedSeat] = useState(null);
  console.log(bookingProcessDetails);

  const snackbarRef_success = useRef(null);
  const Snackbardata_success={
    type: "success",
    message: "Seat Reserved!"
  };

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
        if (bookingProcessDetails.passengers.length) {
          const bookedSeats = bookingProcessDetails.passengers.map(
            (passenger) => passenger.seatNumber
          );
          const newAvailableSeats = response.data.availableSeats.filter(
            (seat) => !bookedSeats.includes(seat)
          );
          setSeatsObj({
            ...response.data,
            availableSeats: newAvailableSeats,
          });
        } else {
          setSeatsObj(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSeats();
  }, [
    bookingProcessDetails.flightID,
    BaseURL,
    bookingProcessDetails.travelClass,
    bookingProcessDetails.passengers,
  ]);

  function handleReserve() {
    // Add Seat Reserve Successful Message
    const passengerDetails = {
      firstName: firstName,
      isAdult: selectedOption === "adult" ? 1 : 0,
      lastName: lastName,
      passportID: passportID,
      seatNumber: selectedSeat,
    };

    setBookingProcessDetails({
      ...bookingProcessDetails,
      passengers: [...bookingProcessDetails.passengers, passengerDetails],
    });

    const newAvailableSeats = seatsObj.availableSeats.filter(
      (seat) => seat !== selectedSeat
    );

    setSelectedSeat(null);
    setFirstName("");
    setLastName("");
    setPassportID("");

    setSeatsObj({
      ...seatsObj,
      availableSeats: newAvailableSeats,
    });
    snackbarRef_success.current.show();
  }

  function handleSeatClick(seatNumber) {
    seatNumber !== selectedSeat
      ? setSelectedSeat(seatNumber)
      : setSelectedSeat(null);
  }

  function handleBookingDetails() {
    setBookingStep("bookingDetails");
  }
  function handleBack() {
    setBookingStep(prevPage);
    setBookingProcessDetails((prevState) => ({ ...prevState, passengers: [] }));
  }
  return (
    <>
      <div className="cen-box">
        <div className="glass-background"></div>
        <div className="main-container">
          <div className="front-content front-text title">
            Seat Reservations : {bookingProcessDetails.travelClass} Class
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
                          const isSeatSelected = selectedSeat === seatNumber;

                          const isDisabled = !isSeatAvailable;
                          const className = `seat-btn btn ${
                            isDisabled ? "disabled" : ""
                          }
                          ${isSeatSelected ? "selected" : ""}`;
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
                  <label htmlFor="formGroupExampleInput">First Name :</label>
                  <input
                    type="text"
                    className="form-control selection-area"
                    id="formGroupExampleInput"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Last Name :</label>
                  <input
                    type="text"
                    className="form-control selection-area"
                    id="formGroupExampleInput2"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                <label>Adult / Child :</label>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    style={{ width: "100%", height: "2.35em" }}
                    className="selection-area"
                  >
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Passport ID :</label>
                  <input
                    type="text"
                    className="form-control selection-area"
                    id="formGroupExampleInput2"
                    placeholder="Passport ID"
                    value={passportID}
                    onChange={(e) => setPassportID(e.target.value)}
                  />
                </div>
                <div className="reserve-btn-set">
                  <button type="button" className="reserve-btn btn">
                    Cancel
                  </button>
                  <button
                    onClick={handleReserve}
                    disabled={
                      !(firstName && lastName && passportID && selectedSeat)
                    }
                    type="button"
                    className="reserve-btn btn"
                  >
                    Reserve
                  </button>
                  <Snackbar
                    ref={snackbarRef_success}
                    message={Snackbardata_success.message}
                    type={Snackbardata_success.type}
                  />
                </div>
              </form>
            </div>
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
            {bookingProcessDetails.passengers.length && (
              <button
                type="button"
                className="action-button"
                onClick={handleBookingDetails}
              >
                Proceed
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
