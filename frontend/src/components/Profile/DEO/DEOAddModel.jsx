import React, { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import "./deoAddModel.css";
import Snackbar from "../../common/Snackbar";

export default function DEOAddModel() {
  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [name, setName] = useState("");
  const [Economy, setEconomy] = useState();
  const [Business, setBusiness] = useState();
  const [Platinum, setPlatinum] = useState();
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const [nameError, setnameError] = useState(null);

  const snackbarRef_fail = useRef(null);
  const snackbarRef_success = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Check the data and try again!",
  };
  const Snackbardata_success = {
    type: "success",
    message: "Added Model Successfully!",
  };

  async function handleAdd() {
    const token = Cookies.get("access-token");
    const seatsCount = {
      Economy: parseInt(Economy),
      Platinum: parseInt(Platinum),
      Business: parseInt(Business),
    };
    const postData = {
      name: name,
      seatsCount: seatsCount,
    };
    console.log(postData);
    // Request data : {
    //   "name" : "Airbus A860",
    //   "seatsCount" : {
    //   "Economy" : 150,
    //   "Business" : 10,
    //   "Platinum" : 0
    //   }
    //   }
    try {
      const response = await axios.post(
        `${BaseURL}/deo/create/model`,
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
        handleClear();
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

  const validateName = () => {
    const nameRegex = /^[A-Za-z0-9 -]{4,40}$/;
    if (nameRegex.test(name) === false) {
      setnameError(`
            Name cannot be empty and can only contain letters, numbers and space
        `);
    } else {
      setnameError(null);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEconomyChange = (event) => {
    setEconomy(event.target.value);
  };

  const handleBusinessChange = (event) => {
    setBusiness(event.target.value);
  };

  const handlePlatinumChange = (event) => {
    setPlatinum(event.target.value);
  };

  function handleBack() {
    handleClear();
    setUserMenuItem("profile-details");
  }

  function handleClear() {
    setName("");
    setEconomy();
    setBusiness();
    setPlatinum();
  }

  return (
    <div className="pd-back">
      <div className="fnt-container">
        <div className="form-title">Add a Air Plane Model</div>
        <div className="mid-content-group">
          <div className="form-txt">Enter Name</div>
          <input
            type="text"
            value={name}
            className="input-area form-input"
            placeholder="Enter Model Name"
            onChange={handleNameChange}
            onBlur={validateName}
          />
          {nameError && <div className="error-txt">{nameError}</div>}
          <div className="count-select">
            <div className="sub-grp-count">
              <div className="form-txt">Enter Economy Class Seats count</div>
              <input
                type="number"
                value={Economy}
                className="input-area-model form-input"
                placeholder="Economy Class Seats count"
                onChange={handleEconomyChange}
                min="0"
                required
              />
            </div>
            <div className="sub-grp-count">
              <div className="form-txt">Enter Business Class Seats count</div>
              <input
                type="number"
                value={Business}
                className="input-area-model form-input"
                placeholder="Business Class Seats count"
                onChange={handleBusinessChange}
                min="0"
                required
              />
            </div>
            <div className="sub-grp-count">
              <div className="form-txt">Enter Platinum Class Seats count</div>
              <input
                type="number"
                value={Platinum}
                className="input-area-model form-input"
                placeholder="Platinum Class Seats count"
                onChange={handlePlatinumChange}
                min="0"
                required
              />
            </div>
          </div>
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
            onClick={() => setUserMenuItem("all-models")}
          >
            View All Models
          </button>
          <button type="button" class="update-button btn" onClick={handleAdd}>
            Add&nbsp;Model
          </button>
        </div>
      </div>
    </div>
  );
}
