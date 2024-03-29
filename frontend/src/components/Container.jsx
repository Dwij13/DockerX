import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useParams } from "react-router";
import axios from "axios";

export default function Container() {
  const { id } = useParams();
  const [containerData, setContainerData] = useState({});
  const [cpuUsage, setCpuUsage] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:6969/containers/${id}`)
      .then((res) => {
        setContainerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:6969/containers/${id}/status`)
      .then((res) => {
        const cpuStats = res.data.cpu_stats;
        const formattedData = cpuStats.map((stat, index) => ({
          name: index,
          usage: stat.total_usage,
        }));
        console.log("Formatted CPU Usage Data:", formattedData);
        setCpuUsage(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log("CPU Usage Data:", cpuUsage);

  return (
    <div>
      <div>
        <h2>Container Information</h2>
        <div className="list_group">
          <div className="list_inner">
            <div className="list_item">Name: {containerData.Name}</div>
          </div>
        </div>
      </div>
      <div>
        <h2>CPU Usage Graph</h2>
        <LineChart width={800} height={400} data={cpuUsage}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="usage" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}
