import React, { useEffect, useState } from "react";
import "./Container.css";
import { useParams } from "react-router";
import axios from "axios";

export default function Container() {
  const { id } = useParams();
  const [containerData, setContainerData] = useState({});
  const [cpuUsage, setCpuUsage] = useState({});
  const [memoryUsage, setMemoryUsage] = useState({});

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
  console.log(containerData);
  console.log(cpuUsage);
  console.log(memoryUsage);
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
        <h2 className="head">CPU Usage Graph</h2>
      </div>
    </div>
  );
}
