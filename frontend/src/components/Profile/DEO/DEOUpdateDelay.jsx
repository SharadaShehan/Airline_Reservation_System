import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import "./deoUpdateDelay.css";
import Snackbar from "../../common/Snackbar";

export default function DEOUpdateDelay() {
  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [delayMinutes, setDelayMinutes] = useState();
  const [scheduledFlightID, setFlightID] = useState();
  const [airportsList, setAirportsList] = useState([]);
  const [origin, setOrigin] = useState("origin");
  const [destination, setDestination] = useState("destination");
  const [date, setDate] = useState();
  const [flights, setFlights] = useState([]);
  const [flightModel, setFlightModel] = useState();
  const [duration, setDuration] = useState();
  const [IATA_1, setIATA_1] = useState();
  const [address_1, setAddress_1] = useState();
  const [begintime, setBegintime] = useState();
  const [IATA_2, setIATA_2] = useState();
  const [address_2, setAddress_2] = useState();
  const [endtime, setEndtime] = useState();

  const snackbarRef_fail = useRef(null);
  const snackbarRef_success = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Check the data and try again!",
  };
  const Snackbardata_success = {
    type: "success",
    message: "Updated Delay Successfully!",
  };

  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(
    function () {
      async function getAirportsList() {
        const token = Cookies.get("access-token");
        try {
          const response = await axios.get(`${BaseURL}/get/airports`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
      setFlights(response.data);
    } catch (error) {
      snackbarRef_fail.current.show();
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

  async function handleUpdate() {
    const token = Cookies.get("access-token");
    console.log(scheduledFlightID, delayMinutes);
    const postData = {
      scheduledFlightID: scheduledFlightID,
      delayMinutes: delayMinutes,
    };
    try {
      const response = await axios.patch(
        `${BaseURL}/deo/update/delay`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
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

  const handleDelayChange = (event) => {
    setDelayMinutes(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const onClickOrigin = (event) => {
    setOrigin(event.target.value);
  };
  const onClickDestination = (event) => {
    setDestination(event.target.value);
  };
  const handleFlightSelect = (flight) => (event) => {
    setFlightID(flight.flightID);
    setFlightModel(flight.airplaneModel);
    setDuration(flight.durationMinutes);
    setIATA_1(flight.origin.IATA);
    setIATA_2(flight.destination.IATA);
    setBegintime(flight.origin.dateAndTime);
    setEndtime(flight.destination.dateAndTime);
    setAddress_1(flight.origin.address);
    setAddress_2(flight.destination.address);
  };

  function handleBack() {
    handleClear();
    setUserMenuItem("profile-details");
  }

  function handleClear() {
    setOrigin("origin");
    setDestination("destination");
    setDate(null);
    setFlights([]);
    setFlightID(null);
    setFlightModel(null);
    setDuration(null);
    setIATA_1(null);
    setIATA_2(null);
    setBegintime(null);
    setEndtime(null);
    setAddress_1(null);
    setAddress_2(null);
    setDelayMinutes(null);
  }
  return (
    <div className="pd-back">
      <div className="fnt-container">
        <div className="form-title">Update Delay in a Flight</div>
        <div className="form-ud-1">
          <div className="form-sub-grp">
            <div className="form-sub-sub-l">
              <div className="form-sub-title">Update Delay</div>
              <form className="form-1">
                <table>
                  <tr>
                    <td className="data-cell">
                      <select
                        className="input-area-delay form-control"
                        value={origin}
                        onChange={onClickOrigin}
                      >
                        <option disabled value="origin">
                          Origin
                        </option>
                        {airportsList.map((airport) => (
                          <option
                            value={airport.icaoCode}
                            key={airport.icaoCode}
                          >
                            {airport.city} ({airport.iataCode})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="data-cell">
                      <select
                        className="input-area-delay form-control"
                        value={destination}
                        onChange={onClickDestination}
                      >
                        <option disabled value="destination">
                          Destination
                        </option>
                        {airportsList.map((airport) => (
                          <option
                            value={airport.icaoCode}
                            key={airport.icaoCode}
                          >
                            {airport.city} ({airport.iataCode})
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="data-cell">
                      <input
                        value={date}
                        className="input-area form-control"
                        type="date"
                        min="2023-10-01"
                        max="2023-12-31"
                        onChange={handleDateChange}
                      />
                    </td>
                    <td className="data-cell">
                      <button
                        type="button"
                        class="update-button-search btn"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </td>
                  </tr>
                  
                </table>
                <div className="data-view-tbl">
                  {flights.length === 0 ? (
                    <div className="no-passengers-deo">
                      Select Origin and Destination airports
                    </div>
                  ) : (
                    <div>
                      <table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Model</th>
                            <th>Duration</th>
                            <th>Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          {flights.map((flight) => (
                            <tr key={uuidv4()}>
                              <td>{flight.flightID}</td>
                              <td>{flight.airplaneModel}</td>
                              <td>{flight.durationMinutes} mins</td>
                              <td>
                                {" "}
                                <button
                                  type="button"
                                  className="data-select-btn btn"
                                  onClick={handleFlightSelect(flight)}
                                >
                                  {" "}
                                  Select
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <table>
                  <tr>
                    <td className="data-cell">
                      <div className="form-txt">Delay in Minutes</div>
                    </td>
                    <td className="data-cell">
                      <input
                        type="number"
                        value={delayMinutes}
                        class="delay-input form-control"
                        placeholder="Delay"
                        onChange={handleDelayChange}
                        min="0"
                        required
                      />
                    </td>
                    <td className="data-cell">
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
                      <button
                        type="button"
                        class="update-button btn"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    </td>
                    <td className="data-cell">
                      <button
                        type="button"
                        class="update-button btn"
                        onClick={handleBack}
                      >
                        Back
                      </button>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
          </div>
          <div className="form-sub-grp">
            <div className="form-sub-sub-r">
              <div className="form-sub-title">Flight Details</div>
              <div className="data-txt">Flight ID : {scheduledFlightID}</div>
              <div className="data-txt">Air Plane Model : {flightModel}</div>
              <div className="data-txt">Duration : {`${Math.floor(duration/60)} hr and ${duration%60} min`}</div>
              <div className="data-txt">Origin : {origin}</div>
              <div className="data-txt">Origin Airport : {address_1}</div>
              <div className="data-txt">IATA : {IATA_1}</div>
              <div className="data-txt">Departure : {begintime}</div>
              <div className="data-txt">Destination : {destination}</div>
              <div className="data-txt">IATA : {IATA_2}</div>
              <div className="data-txt">Destination Airport : {address_2}</div>
              <div className="data-txt">Arrival : {endtime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
