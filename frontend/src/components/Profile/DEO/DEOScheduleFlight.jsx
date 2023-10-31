import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./deoScheduleFlight.css";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import Snackbar from "../../common/Snackbar";

export default function DEOScheduleFlight() {
  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [routeList, setRouteList] = useState([]);
  const [routeID, setRouteID] = useState("Route");
  const [airplanesList, setAirplanesList] = useState([]);
  const [tailNumber, setTailNumber] = useState("Airplane");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const snackbarRef_fail = useRef(null);
  const snackbarRef_success = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Check the data and try again!",
  };
  const Snackbardata_success = {
    type: "success",
    message: "Scheduled Flight Successfully!!",
  };

  async function handleSchedule() {
    const token = Cookies.get("access-token");

    console.log(routeID, tailNumber, date, time);
    const postData = {
      route: parseInt(routeID),
      airplane: tailNumber,
      departureDate: date,
      departureTime: time,
    };

    console.log(postData);
    try {
      const response = await axios.post(
        `${BaseURL}/deo/schedule-flight`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        snackbarRef_success.current.show();
        handleClear();
      }
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        snackbarRef_fail.current.show();
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

  useEffect(
    function () {
      async function getRoutesList() {
        try {
          const token = Cookies.get("access-token");
          const response = await axios.get(`${BaseURL}/deo/get/routes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setRouteList(response.data);
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
      getRoutesList();
    },
    [BaseURL, setCurrentUserData]
  );

  useEffect(
    function () {
      async function getAirplanesList() {
        try {
          const token = Cookies.get("access-token");
          const response = await axios.get(`${BaseURL}/deo/get/airplanes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setAirplanesList(response.data);
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
      getAirplanesList();
    },
    [BaseURL, setCurrentUserData]
  );

  function handleClear() {
    setRouteID("Route");
    setTailNumber("Airplane");
    setDate("");
    setTime("");
  }
  const handleBack = () => {
    handleClear();
    setUserMenuItem("profile-details");
  };

  const handleRouteID = (event) => {
    setRouteID(event.target.value);
  };
  const handleTailNumber = (event) => {
    setTailNumber(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div className="pd-back">
      <div className="fnt-container">
        <div className="form-title">Schedule a Flight</div>
        <div className="mid-content-group">
          <div className="form-txt">Select Route</div>
          <select
            className="input-area form-input"
            value={routeID}
            onChange={handleRouteID}
          >
            <option disabled value="Route">
              Route
            </option>
            {routeList.map((route) => (
              <option value={route.routeID}>
                {route.fromCity}({route.fromIATA}) to {route.toCity}(
                {route.toIATA})
              </option>
            ))}
          </select>

          <div className="form-txt">Select Air Plane</div>

          <select
            className="input-area form-input"
            value={tailNumber}
            onChange={handleTailNumber}
          >
            <option disabled value="Airplane">
              Airplane
            </option>
            {airplanesList.map((airplane) => (
              <option value={airplane.tailNumber}>{airplane.tailNumber}</option>
            ))}
          </select>

          <div className="form-txt">Select Departure Date</div>
          <input
            type="date"
            value={date}
            className="input-area form-input"
            onChange={handleDateChange}
          />
          <div className="form-txt">Select Departure Time</div>
          <input
            type="time"
            value={time}
            className="input-area form-input"
            onChange={handleTimeChange}
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
          <button type="button" class="update-button btn" onClick={handleBack}>
            Back
          </button>
          <button
            type="button"
            class="view-button btn"
            onClick={() => setUserMenuItem("search-flights")}
          >
            All Flights
          </button>
          <button
            type="button"
            class="update-button btn"
            onClick={handleSchedule}
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
