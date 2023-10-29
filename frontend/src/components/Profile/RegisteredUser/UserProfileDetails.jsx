import React from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { BookingStepGlobalState } from "../../Layout/BookingStepGlobalState";
import { useNavigate } from "react-router-dom";
import "./userProfile.css";

export default function UserProfileDetails({ userData }) {
  const { setUserMenuItem } = UserMenuGlobalState();
  const { setBookingStep } = BookingStepGlobalState();
  const navigate = useNavigate();

  function handleBookFlightClick() {
    setBookingStep("flightSearch");
    setUserMenuItem("profile-details");
    navigate("/book-flights");
  }

  //   address: "123, Main St, Yishun, Singapore";
  //   birthDate: "Wed, 15 Mar 1995 00:00:00 GMT";
  //   bookingsCount: 30;
  //   category: "Gold";
  //   contactNumber: "+6590123456";
  //   email: "samc@example.com";
  //   firstName: "Sam";
  //   gender: "Male";
  //   lastName: "Convoy";
  //   passportId: "II789012";
  //   username: "SamC";

  return (
    <div className="profileDetailsWrapper">
      <h1 className="user-header">User Information</h1>
      <div className="profileDetailsBox">
        <div>
          <label>User name:</label>
          <span>{userData.username}</span>
        </div>
        <div>
          <label>First Name:</label>
          <span>{userData.firstName}</span>
        </div>
        <div>
          <label>Last Name:</label>
          <span>{userData.lastName}</span>
        </div>
        <div>
          <label>Email:</label>
          <span>{userData.email}</span>
        </div>
        <div>
          <label>Passport ID:</label>
          <span>{userData.passportId}</span>
        </div>
        <div>
          <label>Bookings Count:</label>
          <span>{userData.bookingsCount}</span>
        </div>
        <div>
          <label>Category:</label>
          <span>{userData.category}</span>
        </div>
        <div>
          <label>Gender:</label>
          <span>{userData.gender}</span>
        </div>
        <div>
          <label>Address:</label>
          <span>{userData.address}</span>
        </div>
        <div>
          <label>BirthDate:</label>
          <span>{userData.birthDate.slice(0, -12)}</span>
        </div>

        <div>
          <label>Contact Number:</label>
          <span>{userData.contactNumber}</span>
        </div>
        <div className="user-buttonWrapper">
          <button
            className="user-button"
            onClick={() => setUserMenuItem("booked-tickets")}
          >
            View Booked Tickets
          </button>
          <button
            className="user-button"
            onClick={() => setUserMenuItem("pending-payments")}
          >
            View Pending Payments
          </button>
          <button className="user-button" onClick={handleBookFlightClick}>
            Book a Flight
          </button>
        </div>
      </div>
    </div>
  );
}
