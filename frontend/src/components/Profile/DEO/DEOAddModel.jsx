import React from 'react';
import './deoAddModel.css';

export default function DEOAddModel () {

    return (
      <div className='pd-back'>
        <div className='gls-back'></div>
        <div className='fnt-cont'>
          <div className='form-title'>
            Add a Air Plane Model
          </div>
          <div className='mid-content-group'>
            <div className='form-txt'>
              Enter Name
            </div>
            <input type="text" className='form-input' placeholder='Enter Air Plane Name'/>
            <div className='form-txt'>
              Enter Seat Count
            </div>
            <input type="number" className='form-input' placeholder='Enter Seat Count'/>
            <div className='count-select'>
              <div className='sub-grp-count'>
                <div className='form-txt'>
                  Enter Economy Class Seats count
                </div>
                <input type="number" className='form-input' placeholder='Economy Class Seats count' />
              </div>
              <div className='sub-grp-count'>
                <div className='form-txt'>
                  Enter Business Class Seats count
                </div>
                <input type="number" className='form-input' placeholder='Business Class Seats count' />
              </div>
              <div className='sub-grp-count'>
                <div className='form-txt'>
                  Enter Platinum Class Seats count
                </div>
                <input type="number" className='form-input' placeholder='Platinum Class Seats count' />
              </div>
            </div>
              

            <button type="button" class="update-button btn">Cancel</button>
            <button type="button" class="update-button btn">Add&nbsp;Model</button>    
          </div>
        </div>
      </div>
    );
};
