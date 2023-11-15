"use client";

import Image from 'next/image'
import React from "react";
import GridCanvas from '@/components/Canvas';
import Task from '@/components/Task';
import Toolbar from '@/components/Toolbar';
import TaskDetails from '@/components/TaskDetails';
import { useState } from 'react';
import NavBar from '@/components/navigationbar';

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
      {/*<TaskDetails />*/}
      <h1 style={{ color: 'black' }}>Grid Canvas Example</h1>
      <NavBar />
      <GridCanvas />
      <Toolbar />
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
