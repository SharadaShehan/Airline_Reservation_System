import React, { useEffect, useState } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import "./details.css";

function AllAirplanes() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");
  const { setUserMenuItem } = UserMenuGlobalState();

  const [airplanesList, setAirplanesList] = useState([]);

  useEffect(
    function () {
      async function getAllModels() {
        try {
          const response = await axios.get(`${BaseURL}/deo/get/airplanes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setAirplanesList(response.data);
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
      <span className="view-revenue">All Airplanes</span>
      <div className="inner-box">
        {airplanesList.length ? (
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
                  <th>Tail Number</th>
                  <th>Model Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {airplanesList.map((plane) => (
                  <tr key={plane.tailNumber}>
                    <td>{plane.tailNumber}</td>
                    <td>{plane.modelName}</td>
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

export default AllAirplanes;
