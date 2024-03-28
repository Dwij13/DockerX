import React from "react";
import "./Home.css";
import image1 from "../assets/visual_data.png";
import image2 from "../assets/charts.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="heading">
        <h1>Welcome To DockersX</h1>
      </div>
      <div className="text">
        <h4>
          Docker's visual canvas streamlines container operations, allowing
          seamless starting, stopping, and restarting of applications.
        </h4>
      </div>
      <div className="start">
        <Link to={"/containers"}>
          <button className="btn">Get Started</button>
        </Link>
      </div>
      <div className="img">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
      </div>
    </div>
  );
};

export default Home;
