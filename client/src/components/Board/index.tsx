"use client"
import { useEffect, useState } from 'react';
import Task from '@/components/Task';
import './styles.css';
import Toolbar from '@/components/Toolbar'

interface BoardViewState {
  offsetX: number;
  offsetY: number;
  zoom: number;
};

export default function Board() {
  const [board_view_state, setBoardViewState] = useState<BoardViewState>({
    offsetX: 0,
    offsetY: 0,
    zoom: 1.0,
  });

  const [tasks, setTaskList] = useState([
    {
      id: 1,
      title: 'Gather wood',
      description: 'Example description!',
      width: 200,
      height: 100,
      posX: 200,
      posY: 350,
      color: "#f7d9c4"
    },
    {
      id: 2,
      title: 'Build door',
      width: 200,
      height: 100,
      posX: 500,
      posY: 300,
      color: "#faedcb"
    },
    {
      id: 3,
      title: 'Build walls',
      width: 200,
      height: 100,
      posX: 500,
      posY: 450,
      color: "#faedcb"
    },
    {
      id: 4,
      title: 'Find cool tree',
      width: 200,
      height: 100,
      posX: 300,
      posY: 100,
      color: "#f7d9c4"
    },
    {
      id: 5,
      title: 'Assemble treehouse',
      width: 200,
      height: 100,
      posX: 800,
      posY: 250,
      color: "#c9e4de"
    },
  ]);

  const handleAddTask = () => {
    var newTasks = tasks.slice();
    newTasks.push({
      id: tasks.length + 1,
      title: 'Untitled',
      width: 200,
      height: 100,
      posX: 50,
      posY: 150,
      color: "#faedcb"
    });
    setTaskList(newTasks);
  };

  return (
    <div className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden bg-white">
      <Toolbar addTask={handleAddTask}/>
      <div
        style={{ zoom: board_view_state.zoom }}
        // className="board-bg-grid bg-white absolute left-1/2 top-1/2"
        className="board-bg-grid bg-white absolute h-full w-full">
        
        {tasks.map((task, idx) => (
          <Task key={idx}
                task={task}
          />
      ))}
      </div>
    </div>
    
  );
};
