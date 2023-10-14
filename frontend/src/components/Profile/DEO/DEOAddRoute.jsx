import React from 'react';
import './deoAddRoute.css';

export default function DEOAddRoute () {

    return (
      <div className='pd-back'>
        <div className='gls-back'></div>
        <div className='fnt-cont'>
          <div className='form-title'>
            Add a Route
          </div>
          <div className='mid-content-group'>
            <div className='form-txt'>
              Enter Route ID
            </div>
              <input type="number" className='form-input' placeholder='Enter Route ID'/>
            <div className='form-txt'>
              Select Origin
            </div>
              <input type="text" className='form-input' placeholder='Select Origin'/>
            <div className='form-txt'>
              Select Destination
            </div>
              <input type="text" className='form-input' placeholder='Select Destinaton' />
            <div className='form-txt'>
              Duration&nbsp;(in&nbsp;Minutes)
            </div>
              <input type="number" className='form-input' placeholder='Enter Destination in Minutes'/>
            <button type="button" class="update-button btn">Cancel</button>
            <button type="button" class="update-button btn">Add&nbsp;Route</button>    
          </div>
        </div>
      </div>
    );
};
