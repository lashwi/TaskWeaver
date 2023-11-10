import Image from 'next/image'
import React from "react";
import GridCanvas from '@/components/Canvas';
import Task from '@/components/Task';
import Toolbar from '@/components/Toolbar';

export default function Home() {
  return (
    <div style={{ background: 'white' }}>
      {/* <Task title="Hello" details="Details maybe" /> */}
      {/* <Task text="Task 2" details="More details" /> */}
      <h1 style={{ color: 'black' }}>Grid Canvas Example</h1>
      <GridCanvas />
      <Toolbar />
    </div>
  );
}
