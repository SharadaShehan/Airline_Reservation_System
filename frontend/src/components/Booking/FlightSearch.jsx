import React, { useEffect, useState } from 'react';
import axios from "axios";
import './flightSearch.css';
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import { BookingProcessGlobalState } from '../Layout/BookingProcessGlobalState';
import { UserGlobalState } from '../Layout/UserGlobalState';

export default function FlightSearch () {
    const { setBookingStep } = BookingStepGlobalState();
    const { bookingProcessDetails, setBookingProcessDetails } = BookingProcessGlobalState();
    const { currentUserData } = UserGlobalState();
    let nextPage = 'loginAsk';
    const [classType, setClassType] = useState('none');
    const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
    const [destination, setDestination] = useState("destination");
    const [airportsList, setAirportsList] = useState([]);
    const [origin, setOrigin] = useState("origin");
    const [date, setDate] = useState("");
    const [flights, setFlights] = useState([]);
    const [selectedFlightID, setSelectedFlightID] = useState(0);

    if (currentUserData.username != null )  { nextPage = 'seatReserve'};
    
    function handleNext() {
      setBookingProcessDetails({
        ...bookingProcessDetails,
        'flightID': selectedFlightID,
        'travelClass': classType
      });
      setBookingStep(nextPage);
    }
    
    const handleSelectEconomy = (data) => {
      setClassType('Economy');
      setSelectedFlightID(data);
      console.log(data);
    };

    const handleSelectBusiness = (data) => {
      setClassType('Business');
      setSelectedFlightID(data);
    };
    const handleSelectPlatinum = (data) => {
      setClassType('Platinum');
      setSelectedFlightID(data);
    };

    useEffect(
      function () {
        async function getAirportsList() {
          try {
            const response = await axios.get(`${BaseURL}/get/airports`);
            console.log(response.data);
            setAirportsList(response.data);
          } catch (error) {
            console.log(error);
          }
        }
        getAirportsList();
      },
      [BaseURL]
    );

    async function handleSearch() {
      const token = Cookies.get("access-token");
  
      console.log(origin, destination);
      console.log(
        `${BaseURL}/flight/search?fromAirport=${origin}&toAirport=${destination}&date=${date}`
      );
  
      try {
        const response = await axios.get(
          `${BaseURL}/flight/search?fromAirport=${origin}&toAirport=${destination}&date=${date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setFlights(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    const isVaild = () =>{
      return (
        classType === 'none'
      )
    };

    return (
      <>
        <div className="container justify-content-md-center center-box">
          <div className="glass-background"></div>
          <div className="main-container">
            <div className='front-content front-text title'>
              Search Flight
            </div>
            <div className='front-content '>
              <div className="drop-btn-container">
                <div className="column-left drop-btn">
                  <div class="dropdown">
                    <select
                      className="dropbtn"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    >
                      <option disabled value="origin">
                        Form
                      </option>
                      {airportsList.map((airport) => (
                        <option
                          value={airport.icaoCode}
                          key={airport.icaoCode}
                        >
                          {airport.city} ({airport.iataCode})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="column-right drop-btn">
                  <select
                    className="dropbtn"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option disabled value="destination">
                      TO
                    </option>
                    {airportsList
                      .filter((airport) => airport.icaoCode !== origin)
                      .map((airport) => (
                        <option
                          value={airport.icaoCode}
                          key={airport.icaoCode}
                        >
                          {airport.city} ({airport.iataCode})
                        </option>
                      ))}
                  </select>
                </div>
              </div>
                <div className="date-btn drop-btn">
                  <div className="dropdown">
                    <button className="dropbtn">
                      <div className='drop-text'>
                        Date
                      </div>
                      <input 
                        className='date-input-flightSearch'
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </button>
                  </div>
                </div>
              <div className="search-btn">
                <button className="transparent-button" onClick={handleSearch}>Search</button>
              </div>
            </div>
              <div className="table-container front-content">
                {flights.length === 0 ? (
              <div className="no-passengers">
                Select Origin and Destination airports
              </div>
            ) : (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Model</th>
                      <th>Duration</th>
                      <th>Economy</th>
                      <th>Business</th>
                      <th>Platinum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((flight) => (
                      <tr key={uuidv4()}>
                        <td>{flight.flightID}</td>
                        <td>{flight.airplaneModel}</td>
                        <td>{flight.durationMinutes}</td>
                        <td> <button type="button" className="class-btn btn" onClick={() => handleSelectEconomy(flight.flightID)}> Select</button></td>
                        <td> <button type="button" className="class-btn btn" onClick={() => handleSelectBusiness(flight.flightID)}> Select</button></td>
                        <td> <button type="button" className="class-btn btn" onClick={() => handleSelectPlatinum(flight.flightID)}> Select</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </div>
            <div>
              <div className='selected-class-txt'>
                Class : {classType}
              </div>
              <div className="btn-set">
                <button type="button" className="action-button btn">
                  <Link to="/home" style={{color:"white", textDecoration:"none"}}>
                    Cancel
                  </Link>
                </button>
              <button type="button" className="action-button btn" onClick={handleNext} disabled={isVaild()}>Next</button>
              </div>
            </div>
            
          </div>
        </div>
      </>
    );
}