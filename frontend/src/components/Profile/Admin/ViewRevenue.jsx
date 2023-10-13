import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./viewRevenue.css";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";

function ViewRevenue() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [modelsList, setModelsList] = useState([]);

  useEffect(
    function () {
      async function getModelsList() {
        try {
          const response = await axios.get(
            `${BaseURL}/admin/revenue-by-model`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setModelsList(response.data);
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 401) {
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
      getModelsList();
    },
    [BaseURL, token, setCurrentUserData]
  );

  function handleBackClick() {
    setUserMenuItem("profile-details");
  }

  return (
    <div className="outer-box">
      <span className="view-revenue">View Revenue By Model</span>
      <div className="inner-box">
        <div style={{ height: "375px", overflow: "auto", width: "100%" }}>
          {modelsList.length ? (
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Booking Sets Count</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {modelsList.map((model) => (
                  <tr key={model.model}>
                    <td>{model.model}</td>
                    <td>{model.bookingSetsCount}</td>
                    <td>{model.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h4 className="loading-text">Loading Details Please Wait....</h4>
          )}
        </div>
      </div>
      <div className="buttons-div">
        <button onClick={handleBackClick} className="buttons">
          Back
        </button>
      </div>
    </div>
  );
}

export default ViewRevenue;
