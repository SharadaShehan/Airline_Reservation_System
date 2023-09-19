import React from "react";
import { useState, useEffect } from "react";
import AdminProfileDetails from "./AdminProfileDetails";
import AdminSearchRecords from "./AdminSearchRecords";
import AdminViewReports from "./AdminViewReports";
import "./scrollMenu.css";


export default function DEOProfile ({userData}) {
    const [ adminMenuItem, setAdminMenuItem ] = useState("profile-details");
    
    useEffect(() => {
        setAdminMenuItem("profile-details");
    }, [setAdminMenuItem]);

    return (
        <div className="wrapper">
            <div className="horizontal-scroll-menu">
                <ul className="menu-list">
                    <li className={`menu-item${adminMenuItem==="profile-details" ? "-active" : ""}`} onClick={() => changeMenuItem("profile-details")}>Profile Details</li>
                    <li className={`menu-item${adminMenuItem==="search-records" ? "-active" : ""}`} onClick={() => changeMenuItem("search-records")}>Search Records</li>
                    <li className={`menu-item${adminMenuItem==="view-reports" ? "-active" : ""}`} onClick={() => changeMenuItem("view-reports")}>View Reports</li>
                </ul>
            </div>
            {renderPage()}
        </div>
    );

    function changeMenuItem(item) {
        setAdminMenuItem(item);
    };

    function renderPage() {
        if (adminMenuItem === "profile-details") {
            return <AdminProfileDetails userData={userData} />
        } else if (adminMenuItem === "search-records") {
            return <AdminSearchRecords />
        } else if (adminMenuItem === "view-reports") {
            return <AdminViewReports />
        }
    };
};

