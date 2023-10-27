import React, { useEffect, useState } from "react";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import "./passengersByFlight.css";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";

function PassengersByFlight() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [airportsList, setAirportsList] = useState([]);
  const [origin, setOrigin] = useState("origin");
  const [destination, setDestination] = useState("destination");
  const [filter, setFilter] = useState("all"); // ["all", "adults", "children"
  const [passengers, setPassengers] = useState([]);

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

    console.log(origin, destination);
    console.log(
      `${BaseURL}/admin/next-flight/passengers?fromAirport=${origin}&toAirport=${destination}`
    );

    try {
      const response = await axios.get(
        `${BaseURL}/admin/next-flight/passengers?fromAirport=${origin}&toAirport=${destination}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setPassengers(response.data);
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
      <span className="view-revenue">View Passenger By Flight</span>
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
        <select
          className="model-selection"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option className="model-option" value="all">
            All
          </option>
          <option className="model-option" value="adults">
            Adults
          </option>
          <option className="model-option" value="children">
            Children
          </option>
        </select>
      </div>
      <div className="inner-box">
        {passengers.length === 0 ? (
          <div className="no-passengers">
            Select Origin and Destination airports
          </div>
        ) : (
          <div style={{ height: "375px", overflow: "auto", width: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th>Passport ID</th>
                  <th>Passenger Name</th>
                  <th>Travel Class</th>
                  <th>Seat Number</th>
                  <th>User Category</th>
                </tr>
              </thead>
              <tbody>
                {filter === "all" &&
                  passengers.map((passenger) => (
                    <tr key={uuidv4()}>
                      <td>{passenger.passportID}</td>
                      <td>{passenger.name}</td>
                      <td>{passenger.travelClass}</td>
                      <td>{passenger.seatNumber}</td>
                      <td>{passenger.userType}</td>
                    </tr>
                  ))}
                {filter === "adults" &&
                  passengers
                    .filter((passenger) => passenger.isAdult)
                    .map((passenger) => (
                      <tr key={uuidv4()}>
                        <td>{passenger.passportID}</td>
                        <td>{passenger.name}</td>
                        <td>{passenger.travelClass}</td>
                        <td>{passenger.seatNumber}</td>
                        <td>{passenger.userType}</td>
                      </tr>
                    ))}
                {filter === "children" &&
                  passengers
                    .filter((passenger) => !passenger.isAdult)
                    .map((passenger) => (
                      <tr key={uuidv4()}>
                        <td>{passenger.passportID}</td>
                        <td>{passenger.name}</td>
                        <td>{passenger.travelClass}</td>
                        <td>{passenger.seatNumber}</td>
                        <td>{passenger.userType}</td>
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
        <button onClick={handleViewClick} className="buttons">
          View
        </button>
      </div>
    </div>
  );
}

export default PassengersByFlight;
