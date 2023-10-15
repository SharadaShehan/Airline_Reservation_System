import React, {useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import './deoAddAirport.css';

export default function DEOAddAirport () {
    const [ICAO, setICAOCode] = useState('');
    const [IATA, setIATACode] = useState('');
    const [location, setLocation] = useState([]);
    const [inputLocation, setInputLocation] = useState('');
    const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

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

    function handleCancel() {
      setICAOCode('');
      setIATACode('');
      setLocation([]);
      setInputLocation('');
    }

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
          alert("Airport Added Successfully");
          handleCancel();
        }
      } catch (err) {
        console.log(err);
        if(err.response && err.response.status === 401){
        }
      }
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
              className='form-input' 
              placeholder='ICAO Code'
              onChange={handleInputICAOChange}
            />
            <div className='form-txt'>
              IATA Code
            </div>
            <input
              type="text"
              value={IATA}
              className='form-input' 
              placeholder='IATA Code'
              onChange={handleInputIATAChange}
            />
            <div className='form-txt'>
              Enter location
            </div>
            <input 
              type="text"
              value={inputLocation} 
              className='form-input' 
              placeholder='Enter location separated by commas'
              onChange={handleInputLocationChange}
            />
            <button type="button" class="update-button btn" onClick={handleCancel}>Cancel</button>
            <button type="button" class="update-button btn" onClick={handleAdd}>Add&nbsp;Airport</button>    
          </div>
        </div>
      </div>
    );
};
