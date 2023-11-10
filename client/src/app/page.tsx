import Image from 'next/image'
import React from "react";
import GridCanvas from '@/components/Canvas';
import Task from '@/components/Task';

const tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Example description!',
    width: 200,
    height: 100,
    posX: 0,
    posY: 100,
    color: "#ff0000"
  }
]

export default function Home() {
  return (
    <div style={{ background: 'white' }}>
      {/* <Task title="Hello" details="Details maybe" /> */}
      {/* <Task text="Task 2" details="More details" /> */}
      <Task task={tasks[0]} />
      <h1 style={{ color: 'black' }}>Grid Canvas Example</h1>
      <GridCanvas />
    </div>
  );
}
