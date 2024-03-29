import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import "./Container.css";
import { Button } from "@chakra-ui/button";

export default function Container() {
  const { id } = useParams();
  const [containerData, setContainerData] = useState({});
  const [cpuUsage, setCpuUsage] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState({});
  const navigator = useNavigate();

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

  const startContainer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:6969/containers/${id}/start`
      );
      if (response.status === 200) {
        alert("Container started successfully");
      } else {
        console.error("Error starting container:", response);
        alert("Failed to start container");
      }
    } catch (err) {
      console.error("Error starting container:", err);
      alert("Failed to start container");
    }
  };
  const stopContainer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:6969/containers/${id}/stop`
      );
      alert("Container Stopped successfully");
      if (response.status !== 200) {
        console.error("Error stopping container:", response);
      }
    } catch (err) {
      console.error("Error stopping container:", err);
    }
  };
  const restartContainer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:6969/containers/${id}/restart`
      );
      alert("Restart succefully");
      if (response.status === 200) {
        console.log("Restart successful");
      } else {
        console.error("Error restarting container:", response);
      }
    } catch (err) {
      console.error("Error restarting container:", err);
    }
  };
  const deleteContainer = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:6969/containers/${id}`
      );
      if (response.status === 200) {
        alert("Container deleted successfully");
        navigator("/containers");
      } else {
        console.error("Error deleting container:", response);
        alert("Failed to delete container");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="top-div">
        <div className="head">
          <IoArrowBack
            color="white"
            size="2rem"
            cursor="pointer"
            onClick={() => navigator(-1)}
          />
        </div>
        <div className="list_group">
          <div className="list_inner">
            <div className="list_item">
              <ul>
                <li>Name: {containerData.Name}</li>
              </ul>
            </div>
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
        <div className="assess">
          <div className="buttons">
            <Button
              padding="1vmax"
              border="none"
              borderRadius="13px"
              width="6vmax"
              backgroundColor="purple"
              color="white"
              cursor="pointer"
              onClick={startContainer}
            >
              Start
            </Button>
            <Button
              padding="1vmax"
              border="none"
              borderRadius="13px"
              width="6vmax"
              backgroundColor="purple"
              color="white"
              cursor="pointer"
              onClick={stopContainer}
            >
              Stop
            </Button>
          </div>
          <div className="buttons">
            <Button
              padding="1vmax"
              border="none"
              borderRadius="13px"
              width="6vmax"
              backgroundColor="purple"
              color="white"
              cursor="pointer"
              onClick={restartContainer}
            >
              Restart
            </Button>
            <Button
              padding="1vmax"
              border="none"
              borderRadius="13px"
              width="6vmax"
              cursor="pointer"
              backgroundColor="purple"
              color="white"
              onClick={deleteContainer}
            >
              Delete
            </Button>
          </div>
        </div>
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
