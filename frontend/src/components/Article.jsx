import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Article.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ToggleSwitch from "./Switch";
import { Button } from "@chakra-ui/button";
import { Img } from "@chakra-ui/react";

const Article = () => {
  const [containers, setContainers] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:6969/containers")
      .then((res) => setContainers(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="article-div">
        <div className="list_heading">
      <Link style={{ textDecoration: "none" }} to={"/"}>
          <div>
            <Img src="/logo.png" height={40} />
          </div>
      </Link>
          DockersX's Dashboard
        </div>
      <div className="list_top">
        <div className="list_item">Start/Stop</div>
        <div className="list_item">Container</div>
        <div className="list_item">Image Name</div>
        <div className="list_item">State</div>
        <div className="list_item">Running</div>
        <div className="list_item">Ip Address</div>
        <div className="list_item">View</div>
      </div>
      {containers.map((e) => {
        return (
          <div className="list_group">
            <div className="list_inner">
              <div className="list_item">
                <ToggleSwitch
                  defaultChecked={e.State === "running"}
                  id={e.Id}
                />
              </div>
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
              <div className="list_item">
                <Button
                  border="none"
                  backgroundColor="purple"
                  color="white"
                  padding="0.7vmax"
                  borderRadius="15px"
                  cursor="pointer"
                  onClick={() => Navigate(`/containers/${e.Id}`)}
                >
                  View details
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Article;
