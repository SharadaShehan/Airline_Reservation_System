import React from "react";
import "../styles/aboutUs.css";

export const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <img
            className="img"
            alt="Rectangle"
            src="https://c.animaapp.com/wkCqKyaA/img/rectangle-22.png"
          />

          <div className="our-company-box">
            <div className="text-wrapper">Our Company</div>
            <p className="p">
              Welcome to B Airlines, your trusted partner in travel. At B
              Airlines, we are passionate about connecting people to their
              desired destinations, providing seamless travel experiences, and
              ensuring your journey is safe, comfortable, and memorable.
            </p>
            <p className="established-in">
              Established in 2023, B Airlines has been a prominent player in the
              aviation industry, serving&nbsp;&nbsp;&nbsp;&nbsp;passengers from
              around the world with a commitment to excellence. Our journey
              began with a vision to redefine air travel by combining modern
              technology, exceptional customer service, and a deep understanding
              of the evolving needs of travelers.
            </p>
          </div>

          <div className="horizontal-line">
            <p className="text-wrapper-13">Why Choose B Airlines ?</p>
          </div>

          <div className="overlap-group-wrapper">
            <div className="row">
              {/* <div className="overlap-3"> */}
              <div className="pink-box">
                <div className="sub-topic">Reliability</div>
                <p className="content">
                  B Airlines is known for its punctuality and reliability. We
                  take pride in ensuring that you reach your destination on
                  time, every time.
                </p>
              </div>
              {/* </div> */}
              {/* <div className="div-wrapper"> */}
              {/* <div className="overlap-3"> */}
              <div className="pink-box">
                <div className="sub-topic">Safety</div>
                <p className="content">
                  Your safety is our top priority. Our aircraft are meticulously
                  maintained, and our crew is highly trained to provide you with
                  a secure and comfortable journey.
                </p>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="row">
              {/* <div className="group-2"> */}
              {/* <div className="overlap-3"> */}
              <div className="pink-box">
                <div className="sub-topic">Customer-Centric</div>
                <p className="content">
                  We are dedicated to meeting and exceeding your expectations.
                  Our customer support team is available around the clock to
                  assist you with any inquiries or concerns.
                </p>
              </div>
              {/* </div> */}
              {/* </div>
            <div className="group-3"> */}
              {/* <div className="overlap-3"> */}
              <div className="pink-box">
                <div className="sub-topic">Innovation</div>
                <p className="content">
                  We embrace technological advancements to enhance your booking
                  experience. Our user-friendly website and mobile app make it
                  easy for you to plan your trips efficiently.
                </p>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>

          <div className="group-4">
            <div className="overlap-4">
              <div className="rectangle-7" />
              <img
                className="rectangle-8"
                alt="Rectangle"
                src="https://c.animaapp.com/wkCqKyaA/img/rectangle-80.svg"
              />
              <img
                className="rectangle-10"
                alt="Rectangle"
                src="https://c.animaapp.com/wkCqKyaA/img/rectangle-164.svg"
              />
              <img
                className="rectangle-9"
                alt="Rectangle"
                src="https://c.animaapp.com/wkCqKyaA/img/rectangle-163.svg"
              />
              <p className="text-wrapper-14">Join Us in the Sky</p>
              <p className="we-invite-you-to">
                <br />
                We invite you to explore our website, discover exciting
                destinations, and book your next adventure with B Airlines.
                Whether you&#39;re traveling for business or leisure, we look
                forward to being your preferred choice for air travel.
              </p>
              <p className="thank-you-for">
                Thank you for choosing B Airways.
                <br />
                Fly with us and experience the world like never before.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
