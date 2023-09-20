import React from "react";
import VMC from "./inc/VMC";
import "../styles/aboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus">
      <section className="py-4 bg-c-info border-top border- bottom">
        <div className="container">
          <div className="row">
            <div className="col my-auto">
              <h3>About Us</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="section border-bottom">
        <div className="container">
          <h5 className="main-heading">Our Company</h5>
          <div className="underline mx-auto"></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quibusdam, voluptatum, quos, voluptate voluptas quia quae
            voluptatibus dolorum quod quas voluptatem. Quisquam quibusdam,
            voluptatum, quos, voluptate voluptas quia quae voluptatibus dolorum
            quod quas voluptatem.
          </p>
        </div>
      </section>
      <VMC />
    </div>
  );
};

export default AboutUs;
