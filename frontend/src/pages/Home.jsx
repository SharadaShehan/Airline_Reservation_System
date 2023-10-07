import React from "react";
import "../styles/home.css";

import istockpng from "../images/istockphoto-155380716-1024x1024-transformed-auto-x2-1.png";
import rectangle2 from "../images/rectangle-2.png";
import rectangle148 from "../images/rectangle-148.svg";
import rectangle150 from "../images/rectangle-150.svg";
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
import pexels from "../images/pexels-aleksey-kuprikov-3551227-1.png";
import pexelsErikMclean from "../images/pexels-erik-mclean-8266773-1.png";
import pexelsRachelClaire from "../images/pexels-rachel-claire-5863541-1.png";

function HomePage() {
  function handleRegister() {
    console.log("Register");
  }

  function handleLogin() {
    console.log("Login");
  }

  function handleSearchClick() {
    console.log("Search");
  }

  return (
    <div className="home-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <img className="istockphoto" alt="Istockphoto" src={istockpng} />
          <div className="rectangle" />
          <img className="img" alt="Rectangle" src={rectangle2} />
          <div className="text-wrapper">Enhance Your Experience</div>
          <p className="welcome-to-a-world">
            Welcome to a world where your travel dreams take flight, and every
            journey becomes an unforgettable adventure. At our airline, we go
            beyond expectations to craft an experience that resonates with
            luxury, comfort, and seamless service. From the moment you step on
            board, immerse yourself in a realm of unparalleled hospitality and
            sophistication.Discover a new level of comfort in our meticulously
            designed cabins, where plush seats cocoon you in relaxation. Our
            in-flight entertainment system offers a diverse selection of movies,
            music, and games to keep you entertained throughout the journey.
            Indulge your senses in our gourmet cuisine, curated by world-class
            chefs, showcasing flavors from around the globe.
            <br />
            <br />
            In our commitment to personalized service, our attentive crew
            anticipates your needs, ensuring your every request is met with a
            smile. Experience the freedom of choice with our flexible booking
            options, allowing you to tailor your travel plans according to your
            preferences. Elevating your journey is not just our promise;
            it&#39;s our passion. With priority boarding, extra legroom, and
            exclusive access to luxurious airport lounges, your travels become
            seamless and indulgent. We believe in creating more than just
            flights; we create cherished memories.
            <br />
            <br />
            Join us and let your travel aspirations soar. Whether you&#39;re
            embarking on a business trip or a leisurely escape, our airline is
            your gateway to a world where every moment is crafted with care, and
            every flight is a celebration of your journey. Come aboard and let
            us enhance your experience, making your travel dreams a reality
          </p>
          <div className="group">
            <div className="overlap-group">
              <div className="overlap-group-wrapper">
                <div className="div">
                  <div className="rectangle-2" />
                  <div className="rectangle-3" />
                  <div className="rectangle-4" />
                  <div className="rectangle-5" />
                  <div className="rectangle-6" />
                  <div className="rectangle-7" />
                  <div className="rectangle-8" />
                </div>
              </div>
              <div className="group-wrapper">
                <div className="div-wrapper">
                  <div className="overlap-group-2">
                    <img
                      className="rectangle-9"
                      alt="Rectangle"
                      src={rectangle148}
                    />
                    <img
                      className="rectangle-10"
                      alt="Rectangle"
                      src={rectangle150}
                    />
                    <div className="rectangle-11" />
                    <div className="rectangle-12" />
                    <div className="rectangle-13" />
                    <div className="rectangle-14" />
                    <div className="rectangle-15" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rectangle-18" />
          <div className="group-4">
            <div className="overlap-6">
              <p className="text-wrapper-9">Beyond Horizons</p>
              <p className="text-wrapper-10">Beyond Limits</p>
            </div>
          </div>
          <div className="group-5">
            <div className="overlap-7">
              <div className="text-wrapper-11">Transportation</div>
              <img className="rectangle-19" alt="Rectangle" src={rectangle91} />
              <p className="text-wrapper-12">
                Our airline promises seamless transportation, ensuring you reach
                your destination swiftly and comfortably. With a fleet of modern
                aircraft, punctual schedules, and efficient ground services, we
                prioritize your convenience, making your journey as smooth as
                possible, from takeoff to touchdown.
              </p>
            </div>
          </div>
          <div className="group-8">
            <div className="overlap-7">
              <img className="rectangle-20" alt="Rectangle" src={rectangle92} />
              <p className="text-wrapper-15">
                At our airline, customer service is our pride. Our dedicated
                team is available around the clock, ready to assist you with a
                warm smile. Expect personalized attention, quick resolutions,
                and a commitment to making your experience with us truly
                exceptional.
              </p>
              <div className="text-wrapper-16">Customer Service</div>
            </div>
          </div>
          <div className="group-7">
            <div className="overlap-7">
              <div className="text-wrapper-34">In-Flight Service</div>
              <img className="rectangle-20" alt="Rectangle" src={rectangle93} />
              <p className="text-wrapper-14">
                Prepare for a world-class in-flight experience. From delectable
                cuisine crafted by renowned chefs to an array of entertainment
                options catering to all tastes, our attentive crew ensures your
                journey is not just comfortable but truly enjoyable. Sit back,
                relax, and let us pamper you in the skies.
              </p>
            </div>
          </div>
          <div className="group-6">
            <div className="overlap-7">
              <div className="text-wrapper-35">Baggage Handling</div>
              <img className="rectangle-20" alt="Rectangle" src={rectangle94} />
              <p className="text-wrapper-13">
                Rest easy with our meticulous baggage handling services. Your
                belongings are our responsibility, treated with utmost care from
                check-in to delivery. Our advanced tracking systems guarantee
                your luggage arrives promptly and intact, allowing you to focus
                on your travel adventures without worry.
              </p>
            </div>
          </div>
          <img className="pexels-aleksey" alt="Pexels aleksey" src={pexels} />
          <div className="rectangle-21" />
          <div className="group-9">
            <div className="rectangle-wrapper">
              <img
                className="rectangle-22"
                alt="Rectangle"
                src={rectangle100}
              />
            </div>
            <div className="overlap-8">
              <div className="rectangle-23" />
              <div className="text-wrapper-17">Indonesia</div>
              <p className="text-wrapper-18">
                Indonesia, a tropical paradise spanning thousands of islands,
                offers a captivating blend of natural beauty and cultural
                richness. From lush rainforests teeming with wildlife to
                pristine beaches with turquoise waters, every corner is a
                postcard-worthy sight. Explore ancient temples, vibrant markets,
                and indulge in the diverse flavors of Indonesian cuisine.
                Immerse yourself in the warm hospitality and vibrant traditions
                of this enchanting archipelago, where adventure and relaxation
                seamlessly intertwine.
              </p>
            </div>
          </div>
          <div className="group-10">
            <div className="img-wrapper">
              <img
                className="rectangle-24"
                alt="Rectangle"
                src={rectangle101}
              />
            </div>
            <div className="overlap-9">
              <div className="rectangle-25" />
              <div className="text-wrapper-19">Singapore</div>
              <p className="text-wrapper-20">
                Singapore, a modern marvel in the heart of Southeast Asia, is a
                city-state where tradition meets innovation. Explore the iconic
                skyline adorned with futuristic architecture, shop at bustling
                markets, and savor a culinary journey through hawker stalls
                serving delectable local fare. Discover lush gardens, vibrant
                neighborhoods, and a melting pot of cultures. In this dynamic
                city, efficiency harmonizes with a rich cultural tapestry,
                offering travelers an unforgettable experience in a truly global
                metropolis.
              </p>
            </div>
          </div>
          <div className="group-11">
            <div className="overlap-10">
              <img
                className="rectangle-26"
                alt="Rectangle"
                src={rectangle102}
              />
            </div>
            <div className="overlap-11">
              <div className="rectangle-23" />
              <div className="text-wrapper-21">Sri Lanka</div>
              <p className="text-wrapper-22">
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
          </div>
          <div className="group-12">
            <div className="overlap-12">
              <img className="rectangle-27" alt="Rectangle" src={rectangle99} />
            </div>
            <div className="overlap-13">
              <div className="rectangle-23" />
              <div className="text-wrapper-23">India</div>
              <p className="text-wrapper-24">
                India, a nation of diverse cultures and landscapes, invites you
                to explore its wonders. From the serene Himalayas to the vibrant
                beaches of Goa, discover ancient temples, bustling markets, and
                grand palaces. Indulge in the rich flavors of Indian cuisine and
                witness colorful festivals that light up the streets. Embrace
                the spirituality, warmth, and hospitality of this extraordinary
                land, where every experience is a unique tale waiting to be
                told.
              </p>
            </div>
          </div>
          <div className="group-13">
            <div className="overlap-14">
              <img
                className="pexels-erik-mclean"
                alt="Pexels erik mclean"
                src={pexelsErikMclean}
              />
              <img
                className="pexels-rachel-claire"
                alt="Pexels rachel claire"
                src={pexelsRachelClaire}
              />
              <div className="group-14">
                <div className="overlap-15">
                  <div className="rectangle-28" />
                  <div className="discounts">Discounts &amp; Memberships</div>
                  <div className="group-15">
                    <div className="overlap-group-5">
                      <div className="rectangle-29" />
                      <img
                        className="rectangle-30"
                        alt="Rectangle"
                        src={rectangle116}
                      />
                      <div className="text-wrapper-25">Platinum Class</div>
                      <p className="text-wrapper-26">
                        Our Platinum Class offers unmatched luxury, from special
                        check-in to delicious meals by famous chefs. Enjoy comfy
                        seats that turn into beds for a refreshing trip.
                        Experience personalized care, access to fancy airport
                        lounges, and lots of great extras. Your perfect journey
                        starts here.
                      </p>
                    </div>
                  </div>
                  <div className="group-16">
                    <div className="overlap-16">
                      <div className="rectangle-31" />
                      <img
                        className="rectangle-32"
                        alt="Rectangle"
                        src={rectangle117}
                      />
                      <div className="text-wrapper-27">Business Class</div>
                      <p className="text-wrapper-28">
                        Experience ultimate luxury in our Business Class. From
                        the moment you step on board, enjoy pampering with plush
                        seats, gourmet cuisine, and fine wines. With priority
                        boarding, extra legroom, and personalized service, every
                        moment is memorable. Let us redefine your journey in the
                        skies with unmatched comfort and care.
                      </p>
                    </div>
                  </div>
                  <div className="group-17">
                    <div className="overlap-17">
                      <div className="rectangle-33" />
                      <img
                        className="rectangle-34"
                        alt="Rectangle"
                        src={rectangle118}
                      />
                      <div className="text-wrapper-29">Economy Class</div>
                      <p className="text-wrapper-30">
                        Step into our Economy Class, where affordability meets
                        comfort seamlessly. Enjoy a delightful journey without
                        overspending, relishing cozy seats, delicious meals, and
                        entertainment options. Discover the pleasure of
                        budget-friendly, hassle-free flying with us. Your
                        comfortable adventure begins here!
                      </p>
                    </div>
                  </div>
                  <div className="group-18">
                    <button onClick={handleRegister} className="register-now">
                      Register Now !
                    </button>
                    <button onClick={handleLogin} className="login">
                      Login
                    </button>
                    <p className="register-today-get">
                      Register today &amp; get Unbelievable Discounts !
                    </p>
                    <p className="text-wrapper-33">Already Has an account ?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSearchClick} className="search-flight">
            Search Flights Now !
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
