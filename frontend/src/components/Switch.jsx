import React, { useState, useEffect } from "react";
import "./Switch.css";
import axios from "axios";

const ToggleSwitch = ({ defaultChecked, id }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);


  const handleToggle = async (id) => {
    try {
      setIsChecked(!isChecked);
      const action = isChecked ? "stop" : "start";
      await axios.post(`http://localhost:6969/containers/${id}/${action}`);
      window.location.reload();
    } catch (error) {
      console.error(`Error toggling container: ${error}`);
    }
  };
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleToggle(id)}
        className="toggle-switch-checkbox"
      />
      <span className="toggle-switch-slider"></span>
    </label>
  );
};

export default ToggleSwitch;
