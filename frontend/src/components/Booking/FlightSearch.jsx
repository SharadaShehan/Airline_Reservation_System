import React, { useEffect, useState } from "react";
import axios from "axios";
import "./flightSearch.css";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import { BookingProcessGlobalState } from "../Layout/BookingProcessGlobalState";
import { UserGlobalState } from "../Layout/UserGlobalState";

export default function FlightSearch() {
  const { setBookingStep } = BookingStepGlobalState();
  const { bookingProcessDetails, setBookingProcessDetails } =
    BookingProcessGlobalState();
  const { currentUserData } = UserGlobalState();
  let nextPage = "loginAsk";
  const [classType, setClassType] = useState("none");
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const [destination, setDestination] = useState("destination");
  const [airportsList, setAirportsList] = useState([]);
  const [origin, setOrigin] = useState("origin");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [selectedFlightID, setSelectedFlightID] = useState(0);

  if (currentUserData.username != null) {
    nextPage = "seatReserve";
  }

  function handleNext() {
    setBookingProcessDetails({
      ...bookingProcessDetails,
      bookingRefID: null,
      flightID: selectedFlightID,
      travelClass: classType,
      price: null,
      passengers: [],
    });
    setBookingStep(nextPage);
  }

  function handleClassChange(event, data) {
    setClassType(event.target.value);
    setSelectedFlightID(data);
    console.log(data);
  }

  // const handleSelectEconomy = (data) => {
  //   setClassType("Economy");
  //   setSelectedFlightID(data);
  //   console.log(data);
  // };

  // const handleSelectBusiness = (data) => {
  //   setClassType("Business");
  //   setSelectedFlightID(data);
  // };
  // const handleSelectPlatinum = (data) => {
  //   setClassType("Platinum");
  //   setSelectedFlightID(data);
  // };

  useEffect(
    function () {
      async function getAirportsList() {
        try {
          const response = await axios.get(`${BaseURL}/get/airports`);
          console.log(response.data);
          setAirportsList(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      getAirportsList();
    },
    [BaseURL]
  );

  async function handleSearch() {
    const token = Cookies.get("access-token");

    console.log(origin, destination);
    console.log(
      `${BaseURL}/flight/search?fromAirport=${origin}&toAirport=${destination}&date=${date}`
    );

    try {
      const response = await axios.get(
        `${BaseURL}/flight/search?fromAirport=${origin}&toAirport=${destination}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setFlights(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container justify-content-md-center center-box">
        <div className="glass-background"></div>
        <div className="main-container">
          <div className="front-content front-text title">Search Flights</div>
          <div className="front-content ">
            <div className="drop-btn-container">
              <div className="left-drop-btn">
                <div className="dropdown">
                  <select
                    className="selection-area-dropbtn"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  >
                    <option disabled value="origin">
                      From
                    </option>
                    {airportsList.map((airport) => (
                      <option value={airport.icaoCode} key={airport.icaoCode}>
                        {airport.city} ({airport.iataCode})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="right-drop-btn">
                <div className="dropdown">
                  <select
                    className="selection-area-dropbtn"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option disabled value="destination">
                      To
                    </option>
                    {airportsList
                      .filter((airport) => airport.icaoCode !== origin)
                      .map((airport) => (
                        <option value={airport.icaoCode} key={airport.icaoCode}>
                          {airport.city} ({airport.iataCode})
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="date-btn drop-btn">
              <div className="dropdown">
                <button className="selection-area dropbtn">
                  <span></span>
                  <span className="drop-text-container">Departure Date</span>
                  <input
                    className="selection-area date-input-flightSearch"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </button>
              </div>
            </div>
            <div className="search-btn">
              <button className="transparent-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          <div className="table-container front-content">
            {flights.length === 0 ? (
              <div className="no-passengers">
                Select Origin, Destination airports and Departure Date
              </div>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Aircraft Model</th>
                      <th>Departure Time</th>
                      <th>Travel Duration</th>
                      <th>Economy</th>
                      <th>Business</th>
                      <th>Platinum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((flight) => (
                      <tr key={uuidv4()}>
                        <td>{flight.airplaneModel}</td>
                        <td>
                          {new Date(
                            flight.origin.dateAndTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td>{`${Math.floor(
                          flight.durationMinutes / 60
                        )} hr and ${flight.durationMinutes % 60} min`}</td>
                        <td>
                          <input
                            className="radio-btn"
                            type="radio"
                            name="class"
                            value="Economy"
                            checked={classType === "Economy"}
                            onChange={(event) =>
                              handleClassChange(event, flight.flightID)
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="radio-btn"
                            type="radio"
                            name="class"
                            value="Business"
                            checked={classType === "Business"}
                            onChange={(event) =>
                              handleClassChange(event, flight.flightID)
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="radio-btn"
                            type="radio"
                            name="class"
                            value="Platinum"
                            checked={classType === "Platinum"}
                            onChange={(event) =>
                              handleClassChange(event, flight.flightID)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="lower-btns-container">
            <div className="selected-class-txt">Class : {classType}</div>
            <div className="btn-set">
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
                onClick={handleNext}
                disabled={!(classType && selectedFlightID)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
