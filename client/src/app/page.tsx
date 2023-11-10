"use client";

import Image from 'next/image'
import React from "react";
import GridCanvas from '@/components/Canvas';
import Task from '@/components/Task';
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
      {/* <Task title="Hello" details="Details maybe" /> */}
      {/* <Task text="Task 2" details="More details" /> */}
      <h1 style={{ color: 'black' }}>Grid Canvas Example</h1>
      <GridCanvas />
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
