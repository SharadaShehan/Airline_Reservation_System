import React, {useState, useRef} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import './deoAddAirport.css';
import Snackbar from "../../common/Snackbar"

export default function DEOAddAirport () {
    const { setUserMenuItem } = UserMenuGlobalState();
    const [ICAO, setICAOCode] = useState('');
    const [IATA, setIATACode] = useState('');
    const [location, setLocation] = useState([]);
    const [inputLocation, setInputLocation] = useState('');
    const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

    const snackbarRef_fail = useRef(null);
    const snackbarRef_success = useRef(null);
    const Snackbardata_fail = {
      type: "fail",
      message: "Check the data and try again!"
    };
    const Snackbardata_success={
      type: "success",
      message: "Added Airport Successfully!"
    };

    async function handleAdd() {
      const token = Cookies.get("access-token");
      // "ICAO" : "KJFK",
      // "IATA" : "JFK",
      // "location" : [ "New York", "United Status" ]
      const postData = {
        ICAO : ICAO,
        IATA : IATA,
        location : location
      }
      console.log(postData);
      try {
        const response = await axios.post(
          `${BaseURL}/deo/create/airport`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(response);
        if (response.status === 201) {
          snackbarRef_success.current.show();
          handleClear();
        }
      } catch (err) {
        console.log(err);
        if(err.response && err.response.status === 401){
          snackbarRef_fail.current.show();
        }
      }
    }

    const handleInputIATAChange = (event) => {
      setIATACode(event.target.value);
    }

    const handleInputICAOChange = (event) => {
      setICAOCode(event.target.value);
    }

    const handleInputLocationChange = (event) => {
      setInputLocation(event.target.value);
      const separatedData = inputLocation.split(',');
      const cleanedData = separatedData.map(item => item.trim());
      setLocation(cleanedData);
    }

    function handleBack() {
      handleClear();
      setUserMenuItem("profile-details");
    }

    function handleClear(){
      setICAOCode('');
      setIATACode('');
      setLocation([]);
      setInputLocation('');
    }

    return (
      <div className='pd-back'>
        <div className='gls-back'></div>
        <div className='fnt-cont'>
          <div className='form-title'>
            Add an Airport
          </div>
          <div className='mid-content-group'>
            <div className='form-txt'>
              Enter ICAO Code
            </div>
            <input
              type="text"
              value={ICAO}
              className='input-area form-input' 
              placeholder='ICAO Code'
              onChange={handleInputICAOChange}
            />
            <div className='form-txt'>
              IATA Code
            </div>
            <input
              type="text"
              value={IATA}
              className='input-area form-input' 
              placeholder='IATA Code'
              onChange={handleInputIATAChange}
            />
            <div className='form-txt'>
              Enter location
            </div>
            <input 
              type="text"
              value={inputLocation} 
              className='input-area form-input' 
              placeholder='Enter location separated by commas'
              onChange={handleInputLocationChange}
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
            <button type="button" class="update-button btn" onClick={handleBack}>Back</button>
            <button type="button" class="update-button btn" onClick={handleAdd}>Add&nbsp;Airport</button>    
          </div>
        </div>
      </div>
    );
};
