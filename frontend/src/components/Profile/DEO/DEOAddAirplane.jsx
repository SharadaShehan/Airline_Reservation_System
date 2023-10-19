import React, {useState, useEffect} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import './deoAddAirplane.css';
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";


export default function DEOAddFlight () {
  const { setUserMenuItem } = UserMenuGlobalState();
  const [modelID, setModelID] = useState("Select Airplane Model");
  const [modelList, setModelList] = useState([]);
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const [tailNumber, setTailNumber] = useState();

  useEffect(
    function () {
      async function getModelsList() {
        try {
          const response = await axios.get(`${BaseURL}/get/models`);
          console.log(response.data);
          setModelList(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      getModelsList();
    },
    [BaseURL]
  );

  function handleBack() {
    setTailNumber("Tail Number");
    setModelID("Select Airplane Model");
    setUserMenuItem("profile-details");
  }

  async function handleAdd() {
    const token = Cookies.get("access-token");
    const postData = {
      tailNumber : tailNumber,
      modelID : modelID
    }

    try {
      const response = await axios.post(
        `${BaseURL}/deo/create/airplane`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      
      console.log(response);
      if (response.status === 201) {
        alert("Airplane Added Successfully");
        handleBack();
      }
    } catch (err) {
      console.log(err);
      if(err.response && err.response.status === 401){
        setModelID(null);
        setTailNumber(null);
      }
    }
  }

  const handleInputChange = (event) => {
    setTailNumber(event.target.value);
  }

    return (
      <div className='pd-back'>
        <div className='gls-back'></div>
        <div className='fnt-cont'>
          <div className='form-title'>
            Add an Airplane
          </div>
          <div className='mid-content-group'>
            <div className='form-txt'>
              Select Air Plane Model
            </div>
            <div className='form-input'>
              <select
                className="input-area dropbtn"
                value={modelID}
                onChange={(e) => setModelID(e.target.value)}
              >
                <option disabled value="model">
                  Select AirpLane Model
                </option>
                {modelList.map((airplaneModel) => (
                  <option
                    value={airplaneModel.modelID}
                    key={airplaneModel.name}
                  >
                    {airplaneModel.modelID}  :  ({airplaneModel.name})
                  </option>
                ))}
              </select>
            </div>
            
            <div className='form-txt'>
              Tail Number
            </div>
            <input
              type="text"
              value={tailNumber}
              className='input-area form-input' 
              placeholder='Tail Number'
              onChange={handleInputChange}
            />
            <button type="button" class="update-button btn" onClick={handleBack}>Back</button>
            <button type="button" class="update-button btn" onClick={handleAdd}>Add&nbsp;Flight</button>    
          </div>
        </div>
      </div>
    );
};