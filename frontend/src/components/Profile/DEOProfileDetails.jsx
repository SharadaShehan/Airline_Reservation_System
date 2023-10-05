import React from 'react';

export default function DEOProfileDetails ({userData}) {

    return (
      <div>
        <h1>DEO Profile Details</h1>
        <h1>{userData.username}</h1>
      </div>
    );
};
