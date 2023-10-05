import React from "react";
import { useState, useEffect } from "react";
import DEOProfileDetails from "./DEOProfileDetails";
import DEOAddAirport from "./DEOAddAirport";
import DEOAddRoute from "./DEOAddRoute";
import DEOScheduleFlight from "./DEOScheduleFlight";
import "./scrollMenu.css";


export default function DEOProfile ({userData}) {
    const [deoMenuItem, setDEOMenuItem] = useState("profile-details");
    
    useEffect(() => {
        setDEOMenuItem("profile-details");
    }, [setDEOMenuItem]);

    return (
        <div className="wrapper">
            <div className="horizontal-scroll-menu">
                <ul className="menu-list">
                    <li className={`menu-item${deoMenuItem==="profile-details" ? "-active" : ""}`} onClick={() => changeMenuItem("profile-details")}>Profile Details</li>
                    <li className={`menu-item${deoMenuItem==="schedule-flight" ? "-active" : ""}`} onClick={() => changeMenuItem("schedule-flight")}>Schedule Flight</li>
                    <li className={`menu-item${deoMenuItem==="add-route" ? "-active" : ""}`} onClick={() => changeMenuItem("add-route")}>Add Route</li>
                    <li className={`menu-item${deoMenuItem==="add-airport" ? "-active" : ""}`} onClick={() => changeMenuItem("add-airport")}>Add Airport</li>
                </ul>
            </div>
            {renderPage()}
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
        }
    };
};

