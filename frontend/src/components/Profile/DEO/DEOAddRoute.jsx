import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./deoAddRoute.css";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import Snackbar from "../../common/Snackbar";

export default function DEOAddRoute() {
  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [airportList, setAirportList] = useState([]);
  const [origin, setOrigin] = useState("origin");
  const [destination, setDestination] = useState("destination");
  const [durationMinutes, setDurationMinutes] = useState();
  const [Economy, setEconomy] = useState();
  const [Business, setBusiness] = useState();
  const [Platinum, setPlatinum] = useState();
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const snackbarRef_fail = useRef(null);
  const snackbarRef_success = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Check the data and try again!",
  };
  const Snackbardata_success = {
    type: "success",
    message: "Added Route Successfully!",
  };

  useEffect(
    function () {
      async function getAirportsList() {
        try {
          const token = Cookies.get("access-token");
          const response = await axios.get(`${BaseURL}/deo/get/airports`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setAirportList(response.data);
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

  async function handleAdd() {
    const token = Cookies.get("access-token");
    const basePrice = {
      Economy: parseFloat(Economy),
      Business: parseFloat(Business),
      Platinum: parseFloat(Platinum),
    };
    const postData = {
      origin: origin,
      destination: destination,
      durationMinutes: parseInt(durationMinutes),
      basePrice: basePrice,
    };
    // Request data : {
    //   "origin" : "VCRI",
    //   "destination" : "VOMM",
    //   "durationMinutes" : 140,
    //   "basePrice" : {
    //   "Economy" : 200,
    //   "Business" : 400,
    //   "Platinum" : 600.50
    //   }
    // }
    try {
      console.log(postData);
      const response = await axios.post(
        `${BaseURL}/deo/create/route`,
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

  const inputDestination = (event) => {
    setDestination(event.target.value);
  };

  const inputOrigin = (event) => {
    setOrigin(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDurationMinutes(event.target.value);
  };

  const handleEconomyChange = (event) => {
    setEconomy(event.target.value);
  };

  const handleBusinessChange = (event) => {
    setBusiness(event.target.value);
  };

  const handlePlatinumChange = (event) => {
    setPlatinum(event.target.value);
  };

  function handleBack() {
    handleClear();
    setUserMenuItem("profile-details");
  }

  function handleClear() {
    setOrigin("origin");
    setDestination("destination");
    setDurationMinutes();
    setEconomy();
    setBusiness();
    setPlatinum();
  }

  return (
    <div className="pd-back">
      <div className="fnt-container">
        <div className="form-title">Add a Route</div>
        <div className="mid-content-group">
          <div className="form-txt">Select Origin</div>
          <div className="form-input">
            <select
              className="input-area dropbtn"
              value={origin}
              onChange={inputOrigin}
              placeholder="Select Origin"
            >
              <option disabled value="origin">
                Origin
              </option>
              {airportList.map((airport) => (
                <option value={airport.icaoCode} key={airport.city}>
                  {airport.city} ({airport.iataCode})
                </option>
              ))}
            </select>
          </div>
          <div className="form-txt">Select Destination</div>
          <div className="form-input">
            <select
              className="input-area dropbtn"
              value={destination}
              onChange={inputDestination}
            >
              <option disabled value="destination">
                Destination
              </option>
              {airportList.map((airport) => (
                <option value={airport.icaoCode} key={airport.city}>
                  {airport.city} ({airport.iataCode})
                </option>
              ))}
            </select>
          </div>

          <div className="form-txt">Duration&nbsp;(in&nbsp;Minutes)</div>
          <input
            type="number"
            value={durationMinutes}
            className="input-area form-input"
            placeholder="Enter Duration in Minutes"
            onChange={handleDurationChange}
            min={"0"}
            required
          />
          <div className="count-select">
            <div className="sub-grp-count">
              <div className="form-txt">Price Economy Class</div>
              <input
                type="number"
                value={Economy}
                className="input-area form-input"
                placeholder="Price Economy Class"
                onChange={handleEconomyChange}
                min={"0"}
                required
              />
            </div>
            <div className="sub-grp-count">
              <div className="form-txt">Price Business Class</div>
              <input
                type="number"
                value={Business}
                className="input-area form-input"
                placeholder="Price Business Class"
                onChange={handleBusinessChange}
                min={"0"}
                required
              />
            </div>
            <div className="sub-grp-count">
              <div className="form-txt">Price Platinum Class</div>
              <input
                type="number"
                value={Platinum}
                className="input-area form-input"
                placeholder="Price Platinum Class"
                onChange={handlePlatinumChange}
                min={"0"}
                required
              />
            </div>
          </div>
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
            onClick={() => setUserMenuItem("all-routes")}
          >
            View All Routes
          </button>
          <button type="button" class="update-button btn" onClick={handleAdd}>
            Add&nbsp;Route
          </button>
        </div>
      </div>
    </div>
  );
}
