import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Article.css";

const Article = () => {
  const [containers, setContainers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:6969/containers")
      .then((res) => setContainers(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="list_heading">DockersX's Dashboard</div>
      <div className="list_top">
        <div className="list_item">Container</div>
        <div className="list_item">Image Name</div>
        <div className="list_item">State</div>
        <div className="list_item">Running</div>
        <div className="list_item">Ip Address</div>
        <div className="list_item">Status</div>
      </div>
      {containers.map((e) => {
        return (
          <div className="list_group">
            <div className="list_inner">
              <div className="list_item">{e.Names}</div>
              <div className="list_item">{e.Image}</div>
              <div className="list_item">{e.State}</div>
              <div className="list_item">
                <div
                  className={`${
                    e.State == "running" ? "green_circle" : "red_circle"
                  }`}
                ></div>
              </div>
              <div className="list_item">
                {e.NetworkSettings.Networks.bridge.IPAddress == ""
                  ? "Not connected"
                  : e.NetworkSettings.Networks.bridge.IPAddress}
              </div>
              <div className="list_item">{e.Status}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Article;
