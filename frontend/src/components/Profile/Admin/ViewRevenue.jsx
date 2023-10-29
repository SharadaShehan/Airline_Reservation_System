import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./viewRevenue.css";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

function ViewRevenue() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  const token = Cookies.get("access-token");

  const { setUserMenuItem } = UserMenuGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [modelsList, setModelsList] = useState([]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(
    function () {
      async function getModelsList() {
        try {
          const response = await axios.get(
            `${BaseURL}/admin/revenue-by-model`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setModelsList(response.data);
        } catch (error) {
          console.log(error);
          if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            setCurrentUserData({
              username: null,
              firstName: null,
              lastName: null,
              isAdmin: null,
              isDataEntryOperator: null,
              bookingsCount: null,
              category: null,
            });
          }
        }
      }
      getModelsList();
    },
    [BaseURL, token, setCurrentUserData]
  );

  useEffect(() => {
    setChartData({
      labels: modelsList.map((model) => model.model),
      datasets: [
        {
          data: modelsList.map((model) => model.revenue),
          backgroundColor: modelsList.map(() => generateRandomColor()),
        },
      ],
    });
  }, [modelsList]);

  function handleBackClick() {
    setUserMenuItem("profile-details");
  }

  return (
    <div className="outer-box">
      <span className="view-revenue">View Revenue By Model</span>
      <div className="inner-box">
        {modelsList.length ? (
          <div
            style={{
              height: "375px",
              overflow: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Booking Sets Count</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {modelsList.map((model) => (
                  <tr key={model.model}>
                    <td>{model.model}</td>
                    <td>{model.bookingSetsCount}</td>
                    <td>$ {model.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="chart-container">
              <div className="pie-chart">
                <Doughnut
                  data={chartData}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    animation: {
                      animateScale: true,
                      animateRotate: true,
                    },
                  }}
                />
              </div>
              <div className="legend">
                {modelsList.map((model, index) => (
                  <div key={model.model}>
                    <div
                      className="color"
                      style={{
                        backgroundColor:
                          chartData.datasets[0].backgroundColor[index],
                      }}
                    ></div>
                    <div className="label">{model.model}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h4 className="loading-text">Loading Details Please Wait....</h4>
        )}
      </div>

      <div className="buttons-div">
        <button onClick={handleBackClick} className="buttons">
          Back
        </button>
      </div>
    </div>
  );
}

export default ViewRevenue;
