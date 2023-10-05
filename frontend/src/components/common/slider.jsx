import React from "react";
import { Carousel } from "react-bootstrap";

const HeroSlider = () => {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={require("../../images/slider4.jpg")}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src={require("../../images/slider5.jpg")}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../images/slider6.jpg")}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../images/slider7.jpg")}
          alt="Fourth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSlider;
