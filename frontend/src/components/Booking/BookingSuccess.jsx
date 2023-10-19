import React from 'react';
import { Link } from 'react-router-dom';
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import './bookingSuccess.css';
import Cookies from 'js-cookie';

export default function BookingSuccess () {
    const { setBookingStep } = BookingStepGlobalState();
    const bookingID = Cookies.get("bookingRef"); 

    function handleBookMore(){
      setBookingStep('flightSearch');
    }


    return (
      <>
      <div className='center-back'>
        <div className='head-txt'>
          <label className='success-txt'>
            Payment&nbsp;Successful&nbsp;!
          </label>
          <label className='id-txt'>
            Your booking ID is : {bookingID}
          </label>
        </div>

        <div className='des-contents'>
          <div className='glass-back'></div>
          <div className='des-txt'>
            One Click away to your destination...
          </div>
          <div className='des-boxes'>
            <div className='des-box-1'>
              <img className='des-img img-s' alt='Destination' src={require('../../images/des-1.jpg')} />
              <div className='des-txt-box-corner'>
                Airlines offer the fundamental service of safe and efficient transportation, connecting travelers to destinations worldwide. 
                Utilizing a network of airports and aircraft, they facilitate the swift and secure movement of passengers and cargo, ensuring essential connectivity within the global travel landscape.
              </div>
            </div>
            <div className='des-box-2'>
              <img className='des-img img-l' alt='Destination' src={require('../../images/des-2.jpg')} />
            </div>
            <div className='des-box-3'>
              <div className='des-txt-box-center'>
                Airlines offer the fundamental service of safe and efficient transportation, connecting travelers to destinations worldwide. 
                Utilizing a network of airports and aircraft, they facilitate the swift and secure movement of passengers and cargo, ensuring essential connectivity within the global travel landscape.
              </div>
              <img className='des-img img-s' alt='Destination' src={require('../../images/des-3.jpg')} />
            </div>
            <div className='des-box-4'>
              <img className='des-img img-l' alt='frDestinationom' src={require('../../images/des-4.jpg')} />
            </div>
            <div className='des-box-5'>
              <img className='des-img img-s' alt='Destination' src={require('../../images/des-5.jpg')} />
              <div className='des-txt-box-corner'>
                Airlines offer the fundamental service of safe and efficient transportation, connecting travelers to destinations worldwide. 
                Utilizing a network of airports and aircraft, they facilitate the swift and secure movement of passengers and cargo, ensuring essential connectivity within the global travel landscape.
              </div>
            </div>
          </div>
        </div>
        <div className="btn-finish">
            <button type="button" className="finish-button btn">
                <Link to="/home" style={{color:"white", textDecoration:"none"}}>
                  Home
                </Link>
            </button>
            <button type="button" className="finish-button btn" onClick={handleBookMore}>Book&nbsp;Another&nbsp;Flight </button>
          </div>
      </div>
          
      </>
    );
};
