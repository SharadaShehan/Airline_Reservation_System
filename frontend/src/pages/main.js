import "../styles/main.css";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";

export default function Main() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   // Make an API call when the component mounts
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/user/5");
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <main role="main" class="container">
      <h1>HomePage</h1>
      {/* <div className="desktop">
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper">B Airlines</div>
          </div>
        </div>
      </div> */}
    </main>
  );
}
