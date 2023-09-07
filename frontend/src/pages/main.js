import "../styles/main.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an API call when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/5");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main role="main" class="container">
      <div className="desktop">
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper">B Airlines</div>
          </div>
          {/* <div className="user-detail">
                {
                    data.email + "  " + data.username
                }
            </div> */}
        </div>
      </div>
    </main>
  );
}
