import React from 'react';
import './deoUpdateDelay.css';

export default function DEOUpdateDelay () {

  return (
    <div className='pd-back'>
      <div className='gls-back'></div>
      <div className='fnt-cont'>
        <div className='form-title'>
          Update Delay in a Flight
        </div>
        <div className='form-ud-1'>
          <div className='form-sub-grp'>
            <div className='form-sub-sub-l'>
              <div className='form-sub-title'>
                Update Delay
              </div>
                <form className='form-1'>
                  <div className='form-txt'>
                    Flight
                  </div>
                  <div class="dropdown">
                    <button class="btn search-flight-btn" type="button">
                      Search Flight
                    </button>
                  </div>
                  <div className='form-txt'>
                    Delay in Minutes
                  </div>
                  <input type="number" class="form-control"  placeholder="Delay in Minutes"/>
                </form>
                  
              <button type="button" class="update-button btn">Cancel</button>
              <button type="button" class="update-button btn">Search</button>
              <button type="button" class="update-button btn">Update</button>
            </div>
          </div>
          <div className='form-sub-grp'>
            <div className='form-sub-sub-r'>
              <div className='form-sub-title'>
                Flight Details
              </div>
              <div className='data-txt'>
                Flight ID : 
              </div>
              <div className='data-txt'>
                Air Plane Model :
              </div>
              <div className='data-txt'>
                Duration :
              </div>
              <div className='data-txt'>
                Origin :
              </div>
              <div className='data-txt'>
                IATA :
              </div>
              <div className='data-txt'>
                Origin Airport :
              </div>
              <div className='data-txt'>
                Date :
              </div>
              <div className='data-txt'>
                Time :
              </div>
              <div className='data-txt'>
                Destination :
              </div>
              <div className='data-txt'>
                IATA :
              </div>
              <div className='data-txt'>
                Destination Airport :
              </div>
              <div className='data-txt'>
                Date :
              </div>
              <div className='data-txt'>
                Time :
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
};
