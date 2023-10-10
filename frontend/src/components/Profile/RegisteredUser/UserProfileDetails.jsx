import React from "react";
import "../scrollMenu.css";


export default function UserProfileDetails ({userData}) {
    return (
        <div className="profileDetailsWrapper">
            <h1>User Profile Details</h1>
            <h1>{userData.username}</h1>
        </div>
    )
};

