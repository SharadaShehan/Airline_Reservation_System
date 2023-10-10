import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./viewRevenue.css";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";


function ViewRevenue() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { setUserMenuItem } = UserMenuGlobalState();
  const [modelsList, setModelsList] = useState([]);
  const [isView, setIsView] = useState(false);

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
        }
      }
      getModelsList();
    },
    [BaseURL, token]
  );

  function handleBackClick() {
    setUserMenuItem("profile-details");
  }

  function handleViewClick() {
    setIsView(true);
  }
  return (
    <div className="outer-box">
      <span className="view-revenue">View Revenue By Model</span>
      <div className="inner-box">
        {isView ? (
          <div style={{ height: "375px", overflow: "auto", width: "100%" }}>
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
          </div>
        ) : (
          <div className="no-data">Click view to see the revenue by model</div>
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

export default ViewRevenue;
