import React, { useState, useEffect } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import "./details.css";

function SearchFlights() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const { setUserMenuItem } = UserMenuGlobalState();

  const [flightDetails, setFlightDetails] = useState([]);
  const [airportsList, setAirportsList] = useState([]);
  const [date, setDate] = useState("");
  const [origin, setOrigin] = useState("origin");
  const [destination, setDestination] = useState("destination");

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
      setFlightDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleBackClick() {
    setUserMenuItem("view-details");
  }

  return (
    <div className="outer-box">
      <span className="view-revenue">Search Flights</span>
      <div className="selection-box">
        <select
          className="model-selection"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        >
          <option disabled value="origin" className="model-option">
            Origin
          </option>
          {airportsList.map((airport) => (
            <option
              className="model-option"
              value={airport.icaoCode}
              key={airport.icaoCode}
            >
              {airport.city} ({airport.iataCode})
            </option>
          ))}
        </select>
        <select
          className="model-selection"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option disabled value="destination" className="model-option">
            Destination
          </option>
          {airportsList
            .filter((airport) => airport.icaoCode !== origin)
            .map((airport) => (
              <option
                className="model-option"
                value={airport.icaoCode}
                key={airport.icaoCode}
              >
                {airport.city} ({airport.iataCode})
              </option>
            ))}
        </select>
        <div className="date-selection-dest">
          <input
            id="start-date-input"
            className="model-selection"
            type="date"
            name="start-date"
            min="2023-10-01"
            max="2023-12-31"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <div className="inner-box">
        {flightDetails.length === 0 ? (
          <div className="no-passengers">
            Select Origin, Destination and Date to Search Flights
          </div>
        ) : (
          <div style={{ height: "375px", overflow: "auto", width: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th>Flight ID</th>
                  <th>Airplane Model</th>
                  <th>Origin Details</th>
                  <th>Destination Details</th>
                  <th>Duration (Mins)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {flightDetails.map((flight) => (
                  <tr key={flight.flightID}>
                    <td>{flight.flightID}</td>
                    <td>{flight.airplaneModel}</td>
                    <td>
                      <ul>
                        <li>{flight.origin.address}</li>
                        <li>{flight.origin.IATA}</li>
                        <li>{flight.origin.dateAndTime}</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>{flight.destination.address}</li>
                        <li>{flight.destination.IATA}</li>
                        <li>{flight.destination.dateAndTime}</li>
                      </ul>
                    </td>
                    <td>{flight.durationMinutes}</td>
                    <td>
                      <button className="cancel-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="buttons-div">
        <button onClick={handleBackClick} className="buttons">
          Back
        </button>
        <button className="buttons" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchFlights;
