import Image from 'next/image'
import React from "react";
import GridCanvas from '@/components/Canvas';
import Task from '@/components/Task';
import TaskDetails from '@/components/TaskDetails';

export default function Home() {
  return (
    <div style={{ background: 'white' }}>
      {/* <Task title="Hello" details="Details maybe" /> */}
      {/* <Task text="Task 2" details="More details" /> */}
      {/*<TaskDetails />*/}
      <h1 style={{ color: 'black' }}>Grid Canvas Example</h1>
      <GridCanvas />
    </div>
  );
}
