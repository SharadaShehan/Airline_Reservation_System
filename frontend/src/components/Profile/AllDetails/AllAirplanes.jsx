import React, { useEffect, useState } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import "./details.css";

function AllAirplanes() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { currentUserData } = UserGlobalState();
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

  async function handleDelete(tailNumber) {
    try {
      const response = await axios.delete(
        `${BaseURL}/admin/delete/airplane/${tailNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 204) {
        const newAirplanesList = airplanesList.filter(
          (airplane) => airplane.tailNumber !== tailNumber
        );
        setAirplanesList(newAirplanesList);
        // alert("Messaage: Model Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
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
                  <th className="details-th">Tail Number</th>
                  <th className="details-th">Model Name</th>
                  {currentUserData.role !== "DataEntryOperator" && <th></th>}
                </tr>
              </thead>
              <tbody>
                {airplanesList.map((plane) => (
                  <tr key={plane.tailNumber}>
                    <td className="details-td">{plane.tailNumber}</td>
                    <td className="details-td">{plane.modelName}</td>
                    {currentUserData.role !== "DataEntryOperator" && (
                      <td>
                        <button
                          className="cancel-btn"
                          onClick={() => handleDelete(plane.tailNumber)}
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
            onClick={() => setUserMenuItem("add-airplane")}
            className="buttons"
          >
            Add New Airplane
          </button>
        )}
      </div>
    </div>
  );
}

export default AllAirplanes;
