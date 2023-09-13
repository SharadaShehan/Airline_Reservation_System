import NavBar from "./NavBar";
import "./header.css";
// import { useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";


export default function Header () {

    return (
        <div>
            <img src={require("../../images/headerImage1.jpg")} alt="headerimg" className="headerImg" />
            <div className="logo">B Airlines</div>
            <div className="navBarContainer">
                <NavBar />
            </div>
            <div className="profileIcon">
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <CgProfile style={{ color: "black" }}/>
                </Link>
            </div>
        </div>
    );
};

