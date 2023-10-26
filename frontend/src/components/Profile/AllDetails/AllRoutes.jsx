import React, { useEffect, useState } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import "./details.css";
import axios from "axios";
import Cookies from "js-cookie";

function AllRoutes() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { currentUserData } = UserGlobalState();
  const { setUserMenuItem } = UserMenuGlobalState();

  const [routesList, setRoutesList] = useState([]);

  useEffect(
    function () {
      async function getAllModels() {
        try {
          const response = await axios.get(`${BaseURL}/deo/get/routes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setRoutesList(response.data);
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

  async function handleDelete(routeID) {
    try {
      const response = await axios.delete(
        `${BaseURL}/admin/delete/route/${routeID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 204) {
        const newRoutesList = routesList.filter(
          (route) => route.routeID !== routeID
        );
        setRoutesList(newRoutesList);
        // alert("Messaage: Model Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

  return (
    <div className="outer-box">
      <span className="view-revenue">All Routes</span>
      <div className="inner-box">
        {routesList.length ? (
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
                  <th>Route ID</th>
                  <th>From City</th>
                  <th>IATA / ICAO</th>
                  <th>To City</th>
                  <th>IATA / ICAO</th>
                  <th>Duration (Mins)</th>
                  {currentUserData.role !== "DataEntryOperator" && <th></th>}
                </tr>
              </thead>
              <tbody>
                {routesList.map((route) => (
                  <tr key={route.routeID}>
                    <td>{route.routeID}</td>
                    <td>{route.fromCity}</td>
                    <td>{route.fromIATA + " / " + route.fromICAO}</td>
                    <td>{route.toCity}</td>
                    <td>{route.toIATA + " / " + route.toICAO}</td>
                    <td>{route.durationMinutes}</td>
                    {currentUserData.role !== "DataEntryOperator" && (
                      <td>
                        <button
                          className="cancel-btn"
                          onClick={() => handleDelete(route.routeID)}
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

      <div className="buttons-div">
        <button onClick={handleBackClick} className="buttons">
          Back
        </button>
      </div>
    </div>
  );
}

export default AllRoutes;
