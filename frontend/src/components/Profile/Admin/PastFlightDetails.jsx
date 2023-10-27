import React, { useState, useEffect } from "react";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import axios from "axios";
import { v4 as uuid4 } from "uuid";
import "./pastFlightDetails.css";
import Cookies from "js-cookie";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";

function PastFlightDetails() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [origin, setOrigin] = useState("origin");
  const [destination, setDestination] = useState("destination");
  const [airportsList, setAirportsList] = useState([]);
  const [response, setResponse] = useState([]);

  useEffect(
    function () {
      async function getAirportsList() {
        try {
          const response = await axios.get(`${BaseURL}/get/airports`);
          console.log(response.data);
          setAirportsList(response.data);
        } catch (error) {
          console.log(error);
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
      getAirportsList();
    },
    [BaseURL, setCurrentUserData]
  );

  function handleBackClick() {
    setUserMenuItem("profile-details");
  }

  async function handleViewClick() {
    const token = Cookies.get("access-token");

    console.log(
      `${BaseURL}/admin/past-flights?fromAirport=${origin}&toAirport=${destination}`
    );

    try {
      const response = await axios.get(
        `${BaseURL}/admin/past-flights?fromAirport=${origin}&toAirport=${destination}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
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

  return (
    <div className="outer-box">
      <span className="view-details">View Past Flight Details</span>
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
      </div>
      <div className="inner-box">
        {response.length ? (
          <div style={{ height: "375px", overflow: "auto", width: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Airplane Model</th>
                  <th>Arrived At</th>
                  <th>Departed At</th>
                  <th>Passengers Count</th>
                  <th>Status</th>
                  <th>Tail Number</th>
                </tr>
              </thead>
              <tbody>
                {response.map((item) => (
                  <tr key={uuid4()}>
                    <td>{item.ID}</td>
                    <td>{item.airplaneModel}</td>
                    <td>{item.arrivalDateAndTime}</td>
                    <td>{item.departureDateAndTime}</td>
                    <td>{item.passengersCount}</td>
                    <td>{item.status}</td>
                    <td>{item.tailNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-passengers">
            Select Origin and Destination Airports and Click View
          </div>
        )}
      </div>
      <div className="buttons-div">
        <button onClick={handleBackClick} className="buttons">
          Back
        </button>
        <button onClick={handleViewClick} className="buttons">
          View
        </button>
      </div>
    </div>
  );
}

export default PastFlightDetails;
