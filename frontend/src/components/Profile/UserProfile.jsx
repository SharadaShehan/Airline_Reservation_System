import React from "react";
import { useEffect } from "react";
import UserProfileDetails from "./UserProfileDetails";
import Booking from "../Booking/Booking";
import UserBookedTickets from "./UserBookedTickets";
import PendingPayments from "./UserPendingPayments";
import { UserMenuGlobalState } from "../Layout/UserMenuGlobalState";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import "./scrollMenu.css";


export default function UserProfile ({userData}) {
    const { userMenuItem, setUserMenuItem } = UserMenuGlobalState();
    const { setBookingStep } = BookingStepGlobalState();
    useEffect(() => {
        setUserMenuItem("profile-details");
        setBookingStep("flightSearch");
    }, [setUserMenuItem, setBookingStep]);

    return (
        <div className="wrapper">
            <div className="horizontal-scroll-menu">
                <ul className="menu-list">
                    <li className={`menu-item${userMenuItem==="profile-details" ? "-active" : ""}`} onClick={() => changeMenuItem("profile-details")}>Profile Details</li>
                    <li className={`menu-item${userMenuItem==="book-flights" ? "-active" : ""}`} onClick={() => changeMenuItem("book-flights")}>Book Flights</li>
                    <li className={`menu-item${userMenuItem==="booked-tickets" ? "-active" : ""}`} onClick={() => changeMenuItem("booked-tickets")}>Booked Tickets</li>
                    <li className={`menu-item${userMenuItem==="pending-payments" ? "-active" : ""}`} onClick={() => changeMenuItem("pending-payments")}>Pending Payments</li>
                </ul>
            </div>
            {renderPage()}
        </div>
    );

    function changeMenuItem(item) {
        setUserMenuItem(item);
    };

    function renderPage() {
        if (userMenuItem === "profile-details") {
            return <UserProfileDetails userData={userData} />
        } else if (userMenuItem === "book-flights") {
            return <Booking />
        } else if (userMenuItem === "booked-tickets") {
            return <UserBookedTickets userData={userData} />
        } else if (userMenuItem === "pending-payments") {
            return <PendingPayments />
        }
    };
};

