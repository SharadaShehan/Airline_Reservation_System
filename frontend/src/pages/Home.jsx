import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

import rectangle91 from "../images/rectangle-91.png";
import rectangle92 from "../images/rectangle-92.png";
import rectangle93 from "../images/rectangle-93.png";
import rectangle94 from "../images/rectangle-94.png";
import rectangle99 from "../images/rectangle-99.png";
import rectangle100 from "../images/rectangle-100.png";
import rectangle101 from "../images/rectangle-101.png";
import rectangle102 from "../images/rectangle-102.png";
import rectangle116 from "../images/rectangle-116.png";
import rectangle117 from "../images/rectangle-117.png";
import rectangle118 from "../images/rectangle-118.png";

function HomePage() {
  return (
    <div className="home-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <img
            className="home-background"
            alt="Rectangle"
            loading="lazy"
            src={require("../images/HomeBackground.png")}
          />
          <div className="group-4">
            <p className="text-wrapper-9">Beyond Horizons</p>
            <p className="text-wrapper-10">Beyond Limits</p>
            <Link to={"/book-flights"}>
              <button className="search-flight">Search Flights Now !</button>
            </Link>
          </div>
          <div className="group-desc">
            <div className="group-row">
              <div className="group-5">
                <div className="overlap-7">
                  <img
                    className="service-img"
                    alt="Rectangle"
                    loading="lazy"
                    src={rectangle91}
                  />
                  <div className="text-wrapper-11">Transportation</div>
                  <p className="text-wrapper-12">
                    Our airline promises seamless transportation, ensuring you
                    reach your destination swiftly and comfortably. With a fleet
                    of modern aircraft, punctual schedules, and efficient ground
                    services, we prioritize your convenience, making your
                    journey as smooth as possible, from takeoff to touchdown.
                  </p>
                </div>
              </div>
              <div className="group-5">
                <div className="overlap-7">
                  <img
                    className="service-img"
                    alt="Rectangle"
                    loading="lazy"
                    src={rectangle94}
                  />
                  <div className="text-wrapper-11">Baggage Handling</div>
                  <p className="text-wrapper-12">
                    Rest easy with our meticulous baggage handling services.
                    Your belongings are our responsibility, treated with utmost
                    care from check-in to delivery. Our advanced tracking
                    systems guarantee your luggage arrives promptly and intact,
                    allowing you to focus on your travel adventures without
                    worry.
                  </p>
                </div>
              </div>
              <div className="group-5">
                <div className="overlap-7">
                  <img
                    className="service-img"
                    alt="Rectangle"
                    loading="lazy"
                    src={rectangle92}
                  />
                  <div className="text-wrapper-11">Customer Service</div>
                  <p className="text-wrapper-12">
                    At our airline, customer service is our pride. Our dedicated
                    team is available around the clock, ready to assist you with
                    a warm smile. Expect personalized attention, quick
                    resolutions, and a commitment to making your experience with
                    us truly exceptional.
                  </p>
                </div>
              </div>
              <div className="group-5">
                <div className="overlap-7">
                  <img
                    className="service-img"
                    alt="Rectangle"
                    loading="lazy"
                    src={rectangle93}
                  />
                  <div className="text-wrapper-11">In-Flight Service</div>
                  <p className="text-wrapper-12">
                    Prepare for a world-class in-flight experience. From
                    delectable cuisine crafted by renowned chefs to an array of
                    entertainment options catering to all tastes, our attentive
                    crew ensures your journey is not just comfortable but truly
                    enjoyable. Sit back, relax, and let us pamper you in the
                    skies.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-wrapper-title">Enhance Your Experience</div>
            <p className="welcome-text">
              Welcome to a world where your travel dreams take flight, and every
              journey becomes an unforgettable adventure. At our airline, we go
              beyond expectations to craft an experience that resonates with
              luxury, comfort, and seamless service. From the moment you step on
              board, immerse yourself in a realm of unparalleled hospitality and
              sophistication.Discover a new level of comfort in our meticulously
              designed cabins, where plush seats cocoon you in relaxation. Our
              in-flight entertainment system offers a diverse selection of
              movies, music, and games to keep you entertained throughout the
              journey. Indulge your senses in our gourmet cuisine, curated by
              world-class chefs, showcasing flavors from around the globe.
              <br />
              <br />
              In our commitment to personalized service, our attentive crew
              anticipates your needs, ensuring your every request is met with a
              smile. Experience the freedom of choice with our flexible booking
              options, allowing you to tailor your travel plans according to
              your preferences. Elevating your journey is not just our promise;
              it's our passion. With priority boarding, extra legroom, and
              exclusive access to luxurious airport lounges, your travels become
              seamless and indulgent. We believe in creating more than just
              flights; we create cherished memories.
              <br />
              <br />
              Join us and let your travel aspirations soar. Whether you're
              embarking on a business trip or a leisurely escape, our airline is
              your gateway to a world where every moment is crafted with care,
              and every flight is a celebration of your journey. Come aboard and
              let us enhance your experience, making your travel dreams a
              reality
            </p>
          </div>
          <div className="location-container">
            <div className="location-row">
              <div className="loc-wrap-img-left">
                <img
                  className="left-loc-img"
                  alt="Rectangle"
                  loading="lazy"
                  src={rectangle99}
                />
              </div>
              <div className="loc-text-box">
                <div className="text-wrapper-23">India</div>
                <p className="text-wrapper-24">
                  India, a nation of diverse cultures and landscapes, invites
                  you to explore its wonders. From the serene Himalayas to the
                  vibrant beaches of Goa, discover ancient temples, bustling
                  markets, and grand palaces. Indulge in the rich flavors of
                  Indian cuisine and witness colorful festivals that light up
                  the streets. Embrace the spirituality, warmth, and hospitality
                  of this extraordinary land, where every experience is a unique
                  tale waiting to be told.
                </p>
              </div>
            </div>

            <div className="location-row">
              <div className="loc-text-box">
                <div className="text-wrapper-23">Indonesia</div>
                <p className="text-wrapper-24">
                  Indonesia, a tropical paradise spanning thousands of islands,
                  offers a captivating blend of natural beauty and cultural
                  richness. From lush rainforests teeming with wildlife to
                  pristine beaches with turquoise waters, every corner is a
                  postcard-worthy sight. Explore ancient temples, vibrant
                  markets, and indulge in the diverse flavors of Indonesian
                  cuisine. Immerse yourself in the warm hospitality and vibrant
                  traditions of this enchanting archipelago, where adventure and
                  relaxation seamlessly intertwine.
                </p>
              </div>
              <div className="loc-wrap-img-right">
                <img
                  className="right-loc-img"
                  alt="Rectangle"
                  loading="lazy"
                  src={rectangle100}
                />
              </div>
            </div>

            <div className="location-row">
              <div className="loc-wrap-img-left">
                <img
                  className="left-loc-img"
                  alt="Rectangle"
                  loading="lazy"
                  src={rectangle101}
                />
              </div>
              <div className="loc-text-box">
                <div className="text-wrapper-23">Singapore</div>
                <p className="text-wrapper-24">
                  Singapore, a modern marvel in the heart of Southeast Asia, is
                  a city-state where tradition meets innovation. Explore the
                  iconic skyline adorned with futuristic architecture, shop at
                  bustling markets, and savor a culinary journey through hawker
                  stalls serving delectable local fare. Discover lush gardens,
                  vibrant neighborhoods, and a melting pot of cultures. In this
                  dynamic city, efficiency harmonizes with a rich cultural
                  tapestry, offering travelers an unforgettable experience in a
                  truly global metropolis.
                </p>
              </div>
            </div>

            <div className="location-row">
              <div className="loc-text-box">
                <div className="text-wrapper-23">Sri Lanka</div>
                <p className="text-wrapper-24">
                  Sri Lanka, the pearl of the Indian Ocean, beckons with its
                  timeless charm and natural splendor. Explore ancient cities
                  adorned with magnificent temples, wander through lush tea
                  plantations, and relax on pristine beaches fringed with palm
                  trees. Encounter diverse wildlife in national parks, savor
                  aromatic cuisine, and immerse yourself in a rich tapestry of
                  culture and heritage. With warm smiles and breathtaking
                  landscapes, Sri Lanka promises an unforgettable journey of
                  discovery.
                </p>
              </div>
              <div className="loc-wrap-img-right">
                <img
                  className="right-loc-img"
                  alt="Rectangle"
                  loading="lazy"
                  src={rectangle102}
                />
              </div>
            </div>
          </div>
          <img
            className="absolute-img1"
            alt="Pexels erik mclean"
            loading="lazy"
            src={require("../images/tickets-on-hand.png")}
          />
          <img
            className="absolute-img2"
            alt="Pexels rachel claire"
            loading="lazy"
            src={require("../images/tickets-in-bag.png")}
          />

          <div className="overlap-15">
            <div className="discounts">Discounts & Memberships</div>
            <div className="overlap-group-5">
              <img
                className="class-img-left"
                alt="Rectangle"
                loading="lazy"
                src={rectangle116}
              />
              <div className="class-text-div1">
                <div className="class-title-wrapper">Platinum Class</div>
                <p className="class-text-wrapper">
                  Our Platinum Class offers unmatched luxury, from special
                  check-in to delicious meals by famous chefs. Enjoy comfy seats
                  that turn into beds for a refreshing trip. Experience
                  personalized care, access to fancy airport lounges, and lots
                  of great extras. Your perfect journey starts here.
                </p>
              </div>
            </div>
            <div className="overlap-group-5">
              <div className="class-text-div2">
                <div className="class-title-wrapper">Business Class</div>
                <p className="class-text-wrapper">
                  Experience ultimate luxury in our Business Class. From the
                  moment you step on board, enjoy pampering with plush seats,
                  gourmet cuisine, and fine wines. With priority boarding, extra
                  legroom, and personalized service, every moment is memorable.
                  Let us redefine your journey in the skies with unmatched
                  comfort and care.
                </p>
              </div>
              <img
                className="class-img-right"
                alt="Rectangle"
                loading="lazy"
                src={rectangle117}
              />
            </div>
            <div className="overlap-group-5">
              <img
                className="class-img-left"
                alt="Rectangle"
                loading="lazy"
                src={rectangle118}
              />
              <div className="class-text-div3">
                <div className="class-title-wrapper">Economy Class</div>
                <p className="class-text-wrapper">
                  Step into our Economy Class, where affordability meets comfort
                  seamlessly. Enjoy a delightful journey without overspending,
                  relishing cozy seats, delicious meals, and entertainment
                  options. Discover the pleasure of budget-friendly, hassle-free
                  flying with us. Your comfortable adventure begins here!
                </p>
              </div>
            </div>
            <div className="group-18">
              <p className="register-today-get">
                Register today & get Unbelievable Discounts !
              </p>
              <Link to="/profile">
                <button className="register-now">Register Now !</button>
              </Link>
              <p className="text-wrapper-33">Already Has an account ?</p>
              <Link to="/profile">
                <button className="login">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
