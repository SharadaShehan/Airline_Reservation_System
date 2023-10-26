import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navBar.css";
import { Link } from "react-router-dom";
import { UserGlobalState } from "./UserGlobalState";

export default function NavBar() {
  const navRef = useRef();
  const { currentUserData } = UserGlobalState();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <nav ref={navRef}>
      { (currentUserData.role !== "Admin" && currentUserData.role !== "DataEntryOperator") && (
        <div className="linksContainer" onClick={showNavbar}>
          <Link to="/home" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/book-flights" style={{ textDecoration: "none" }}>
            Book Flights
          </Link>
           
          <Link to="/booked-tickets" style={{ textDecoration: "none" }}>
            Booked Tickets
          </Link>
          <Link to="/about-us" style={{ textDecoration: "none" }}>
            About Us
          </Link>
        </div>
        )}
        <button className="nav-button close-button" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-button" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
