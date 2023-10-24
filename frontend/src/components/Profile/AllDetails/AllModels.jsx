import React from "react";
import { useState, useEffect } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import "./details.css";

function AllModels() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");
  const { setUserMenuItem } = UserMenuGlobalState();

  const [modelsList, setModelsList] = useState([]);

  useEffect(
    function () {
      async function getAllModels() {
        try {
          const response = await axios.get(`${BaseURL}/deo/get/models`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setModelsList(response.data);
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
      <span className="view-revenue">All Models</span>
      <div className="inner-box">
        {modelsList.length ? (
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
                  <th>Model ID</th>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {modelsList.map((model) => (
                  <tr key={model.modelID}>
                    <td>{model.modelID}</td>
                    <td>{model.name}</td>
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

export default AllModels;
