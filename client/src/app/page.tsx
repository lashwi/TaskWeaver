"use client";
import { useState } from 'react';
import Board from '@/components/Board';
import Navbar from '@/components/Navbar';
import Toolbar from '@/components/Toolbar';
import TaskDetails from '@/components/TaskDetails';

export default function Home() {
  // State to control whether the popup is visible
  const [showPopup, setShowPopup] = useState(false);

  // Function to toggle the popup visibility
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative">
      <Board />
      <Navbar />
      <Toolbar />
      <div>
        {/* Button to open/close the TaskPopup */}
        <button onClick={handleTogglePopup}>Task Details</button>
        {/* Conditionally render the TaskPopup based on showPopup state */}
        {showPopup && <TaskDetails onClose={handleTogglePopup} />}
      </div>
    </div>
  );
}
