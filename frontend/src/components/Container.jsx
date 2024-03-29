import React, { useEffect, useState } from "react";
import "./Container.css";
import { useParams } from "react-router";
import axios from "axios";

export default function Container() {
  const { id } = useParams();
  const [containerData, setData] = useState({});
  const [cpuUsage, setCpuUsage] = useState({});
  const [memoryUsage, setMemoryUsage] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:6969/containers/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:6969/containers/${id}/status`).then((res) => {
      const result = res.data;
      setCpuUsage(result.cpu_stats);
      setMemoryUsage(result.memory_stats);
    });
  }, []);
  console.log(cpuUsage);
  console.log(memoryUsage);

  return <div></div>;
}
