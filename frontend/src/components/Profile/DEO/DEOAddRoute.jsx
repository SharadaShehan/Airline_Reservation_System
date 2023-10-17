import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './deoAddRoute.css';
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";

export default function DEOAddRoute () {
  const { setUserMenuItem } = UserMenuGlobalState();
  const [airportList, setAirportList] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [durationMinutes, setDurationMinutes] = useState();
  const [Economy, setEconomy] = useState();
  const [Business, setBusiness] = useState();
  const [Platinum, setPlatinum] = useState();
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(
    function () {
      async function getAirportsList() {
        try {
          const response = await axios.get(`${BaseURL}/get/airports`);
          console.log(response.data);
          setAirportList(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      getAirportsList();
    },
    [BaseURL]
  );

  const inputDestination = (event) => {
    setDestination(event.target.value);
  }

  const inputOrigin = (event) => {
    setOrigin(event.target.value);
  }

  const handleDurationChange = (event) => {
    setDurationMinutes(event.target.value);
  }

  const handleEconomyChange = (event) => {
    setEconomy(event.target.value);
  }

  const handleBusinessChange = (event) => {
    setBusiness(event.target.value);
  }

  const handlePlatinumChange = (event) => {
    setPlatinum(event.target.value);
  }

  async function handleAdd() {
    const token = Cookies.get("access-token");
    const basePrice = {
      Economy : Economy,
      Business : Business,
      Platinum : Platinum
    }
    const postData = {
      origin : origin,
      destination : destination,
      durationMinutes : durationMinutes,
      basePrice : basePrice
    }
    // Request data : {
    //   "origin" : "VCRI",
    //   "destination" : "VOMM",
    //   "durationMinutes" : 140,
    //   "basePrice" : {
    //   "Economy" : 200,
    //   "Business" : 400,
    //   "Platinum" : 600.50
    //   }
    // }
    try {
      const response = await axios.post(
        `${BaseURL}/deo/create/route`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      
      console.log(response);
      if (response.status === 201) {
        alert("Route Added Successfully");
        handleBack();
      }
    } catch (err) {
      console.log(err);
      if(err.response && err.response.status === 401){

      }
    }
  }

  function handleBack() {
    setUserMenuItem("profile-details");
  }

    return (
      <div className='pd-back'>
        <div className='gls-back'></div>
        <div className='fnt-cont'>
          <div className='form-title'>
            Add a Route
          </div>
          <div className='mid-content-group'>
            <div className='form-txt'>
              Select Origin
            </div>
            <div className='form-input'>
              <select
                className="input-area dropbtn"
                value={origin}
                onChange={inputOrigin}
              >
                <option disabled value="origin">
                  Select Origin
                </option>
                {airportList.map((airport) => (
                  <option
                    value={airport.icaoCode}
                    key={airport.city}
                  >
                    {airport.city}  :  ({airport.icaoCode}) : ({airport.iataCode})
                  </option>
                ))}
              </select>
            </div>
            <div className='form-txt'>
              Select Destination
            </div>
            <div className='form-input'>
              <select
                className="input-area dropbtn"
                value={destination}
                onChange={inputDestination}
              >
                <option disabled value="destination">
                  Select Destination
                </option>
                {airportList.map((airport) => (
                  <option
                    value={airport.icaoCode}
                    key={airport.city}
                  >
                    {airport.city}  :  ({airport.icaoCode}) : ({airport.iataCode})
                  </option>
                ))}
              </select>
            </div>

            <div className='form-txt'>
              Duration&nbsp;(in&nbsp;Minutes)
            </div>
            <input 
              type="number"
              value={durationMinutes} 
              className='input-area form-input' 
              placeholder='Enter Destination in Minutes'
              onChange={handleDurationChange}
            />
             <div className='count-select'>
              <div className='sub-grp-count'>
                <div className='form-txt'>
                  Price Economy Class
                </div>
                <input 
                  type="number" 
                  value={Economy}
                  className='input-area form-input' 
                  placeholder='Price Economy Class'
                  onChange={handleEconomyChange} 
                />
              </div>
              <div className='sub-grp-count'>
                <div className='form-txt'>
                  Price Business Class
                </div>
                <input 
                  type="number"
                  value={Business} 
                  className='input-area form-input' 
                  placeholder='Price Business Class'
                  onChange={handleBusinessChange} 
                />
              </div>
              <div className='sub-grp-count'>
                <div className='form-txt'>
                  Price Platinum Class
                </div>
                <input 
                  type="number" 
                  value={Platinum}
                  className='input-area form-input' 
                  placeholder='Price Platinum Class' 
                  onChange={handlePlatinumChange}
                />
              </div>
            </div>
            <button type="button" class="update-button btn" onClick={handleBack}>Back</button>
            <button type="button" class="update-button btn" onClick={handleAdd}>Add&nbsp;Route</button>    
          </div>
        </div>
      </div>
    );
};
