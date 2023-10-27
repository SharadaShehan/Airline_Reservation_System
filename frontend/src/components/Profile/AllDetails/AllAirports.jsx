import React, { useEffect, useState } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import "./details.css";
import axios from "axios";
import Cookies from "js-cookie";

function AllAirports() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { currentUserData } = UserGlobalState();
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

  async function handleDelete(icaoCode) {
    try {
      const response = await axios.delete(
        `${BaseURL}/admin/delete/airport/${icaoCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 204) {
        const newAirportsList = airportsList.filter(
          (airport) => airport.icaoCode !== icaoCode
        );
        setAirportsList(newAirportsList);
        // alert("Messaage: Model Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
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
                  <th className="details-th">City</th>
                  <th className="details-th">IATA Code</th>
                  <th className="details-th">ICAO Code</th>
                  {currentUserData.role !== "DataEntryOperator" && <th></th>}
                </tr>
              </thead>
              <tbody>
                {airportsList.map((airport) => (
                  <tr key={airport.icaoCode}>
                    <td className="details-td">{airport.city}</td>
                    <td className="details-td">{airport.iataCode}</td>
                    <td className="details-td">{airport.icaoCode}</td>
                    {currentUserData.role !== "DataEntryOperator" && (
                      <td>
                        <button
                          className="cancel-btn"
                          onClick={() => handleDelete(airport.icaoCode)}
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
        ) : (
          <h4 className="loading-text">Loading Details Please Wait....</h4>
        )}
      </div>

      <div className="buttons-div-details">
        <button onClick={handleBackClick} className="buttons">
          Back
        </button>
        {currentUserData.role === "DataEntryOperator" && (
          <button
            onClick={() => setUserMenuItem("add-airport")}
            className="buttons"
          >
            Add New Airport
          </button>
        )}
      </div>
    </div>
  );
}

export default AllAirports;
