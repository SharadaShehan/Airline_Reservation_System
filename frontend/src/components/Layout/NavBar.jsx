import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <nav ref={navRef}>
        <div className="linksContainer" onClick={showNavbar}>
          <Link to="/home" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            Profile
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
