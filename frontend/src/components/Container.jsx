import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
import { useParams } from "react-router";
import axios from "axios";

export default function Container() {
  const { id } = useParams();
  const [containerData, setContainerData] = useState({});
  const [cpuUsage, setCpuUsage] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState({});

  const fetchData = async () => {
    try {
      const containerRes = await axios.get(
        `http://localhost:6969/containers/${id}`
      );
      setContainerData(containerRes.data);

      const statusRes = await axios.get(
        `http://localhost:6969/containers/${id}/status`
      );
      const cpuData = statusRes.data.cpu_stats;
      if (cpuData && cpuData.cpu_usage && cpuData.cpu_usage.percpu_usage) {
        setCpuUsage(cpuData.cpu_usage.percpu_usage);
      }
      setMemoryUsage(statusRes.data.memory_stats);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(containerData);
  // console.log(cpuUsage);
  console.log(memoryUsage);

  const doughnutData = {
    labels: ["Used Memory", "Remaining Memory"],
    datasets: [
      {
        label: "Memory Usage",
        data: [memoryUsage.max_usage, memoryUsage.usage],
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderRadius: 5,
      },
    ],
  };

  return (
    <div>
      <div className="top-div">
        <h2 className="head">Container Information</h2>
        <div className="list_group">
          <div className="list_inner">
            <div className="list_item">Name: {containerData.Name}</div>
            <div className="list_item">
              Image: {containerData.Config?.Image}
            </div>
            <div className="list_item">Path: {containerData.Path}</div>
            <div className="list_item">
              Status: {containerData.State?.Status}
            </div>
          </div>
        </div>
      </div>
      <div className="mid-div">
        <h2 className="head">CPU Usage Graph</h2>
        <div className="graph">
          <div className="dataCard">
            <Line
              data={{
                labels: cpuUsage.map((usage, index) => `Core ${index + 1}`),
                datasets: [
                  {
                    label: "CPU USAGE",
                    data: cpuUsage.map((usage) => usage / 1000000),
                    fill: false,
                    backgroundColor: "rgb(255,255,255)",
                    color: "white",
                    borderColor: "rgba(75,192,192,1)",
                    tension: 0.1,
                  },
                ],
              }}
            />
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
}
