import React from "react";
import { useState, useEffect } from "react";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import axios from "axios";
import "./passengersByDestination.css";
import Cookies from "js-cookie";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";

function PassengersByDestination() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [airportsList, setAirportsList] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [destination, setDestination] = useState("destination");
  const [passengersCount, setPassengersCount] = useState({});

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
      `${BaseURL}/admin/passengers-to-destination?fromDate=${from}&toDate=${to}&toAirport=${destination}`
    );

    try {
      const response = await axios.get(
        `${BaseURL}/admin/passengers-to-destination?fromDate=${from}&toDate=${to}&toAirport=${destination}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setPassengersCount(response.data);
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
      <span className="view-by-date-dest">
        View Passengers by Date & Destination
      </span>

      <div className="inner-box-dest">
        <div className="selection-box-dest">
          <div className="date-selection-dest">
            <label className="from-dest" htmlFor="start-date-input">
              From
            </label>
            <input
              id="start-date-input"
              className="model-selection"
              type="date"
              name="start-date"
              min="2023-10-01"
              max="2023-12-31"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="date-selection-dest">
            <label className="to-dest" htmlFor="end-date-input">
              To
            </label>
            <input
              id="end-date-input"
              className="model-selection"
              type="date"
              name="end-date"
              min="2023-10-01"
              max="2023-12-31"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="model-selection-dest"
            placeholder="Destination"
          >
            <option className="model-option" value="destination" disabled>
              Destination
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
        </div>
        <div className="count-box">
          {!passengersCount ? (
            <div className="no-passengers">
              Select From Date, To Date and Destination Airport and click View
            </div>
          ) : (
            <>
              <label className="passengers-count">Passengers Count</label>
              <input
                className="count-input"
                disabled
                type="text"
                value={passengersCount.passengersCount}
              />
            </>
          )}
        </div>
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

export default PassengersByDestination;
