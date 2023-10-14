import React from 'react';
import './deoProfileDetails.css';

export default function DEOProfileDetails ({userData}) {

  return (
    <div className='pd-back'>
      <div className='gls-back'></div>
      <div className='fnt-cont'>
        <div className='form-title'>
          Data Entry Operator Details
        </div>
        <div className="fnt-txt">
          User name : {userData.username}
          <br />
          First name : {userData.firstName}
          <br />
          Last name : {userData.lastName}
          <br />
          Admin : {userData.isAdmin ? 'Yes' : 'No'}
          <br />
          Data Entry Operator : {userData.isDataEntryOperator ? 'No' : 'Yes'}

        </div>
      </div>
    </div>
  );
};
