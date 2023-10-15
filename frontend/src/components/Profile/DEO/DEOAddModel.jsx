import React, {useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import './deoAddModel.css';

export default function DEOAddModel () {
    const [name, setName] = useState("");
    const [Economy, setEconomy] = useState();
    const [Business, setBusiness] = useState();
    const [Platinum, setPlatinum] = useState();
    const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

    const handleNameChange = (event) => {
      setName(event.target.value);
    }

    const handleEconomyChange = (event) => {
      setEconomy(event.target.value);
    }

    const handleBusinessChange = (event) => {
      setBusiness(event.target.value);
    }

    const handlePlatinumChange = (event) => {
      setPlatinum(event.target.value);
    }

    const handleCancel = () => {
      setName("");
      setEconomy();
      setBusiness();
      setPlatinum();
    }

    async function handleAdd() {
      const token = Cookies.get("access-token");
      const seatsCount = {
        Economy : Economy,
        Business : Business,
        Platinum : Platinum
      }
      const postData = {
        name : name,
        seatsCount : seatsCount
      }

      try {
        const response = await axios.post(
          `${BaseURL}/deo/create/model`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        
        console.log(response);
        if (response.status === 201) {
          alert("Airplane Model Added Successfully");
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
            Add a Air Plane Model
          </div>
          <div className='mid-content-group'>
            <div className='form-txt'>
              Enter Name
            </div>
            <input 
              type="text" 
              value={name}
              className='form-input' 
              placeholder='Enter Air Plane Name'
              onChange={handleNameChange}
            />
            <div className='count-select'>
              <div className='sub-grp-count'>
                <div className='form-txt'>
                  Enter Economy Class Seats count
                </div>
                <input 
                  type="number" 
                  value={Economy}
                  className='form-input' 
                  placeholder='Economy Class Seats count'
                  onChange={handleEconomyChange} 
                />
              </div>
              <div className='sub-grp-count'>
                <div className='form-txt'>
                  Enter Business Class Seats count
                </div>
                <input 
                  type="number" 
                  value={Business}
                  className='form-input' 
                  placeholder='Business Class Seats count'
                  onChange={handleBusinessChange} 
                />
              </div>
              <div className='sub-grp-count'>
                <div className='form-txt'>
                  Enter Platinum Class Seats count
                </div>
                <input 
                  type="number" 
                  value={Platinum}
                  className='form-input'
                  placeholder='Platinum Class Seats count'
                  onChange={handlePlatinumChange} 
                />
              </div>
            </div>

            <button type="button" class="update-button btn" onClick={handleCancel}>Cancel</button>
            <button type="button" class="update-button btn" onClick={handleAdd}>Add&nbsp;Model</button>    
          </div>
        </div>
      </div>
    );
};
