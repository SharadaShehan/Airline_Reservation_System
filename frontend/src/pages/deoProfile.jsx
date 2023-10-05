import React, { useState } from "react";
import AddAirPlane from "./deoProfiles/deoAddAirPlane";
import AddAirport from "./deoProfiles/deoAddAirport";
import AddModel from "./deoProfiles/deoAddModel";
import AddRoute from "./deoProfiles/deoAddRoute";
import ScheduleFlight from "./deoProfiles/deoScheduleFlight";
import UpdateDelay from "./deoProfiles/deoUpdateDelay";
import "./deoProfileStyles.css";

const DeoProfile = () => {
    const [profile, setProfile] = useState(null);

    const handleClick = (profile) => {
        setProfile(profile);
    };

    return (
        <>
                <div className="deoprofilepage">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <img className="pexels-tobias-bjrkli" alt="Pexels tobias bjrkli" src="pexels-tobias-bj-rkli-2239487-1.jpg" />
                    <div className="header">
                        <div className="header-v">
                            <div className="container-wrapper">
                                <div className="container">
                                    <div className="group">
                                        <div className="overlap-group-wrapper">
                                            <div className="overlap-group">
                                                <div className="text-wrapper">Log out</div>
                                            </div>
                                        </div>
                                        <div className="div-wrapper">
                                            <div className="div">
                                                <div className="text-wrapper-2">DEO Profile</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="logo">
                                        <div className="text-wrapper-3">B Airlines</div>
                                        <img className="img" alt="Group" src="group-39518.png" />
                                    </div>
                                    <div className="nav-list">
                                        <Link
                                            className="link-instance"
                                            color="default"
                                            icon="default"
                                            iconLeft={false}
                                            iconRight={false}
                                            masterLinkDivClassName="design-component-instance-node"
                                            masterLinkText="Home"
                                            weight="regular"
                                        />
                                        <Link
                                            className="link-instance"
                                            color="default"
                                            icon="default"
                                            iconLeft={false}
                                            iconRight={false}
                                            masterLinkDivClassName="design-component-instance-node"
                                            masterLinkText="About"
                                            weight="regular"
                                        />
                                        <Link
                                            className="link-instance"
                                            color="default"
                                            icon="default"
                                            iconLeft={false}
                                            iconRight
                                            masterLinkDivClassName="design-component-instance-node"
                                            masterLinkIcon={<ChevronDown className="chevron-down" />}
                                            masterLinkText="Services"
                                            weight="regular"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="group-2">
                        <div className="overlap-2">
                            <div className="rectangle" />
                            <div className="text-wrapper-4">Data Entry Operator profile</div>
                            <p className="first-name-mahinda">
                                First Name : Mahinda
                                <br />
                                last Name : Rajapaksha
                                <br />
                                Category : None
                            </p>
                        </div>
                    </div>
                    <div className="group-3">
                        <div className="overlap-3">
                            <div className="rectangle-2" />
                            <div className="text-wrapper-5">Operations</div>
                            <div className="group-4">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-6">Add Airport</div>
                                </div>
                            </div>
                            <div className="group-5">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-7">Add Flight</div>
                                </div>
                            </div>
                            <div className="group-6">
                                <div className="overlap-4">
                                    <div className="text-wrapper-8">Schedule Flight</div>
                                </div>
                            </div>
                            <div className="group-7">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-9">Update Delay</div>
                                </div>
                            </div>
                            <div className="group-8">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-10">Add Model</div>
                                </div>
                            </div>
                            <div className="group-9">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-11">Add Route</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="overlap-5">
                            <img className="rectangle-3" alt="Rectangle" src="rectangle.svg" />
                            <div className="image">
                                <div className="overlap-group-3">
                                    <div className="mask" />
                                    <img className="mask-2" alt="Mask" src="mask.svg" />
                                    <div className="ellipse" />
                                    <img className="istock" alt="Istock" src="istock-1157896252.png" />
                                    <img className="group-10" alt="Group" src="group-140.png" />
                                </div>
                            </div>
                            <div className="line-adn-icons">
                                <div className="overlap-6">
                                    <img className="frame" alt="Frame" src="frame-175.svg" />
                                    <div className="overlap-7">
                                        <img className="line" alt="Line" src="line-1.svg" />
                                        <img className="output" alt="Output" src="output-onlinepngtools-1-2.png" />
                                        <img className="line-2" alt="Line" src="line-2.svg" />
                                    </div>
                                </div>
                            </div>
                            <p className="p">CSE 21 University of Moratuwa. Sri Lanka</p>
                            <div className="text-wrapper-12">About Us</div>
                            <div className="text-wrapper-13">Contact Us</div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
            {/* <div className="container">
                <div className="buttons">
                    <button onClick={() => handleClick(<AddAirPlane />)}>AddAirPlane</button>
                    <button onClick={() => handleClick(<AddAirport />)}>AddAirport</button>
                    <button onClick={() => handleClick(<AddModel />)}>AddModel</button>
                    <button onClick={() => handleClick(<AddRoute />)}>AddRoute</button>
                    <button onClick={() => handleClick(<ScheduleFlight />)}>ScheduleFlight</button>
                    <button onClick={() => handleClick(<UpdateDelay />)}>UpdateDelay</button>
                </div>
                <div className="profile">{profile}</div>
            </div> */}
        </>
    );
};

export default DeoProfile;


