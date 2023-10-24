import React, { useEffect, useState } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import "./details.css";
import axios from "axios";
import Cookies from "js-cookie";

function AllAirports() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");
  const { setUserMenuItem } = UserMenuGlobalState();

  const [airportsList, setAirportsList] = useState([]);

  useEffect(
    function () {
      async function getAllModels() {
        try {
          const response = await axios.get(`${BaseURL}/deo/get/airports`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setAirportsList(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      getAllModels();
    },
    [BaseURL, token]
  );

  function handleBackClick() {
    setUserMenuItem("view-details");
  }

  return (
    <div className="outer-box">
      <span className="view-revenue">All Airports</span>
      <div className="inner-box">
        {airportsList.length ? (
          <div
            style={{
              height: "375px",
              overflow: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>City</th>
                  <th>IATA Code</th>
                  <th>ICAO Code</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {airportsList.map((airport) => (
                  <tr key={airport.icaoCode}>
                    <td>{airport.city}</td>
                    <td>{airport.iataCode}</td>
                    <td>{airport.icaoCode}</td>
                    <td>
                      <button className="cancel-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 className="loading-text">Loading Details Please Wait....</h4>
        )}
      </div>

      <div className="buttons-div">
        <button onClick={handleBackClick} className="buttons">
          Back
        </button>
      </div>
    </div>
  );
}

export default AllAirports;
