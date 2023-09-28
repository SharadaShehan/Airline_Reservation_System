import React from 'react';

export default function AdminProfileDetails ({userData}) {

    return (
      <div>
        <h1>Admin Profile Details</h1>
        <h1>{userData.username}</h1>
      </div>
    );
};
