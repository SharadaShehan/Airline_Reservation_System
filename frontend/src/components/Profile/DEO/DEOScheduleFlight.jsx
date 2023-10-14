import React from 'react';
import './deoScheduleFlight.css';

export default function DEOScheduleFlight () {

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
              <input type="text" className='form-input' placeholder='Select Route'/>
            <div className='form-txt'>
              Select Air Plane
            </div>
              <input type="text" className='form-input' placeholder='Select Air Plane'/>
            <div className='form-txt'>
              Select Departure Date
            </div>
              <input type="date" className='form-input'/>
            <div className='form-txt'>
              Select Departure Time
            </div>
              <input type="time" className='form-input'/>
            <button type="button" class="update-button btn">Cancel</button>
            <button type="button" class="update-button btn">Schedule</button>    
          </div>
        </div>
      </div>
    );
};
