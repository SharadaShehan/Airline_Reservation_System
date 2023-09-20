import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import fb from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import insta from "../../images/insta.png";
import linkedIn from "../../images/linkedin.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer section_padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links_div">
            <h4>For Business</h4>
            <Link to="/employer">
              <p>Employer</p>
            </Link>
            <Link to="/healthplan">
              <p>Health Plan</p>
            </Link>
            <Link to="/individual">
              <p>Individual</p>
            </Link>
          </div>
          <div className="sb__footer-links_div">
            <h4>Resources</h4>
            <Link to="/resource">
              <p>Resource Center</p>
            </Link>
            <Link to="/resource">
              <p>Testimonial</p>
            </Link>
            <Link to="/resource">
              <p>STV</p>
            </Link>
          </div>
          <div className="sb__footer-links_div">
            <h4>Partners</h4>
            <Link to="/virgin-airlines">
              <p>Virgin Airlines</p>
            </Link>
          </div>
          <div className="sb__footer-links_div">
            <h4>Company</h4>
            <Link to="/about-us">
              <p>About</p>
            </Link>
            <Link to="/press">
              <p>Press</p>
            </Link>
            <Link to="/career">
              <p>Career</p>
            </Link>
            <Link to="/contact">
              <p>Contact</p>
            </Link>
          </div>
          <div className="sb__footer-links_div">
            <h4>Reach Us On</h4>
            <div className="socialmedia">
              <p>
                <img src={fb} alt="/"></img>
              </p>
              <p>
                <img src={twitter} alt="/"></img>
              </p>
              <p>
                <img src={insta} alt="/"></img>
              </p>
              <p>
                <img src={linkedIn} alt="/"></img>
              </p>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="sb__footer-bottom">
          <div className="sb__footer-copyright">
            <p>
              &copy;{new Date().getFullYear()} B Airlines. All Rights Reserved.
            </p>
          </div>
          <div className="sb__footer-bottom-links">
            <Link to="/terms">
              <div>
                <p>Terms & Conditions</p>
              </div>
            </Link>
            <Link to="/privacy">
              <div>
                <p>Privacy</p>
              </div>
            </Link>
            <Link to="/security">
              <div>
                <p>Security</p>
              </div>
            </Link>
            <Link to="/cookie">
              <div>
                <p>Cookie Declaration</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
