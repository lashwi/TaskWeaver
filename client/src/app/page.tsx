"use client";

import React from "react";
import TaskDetails from '@/components/TaskDetails';
import { useState } from 'react';

export default function Home() {
  // State to control whether the popup is visible
  const [showPopup, setShowPopup] = useState(false);

  // Function to toggle the popup visibility
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  

  return (
    <div style={{ background: 'white' }}>
      <div>
        {/* <TaskDetails /> */}
        {/* Button to open/close the TaskPopup */}
        <button onClick={handleTogglePopup}>Task Details</button>
        {/* Conditionally render the TaskPopup based on showPopup state */}
        {showPopup && <TaskDetails onClose={handleTogglePopup} />}
      </div>
    </div>
  );
}
