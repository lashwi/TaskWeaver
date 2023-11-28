"use client";
import { useState } from 'react';
import Board from '@/components/Board';

export default function Home() {
  // State to control whether the popup is visible
  const [showPopup, setShowPopup] = useState(false);

  // Function to toggle the popup visibility
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden bg-white">
      <Board />
    </div>
  );
}
