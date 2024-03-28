import React from "react";
import "./Home.css";
import image1 from "../assets/visual_data.png";
import image2 from "../assets/charts.png";

const Home = () => {
  return (
    <div>
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
        <button className="btn">Get Started</button>
      </div>
      <div className="img">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
      </div>
    </div>
  );
};

export default Home;
