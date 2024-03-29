import React, { useEffect, useState } from "react";
import "./Container.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Button } from "@chakra-ui/button";

export default function Container() {
  const { id } = useParams();
  const [containerData, setContainerData] = useState({});
  const [cpuUsage, setCpuUsage] = useState({});
  const [memoryUsage, setMemoryUsage] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const containerRes = await axios.get(
          `http://localhost:6969/containers/${id}`
        );
        setContainerData(containerRes.data);

        const statusRes = await axios.get(
          `http://localhost:6969/containers/${id}/status`
        );
        setCpuUsage(statusRes.data.cpu_stats);
        setMemoryUsage(statusRes.data.memory_stats);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);
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
      alert("Container Stopped successfully")
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
      alert("Restart succefully")
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

  console.log(containerData);
  console.log(cpuUsage);
  console.log(memoryUsage);
  return (
    <div>
      <div className="top-div">
        <div className="head">Container Information</div>
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
              {/* <div
                className={
                  containerData.State.Status == "running" ? "green_circle" : "red_circle"
                }
              ></div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mid-div">
        <div className="assess">
          {/* <div> */}
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
          {/* </div> */}
          <div className="head">CPU Usage Graph</div>
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
    </div>
  );
}
