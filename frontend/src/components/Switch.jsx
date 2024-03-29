import React, { useState, useEffect } from 'react';
import './Switch.css'

const ToggleSwitch = ({ defaultChecked }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="toggle-switch-checkbox"
      />
      <span className="toggle-switch-slider"></span>
    </label>
  );
};

export default ToggleSwitch;
