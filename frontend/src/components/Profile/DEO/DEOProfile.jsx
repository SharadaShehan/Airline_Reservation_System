import React from "react";
import { useState, useEffect } from "react";
import DEOProfileDetails from "./DEOProfileDetails";
import DEOAddAirport from "./DEOAddAirport";
import DEOAddRoute from "./DEOAddRoute";
import DEOScheduleFlight from "./DEOScheduleFlight";
import DEOAddAirplane from "./DEOAddAirplane";
import DEOAddModel from "./DEOAddModel";
import DEOUpdateDelay from "./DEOUpdateDelay";
import "../scrollMenu.css";
import "./deoProfile.css"


export default function DEOProfile ({userData}) {
    const [deoMenuItem, setDEOMenuItem] = useState("profile-details");
    
    useEffect(() => {
        setDEOMenuItem("profile-details");
    }, [setDEOMenuItem]);

    return (
        <div className="wrapper">
            <img 
                className="background-image" 
                alt="Rectangle" 
                src={require("../../../images/DEOBackImage.jpg")} />
            <div className="deo-container">
                <div className="horizontal-scroll-menu">
                    <ul className="menu-list">
                        <li className={`menu-item${deoMenuItem==="profile-details" ? "-active" : ""}`} onClick={() => changeMenuItem("profile-details")}>Profile Details</li>
                        <li className={`menu-item${deoMenuItem==="add-airport" ? "-active" : ""}`} onClick={() => changeMenuItem("add-airport")}>Add Airport</li>
                        <li className={`menu-item${deoMenuItem==="add-airplane" ? "-active" : ""}`} onClick={() => changeMenuItem("add-airplane")}>Add Airplane</li>
                        <li className={`menu-item${deoMenuItem==="add-model" ? "-active" : ""}`} onClick={() => changeMenuItem("add-model")}>Add Model</li>
                        <li className={`menu-item${deoMenuItem==="add-route" ? "-active" : ""}`} onClick={() => changeMenuItem("add-route")}>Add Route</li>
                        <li className={`menu-item${deoMenuItem==="schedule-flight" ? "-active" : ""}`} onClick={() => changeMenuItem("schedule-flight")}>Schedule Flight</li>
                        <li className={`menu-item${deoMenuItem==="update-delay" ? "-active" : ""}`} onClick={() => changeMenuItem("update-delay")}>Update Delay</li>
                    </ul>
                </div>
                {renderPage()}
            </div>
        </div>
    );

    function changeMenuItem(item) {
        setDEOMenuItem(item);
    };

    function renderPage() {
        if (deoMenuItem === "profile-details") {
            return <DEOProfileDetails userData={userData} />
        } else if (deoMenuItem === "schedule-flight") {
            return <DEOScheduleFlight />
        } else if (deoMenuItem === "add-route") {
            return <DEOAddRoute />
        } else if (deoMenuItem === "add-airport") {
            return <DEOAddAirport />
        } else if (deoMenuItem === "add-airplane") {
            return <DEOAddAirplane />
        } else if (deoMenuItem === "add-model") {
            return <DEOAddModel />
        } else if (deoMenuItem === "update-delay") {
            return <DEOUpdateDelay />
        }else {
            return <div>Page not found</div>
        }
    };
};

