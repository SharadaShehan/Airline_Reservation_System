import React from 'react';
import './deoAddFlight.css';

export default function DEOAddFlight () {

    return (
      <div className='pd-back'>
        <div className='gls-back'></div>
        <div className='fnt-cont'>
          <div className='form-title'>
            Add a Flight
          </div>
          <div className='mid-content-group'>
            <div className='form-txt'>
              Select Air Plane Model
            </div>
            <input type="text" className='form-input' placeholder='Select Air Plane Model'/>
            <div className='form-txt'>
              Tail Number
            </div>
            <input type="number" className='form-input' placeholder='Tail Number'/>
            <div className='form-txt'>
              Model ID
            </div>
            <input type="number" className='form-input' placeholder='Model Number'/>
            <button type="button" class="update-button btn">Cancel</button>
            <button type="button" class="update-button btn">Add&nbsp;Flight</button>    
          </div>
        </div>
      </div>
    );
};
