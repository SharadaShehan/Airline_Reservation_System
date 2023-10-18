import React from "react";
import { useState, useEffect } from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
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
    const { userMenuItem, setUserMenuItem } = UserMenuGlobalState();

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
                
                {renderPage()}
            </div>
        </div>
    );

    function renderPage() {
        if (userMenuItem === "profile-details") {
            return <DEOProfileDetails userData={userData} />
        } else if (userMenuItem === "schedule-flight") {
            return <DEOScheduleFlight />
        } else if (userMenuItem === "add-route") {
            return <DEOAddRoute />
        } else if (userMenuItem === "add-airport") {
            return <DEOAddAirport />
        } else if (userMenuItem === "add-airplane") {
            return <DEOAddAirplane />
        } else if (userMenuItem === "add-model") {
            return <DEOAddModel />
        } else if (userMenuItem === "update-delay") {
            return <DEOUpdateDelay />
        }else {
            return <div>Page not found</div>
        }
    };
};

