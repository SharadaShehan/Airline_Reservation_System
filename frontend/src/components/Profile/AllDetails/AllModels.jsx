import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import "./details.css";
import ConfirmationPopup from '../../common/ConfirmationPopup';
import Snackbar from "../../common/Snackbar"

function AllModels() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { currentUserData, setCurrentUserData } = UserGlobalState();
  const { setUserMenuItem } = UserMenuGlobalState();

  const [modelsList, setModelsList] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const snackbarRef_fail = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Failed to Delete Model !"
  };
  const snackbarRef_success = useRef(null);
  const Snackbardata_success = {
    type: "success",
    message: "Deleted the Model Successfully !"
  };

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

  async function handlePopUpConfirmation(modelID) {
    try {
      const response = await axios.delete(
        `${BaseURL}/admin/delete/model/${modelID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 204) {
        const newModelsList = modelsList.filter(
          (model) => model.modelID !== modelID
        );
        setModelsList(newModelsList);
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
                  <th className="details-th">Model ID</th>
                  <th className="details-th">Name</th>
                  {currentUserData.role !== "DataEntryOperator" && <th></th>}
                </tr>
              </thead>
              <tbody>
                {modelsList.map((model) => (
                  <tr key={model.modelID}>
                    <td className="details-td">{model.modelID}</td>
                    <td className="details-td">{model.name}</td>
                    {currentUserData.role !== "DataEntryOperator" && (
                      <td>
                        <button
                          className="cancel-btn"
                          onClick={() => handleDelete(model.modelID)}
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
            onClick={() => setUserMenuItem("add-model")}
            className="buttons"
          >
            Add Model
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

export default AllModels;
