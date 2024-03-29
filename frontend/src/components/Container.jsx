import React, { useEffect, useState } from "react";
import "./Container.css";
import { useParams } from "react-router";
import axios from "axios";

export default function Container() {
  const { id } = useParams();
  const [containerData, setData] = useState({});
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

  console.log(containerData);

  return <div></div>;
}
