import React, {useState, useEffect} from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import './deoScheduleFlight.css';

export default function DEOScheduleFlight () {
    const [routeList, setRouteList] = useState([]);
    const [routeID, setRouteID] = useState("");
    const [airplanesList, setAirplanesList] = useState([]);
    const [tailNumber, setTailNumber] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

    const handleRouteID = (event) => {
      setRouteID(event.target.value);
    }
    const handleTailNumber = (event) => {
      setTailNumber(event.target.value);
    }
    const handleDateChange = (event) => {
      setDate(event.target.value);
    }
    const handleTimeChange = (event) => {
      setTime(event.target.value);
    }

    async function handleSchedule(){
      const token = Cookies.get("access-token");

      console.log(routeID, tailNumber, date, time);
      const postData = {
        route : routeID,
        airplane : tailNumber,
        departureDate : date,
        departureTime : time
      }
  
      try {
        const response = await axios.post(
          `${BaseURL}/deo/schedule-flight`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        
        console.log(response);
        if (response.status === 201) {
          alert("Flight Schedule Successfully");
          handleCancel();
        }
      } catch (err) {
        console.log(err);
        if(err.response && err.response.status === 401){
        }
      }
    }

    const handleCancel = () => {
      setRouteID("");
      setTailNumber("");
      setDate("");
      setTime("");
    }

    useEffect(
      function () {
        async function getRoutesList() {
          try {
            const response = await axios.get(`${BaseURL}/get/routes`);
            console.log(response.data);
            setRouteList(response.data);
          } catch (error) {
            console.log(error);
          }
        }
        getRoutesList();
      },
      [BaseURL]
    );

    useEffect(
      function () {
        async function getAirplanesList() {
          try {
            const response = await axios.get(`${BaseURL}/get/airplanes`);
            console.log(response.data);
            setAirplanesList(response.data);
          } catch (error) {
            console.log(error);
          }
        }
        getAirplanesList();
      },
      [BaseURL]
    );

    return (
      <div className='pd-back'>
        <div className='gls-back'></div>
        <div className='fnt-cont'>
          <div className='form-title'>
            Schedule a Flight
          </div>
          <div className='mid-content-group'>
            <div className='form-txt'>
              Select Route
            </div>
            <select
              className="input-area form-control" 
              value={routeID}
              onChange={handleRouteID}
            >
              <option disabled value="routeID">
                Route
              </option>
              {routeList.map((route) => (
                  <option
                    value={route.routeID}
                  >
                    {route.routeID} : ({route.fromCity}) : ({route.toCity})
                  </option>
                ))}
            </select>

            <div className='form-txt'>
              Select Air Plane
            </div>

            <select
              className="input-area form-control" 
              value={tailNumber}
              onChange={handleTailNumber}
            >
              <option disabled value="tailNumber">
                Airplane Tail Number
              </option>
              {airplanesList.map((airplane) => (
                  <option
                    value={airplane.tailNumber}
                  >
                    {airplane.tailNumber} : ({airplane.tailNumber})
                  </option>
                ))}
            </select>

            <div className='form-txt'>
              Select Departure Date
            </div>
            <input 
              type="date" 
              value={date}
              className='input-area form-input'
              onChange={handleDateChange}
            />
            <div className='form-txt'>
              Select Departure Time
            </div>
            <input 
              type="time"
              value={time} 
              className='input-area form-input'
              onChange={handleTimeChange}
            />
            <button type="button" class="update-button btn" onClick={handleCancel}>Cancel</button>
            <button type="button" class="update-button btn" onClick={handleSchedule}>Schedule</button>    
          </div>
        </div>
      </div>
    );
};
