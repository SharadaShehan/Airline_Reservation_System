import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./deoAddAirplane.css";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import Snackbar from "../../common/Snackbar";

export default function DEOAddFlight() {
  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [modelID, setModelID] = useState("model");
  const [modelList, setModelList] = useState([]);
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const [tailNumber, setTailNumber] = useState();
  const [tailNumberError, setTailNumberError] = useState(null);

  const snackbarRef_fail = useRef(null);
  const snackbarRef_success = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Check the data and try again!",
  };
  const Snackbardata_success = {
    type: "success",
    message: "Added Airplane Successfully!!",
  };

  useEffect(
    function () {
      async function getModelsList() {
        const token = Cookies.get("access-token");
        try {
          const response = await axios.get(`${BaseURL}/deo/get/models`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setModelList(response.data);
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
      getModelsList();
    },
    [BaseURL, setCurrentUserData]
  );

  async function handleAdd() {
    const token = Cookies.get("access-token");
    const postData = {
      tailNumber: tailNumber,
      modelID: modelID,
    };
    // "tailNumber" : "HL7611",
    // "modelID" : 3
    try {
      const response = await axios.post(
        `${BaseURL}/deo/create/airplane`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.status === 201) {
        snackbarRef_success.current.show();
        handleCancel();
      }
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        snackbarRef_fail.current.show();
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

  const validateTailNumber = () => {
    const TailNumberRegex = /^[A-Za-z0-9]+-?[A-Za-z0-9]+$/;
    if (TailNumberRegex.test(tailNumber) === false) {
      setTailNumberError(`
          Tail Number cannot be empty and should contain letters and numbers like "HL7611"
      `);
    } else {
      setTailNumberError(null);
    }
  };

  const handleInputChange = (event) => {
    setTailNumber(event.target.value);
  };

  function handleBack() {
    handleCancel();
    setUserMenuItem("profile-details");
  }

  function handleCancel() {
    setTailNumber("");
    setModelID("model");
  }

  const onClickModel = (event) => {
    setModelID(event.target.value);
  }

  return (
    <div className="pd-back">
      <div className="fnt-container">
        <div className="form-title">Add an Airplane</div>
        <div className="mid-content-group">
          <div className="form-txt">Select Air Plane Model</div>
          <div className="form-input">
            <select
              className="input-area dropbtn"
              value={modelID}
              onChange={onClickModel}
            >
              <option disabled value="model">
                Model
              </option>
              {modelList.map((airplaneModel) => (
                <option value={airplaneModel.modelID}>
                  {airplaneModel.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-txt">Tail Number</div>
          <input
            type="text"
            value={tailNumber}
            className="input-area form-input"
            placeholder="Tail Number"
            onChange={handleInputChange}
            onBlur={validateTailNumber}
          />
          {tailNumberError && (
            <div className="error-txt">{tailNumberError}</div>
          )}
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
          <button type="button" class="update-button btn" onClick={handleBack}>
            Back
          </button>
          <button
            type="button"
            class="view-button btn"
            onClick={() => setUserMenuItem("all-airplanes")}
          >
            View All Airplanes
          </button>
          <button type="button" class="update-button btn" onClick={handleAdd}>
            Add&nbsp;Airplane
          </button>
        </div>
      </div>
    </div>
  );
}
