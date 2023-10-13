import React from 'react';
import './flightSearch.css';
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import { UserGlobalState } from '../Layout/UserGlobalState';

export default function FlightSearch () {
    const { setBookingStep } = BookingStepGlobalState();
    const { currentUserData } = UserGlobalState();
    let nextPage = 'loginAsk';
    if (currentUserData.username != null )  { nextPage = 'seatReserve'};
    
    function handleNext() {
      setBookingStep(nextPage);
    }
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
                    <button class="dropbtn">
                      <div className='left-icon'>
                        <img className='left-icon-img' alt='from' src={require('../../images/from-flight.png')} />
                      </div>
                      <div className='drop-text'>
                        From
                      </div>
                      <div className="scroll-div">
                        <img className='scroll-icon' alt='from' src={require('../../images/scroll-Polygon.png')} />
                      </div>
                    </button>
                    <div class="dropdown-content">
                      <a href="#">Sri lanka</a>
                      <a href="#">India</a>
                      <a href="#">Indonesia</a>
                    </div>
                  </div>
                </div>
                <div className="column-right drop-btn">
                  <div class="dropdown">
                    <button class="dropbtn">
                      <div className='left-icon'>
                        <img className='left-icon-img' alt='from' src={require('../../images/To-flight.png')} />
                      </div>
                      <div className='drop-text'>
                        To
                      </div>
                      <div className="scroll-div">
                        <img className='scroll-icon' alt='from' src={require('../../images/scroll-Polygon.png')} />
                      </div>
                    </button>
                    <div class="dropdown-content">
                      <a href="#">Sri Lanka</a>
                      <a href="#">India</a>
                      <a href="#">Indonesia</a>
                    </div>
                  </div>
                </div>
              </div>
                <div className="date-btn drop-btn">
                  <div class="dropdown">
                    <button class="dropbtn">
                      <div className='left-icon'>
                        <img className='left-icon-img' alt='from' src={require('../../images/calender.png')} />
                      </div>
                      <div className='drop-text'>
                        Date
                      </div>
                      <div className="scroll-div">
                        <input type="date"/>
                      </div>
                    </button>
                  </div>
                </div>
              <div className="search-btn">
                <button class="transparent-button">Search</button>
              </div>
            </div>
            <div class="table-container front-content">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane</td>
                    <td>30</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Bob</td>
                    <td>22</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Bob</td>
                    <td>22</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Bob</td>
                    <td>22</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Bob</td>
                    <td>22</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Bob</td>
                    <td>22</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="btn-set">
            <button type="button" class="action-button btn">
              <Link to="/home" style={{color:"white", textDecoration:"none"}}>
                Cancel
              </Link>
            </button>
            <button type="button" class="action-button btn" onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
      </>
    );

}