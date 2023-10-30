import React, { useState, useEffect, useRef } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import "./details.css";
import ConfirmationPopup from '../../common/ConfirmationPopup';
import Snackbar from "../../common/Snackbar"

function SearchFlights() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { currentUserData, setCurrentUserData } = UserGlobalState();
  const { setUserMenuItem } = UserMenuGlobalState();

  const [flightDetails, setFlightDetails] = useState([]);
  const [airportsList, setAirportsList] = useState([]);
  const [date, setDate] = useState("");
  const [origin, setOrigin] = useState("origin");
  const [destination, setDestination] = useState("destination");

  const [showPopup, setShowPopup] = useState(false);
  const snackbarRef_fail = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Failed to Delete Flight!"
  };
  const snackbarRef_success = useRef(null);
  const Snackbardata_success = {
    type: "success",
    message: "Deleted the Flight Successfully !"
  };

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

  function handleBackClick() {
    setUserMenuItem("view-details");
  }

  async function handlePopUpConfirmation(flightID) {
    try {
      const response = await axios.delete(
        `${BaseURL}/admin/delete/scheduled-flight/${flightID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 204) {
        const newFlightDetailsList = flightDetails.filter(
          (flight) => flight.flightID !== flightID
        );
        setFlightDetails(newFlightDetailsList);
        setShowPopup(false);
        snackbarRef_success.current.show();
        // alert("Messaage: Model Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      setShowPopup(false);
      snackbarRef_fail.current.show();
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

  function handleDelete(){
    setShowPopup(true)
  }

  function handlePopUpCancel(){
    setShowPopup(false);
  }

  return (
    <div className="outer-box">
      <span className="view-revenue">Search Flights</span>
      <div className="selection-box-div">
        <select
          className="model-selection-search"
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
          className="model-selection-search"
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
        <div className="model-selection-search">
          <input
            id="start-date-input"
            className="date-model-selection-search"
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
                  <th className="details-th">Flight ID</th>
                  <th className="details-th">Airplane Model</th>
                  <th className="details-th">Origin Details</th>
                  <th className="details-th">Destination Details</th>
                  <th className="details-th">Duration (Mins)</th>
                  {currentUserData.role !== "DataEntryOperator" && <th></th>}
                </tr>
              </thead>
              <tbody>
                {flightDetails.map((flight) => (
                  <tr key={flight.flightID}>
                    <td className="details-td">{flight.flightID}</td>
                    <td className="details-td">{flight.airplaneModel}</td>
                    <td className="details-td">
                      <ul>
                        <li>{flight.origin.address}</li>
                        <li>{flight.origin.IATA}</li>
                        <li>{flight.origin.dateAndTime}</li>
                      </ul>
                    </td>
                    <td className="details-td">
                      <ul>
                        <li>{flight.destination.address}</li>
                        <li>{flight.destination.IATA}</li>
                        <li>{flight.destination.dateAndTime}</li>
                      </ul>
                    </td>
                    <td className="details-td">{flight.durationMinutes}</td>
                    {currentUserData.role !== "DataEntryOperator" && (
                      <td>
                        <button
                          className="cancel-btn"
                          onClick={() => handleDelete(flight.flightID)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="buttons-div-search">
        <button onClick={handleBackClick} className="buttons-search">
          Back
        </button>
        {currentUserData.role === "DataEntryOperator" && (
          <button
            onClick={() => setUserMenuItem("schedule-flight")}
            className="buttons-search"
          >
            Schedule a Flight
          </button>
        )}
        <button className="buttons-search" onClick={handleSearch}>
          Search
        </button>
      </div>
      <ConfirmationPopup
        show={showPopup}
        message="Are you sure you want to Delete?"
        onConfirm={handlePopUpConfirmation}
        onCancel={handlePopUpCancel}
      />
      <Snackbar
        ref={snackbarRef_fail}
        message={Snackbardata_fail.message}
        type={Snackbardata_fail.type}
      />
      <Snackbar
        ref={snackbarRef_success}
        message={Snackbardata_success.message}
        type={Snackbardata_success.type}
      />
    </div>
  );
}

export default SearchFlights;
