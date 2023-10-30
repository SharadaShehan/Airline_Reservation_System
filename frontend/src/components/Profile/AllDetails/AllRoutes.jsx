import React, { useEffect, useState, useRef } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import "./details.css";
import axios from "axios";
import Cookies from "js-cookie";
import ConfirmationPopup from '../../common/ConfirmationPopup';
import Snackbar from "../../common/Snackbar"

function AllRoutes() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { currentUserData, setCurrentUserData } = UserGlobalState();
  const { setUserMenuItem } = UserMenuGlobalState();

  const [routesList, setRoutesList] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const snackbarRef_fail = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Failed to Delete Route!"
  };
  const snackbarRef_success = useRef(null);
  const Snackbardata_success = {
    type: "success",
    message: "Deleted the Route Successfully !"
  };

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
      getAllModels();
    },
    [BaseURL, token, setCurrentUserData]
  );

  function handleBackClick() {
    setUserMenuItem("view-details");
  }

  async function handlePopUpConfirmation(routeID) {
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
        setShowPopup(false);
        snackbarRef_success.current.show();
        // alert("Messaage: Model Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      setShowPopup(false);
      snackbarRef_fail.current.show();

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

  function handleDelete(){
    setShowPopup(true)
  }

  function handlePopUpCancel(){
    setShowPopup(false);
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
                  <th className="details-th">Route ID</th>
                  <th className="details-th">From City</th>
                  <th className="details-th">IATA / ICAO</th>
                  <th className="details-th">To City</th>
                  <th className="details-th">IATA / ICAO</th>
                  <th className="details-th">Duration (Mins)</th>
                  {currentUserData.role !== "DataEntryOperator" && <th></th>}
                </tr>
              </thead>
              <tbody>
                {routesList.map((route) => (
                  <tr key={route.routeID}>
                    <td className="details-td">{route.routeID}</td>
                    <td className="details-td">{route.fromCity}</td>
                    <td className="details-td">
                      {route.fromIATA + " / " + route.fromICAO}
                    </td>
                    <td className="details-td">{route.toCity}</td>
                    <td className="details-td">
                      {route.toIATA + " / " + route.toICAO}
                    </td>
                    <td className="details-td">{route.durationMinutes}</td>
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

      <div className="buttons-div-details">
        <button onClick={handleBackClick} className="buttons">
          Back
        </button>
        {currentUserData.role === "DataEntryOperator" && (
          <button
            onClick={() => setUserMenuItem("add-route")}
            className="buttons"
          >
            Add Route
          </button>
        )}
      </div>
      <ConfirmationPopup
        show={showPopup}
        message="Are you sure you want to Delete?"
        onConfirm={handlePopUpConfirmation}
        onCancel={handlePopUpCancel}
      />
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
    </div>
  );
}

export default AllRoutes;
