import React from 'react';
import './deoAddAirport.css';

export default function DEOAddAirport () {

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
              className='form-input' 
              placeholder='ICAO Code'
            />
            <div className='form-txt'>
              IATA Code
            </div>
            <input 
              type="text" 
              className='form-input' 
              placeholder='IATA Code'
            />
            <div className='form-txt'>
              Select location
            </div>
            <input 
              type="text" 
              className='form-input' 
              placeholder='Select location'
            />
            <button type="button" class="update-button btn">Cancel</button>
            <button type="button" class="update-button btn">Add&nbsp;Airport</button>    
          </div>
        </div>
      </div>
    );
};
