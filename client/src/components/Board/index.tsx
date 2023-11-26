"use client";
import { useEffect, useState } from 'react';
import Task from '@/components/Task';
import './styles.css';
import Toolbar from '@/components/Toolbar';
import Xarrow, { Xwrapper } from 'react-xarrows';

interface BoardViewState {
  offsetX: number;
  offsetY: number;
  zoom: number;
};

interface TaskToolState {

};

interface ArrowToolState {
  firstId: number;
  color: string;
};

export enum Tool {
  Pointer,
  Move,
  Task,
  Arrow
};

export default function Board() {
  const [board_view_state, setBoardViewState] = useState<BoardViewState>({
    offsetX: 0,
    offsetY: 0,
    zoom: 1.0,
  });

  const [tasks, setTaskList] = useState<Task[]>([
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

  const [arrowList, setArrowList] = useState<Arrow[]>([
    {
      id: 1,
      from: 1,
      to: 2,
      color: "#0000ff"
    }
  ]);

  // TODO: Remove this state and use the state from Toolbar
  // const [isAddArrowMode, setAddArrowMode] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Pointer);

  // Tool-specific states
  const [arrowToolState, setArrowToolState] = useState<ArrowToolState>({
    firstId: -1,
    color: "#0000ff"
  });

  const handleSetTool = (t: Tool) => {
    setSelectedTool(t);
    switch (t) {
      case Tool.Pointer:
        handleSetPointerTool();
        break;
      case Tool.Move:
        handleSetMoveTool();
        break;
      case Tool.Task:
        handleAddTask();
        break;
      case Tool.Arrow:
        console.log('Selected arrow tool');
        setArrowToolState({
          ...arrowToolState,
          firstId: -1
        });
        break;
    };
  };

  const handleTaskClick = (id: number) => {
    console.log(`Clicked task ${id}`);
    switch (selectedTool) {
      case Tool.Pointer:
        break;
      case Tool.Move:
        break;
      case Tool.Task:
        break;
      case Tool.Arrow:
        if (id == arrowToolState.firstId) {
          break;
        } else if (arrowToolState.firstId == -1) {
          setArrowToolState({
            ...arrowToolState,
            firstId: id
          });
        } else {
          addArrow(arrowToolState.firstId, id);
          setArrowToolState({
            ...arrowToolState,
            firstId: -1
          });
          // TODO: Support switching back to previous tool
          // setSelectedTool(Tool.Pointer);
        }
        break;
    };
  };

  const handleSetPointerTool = () => {
    console.log('Selected pointer tool');
    // TODO: Set CSS cursor to 'default'
  };

  const handleSetMoveTool = () => {
    console.log('Move tool selected');
    // TODO: Set CSS cursor to 'move'
  };

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

  const addArrow = (firstId: number, secondId: number) => {
    const newArrow: Arrow = {
      id: arrowList.length + 1, // TODO: Better way of assigning arrow IDs
      from: firstId,
      to: secondId,
      color: arrowToolState.color
    };
    setArrowList([...arrowList, newArrow]);
  };

  return (
    <div className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden bg-white">
      <Toolbar
        selectedTool={selectedTool}
        setSelectedTool={handleSetTool}
      />
      <Xwrapper>
        <div
          style={{ zoom: board_view_state.zoom }}
          // className="board-bg-grid bg-white absolute left-1/2 top-1/2"
          className="board-bg-grid bg-white absolute h-full w-full">
          {tasks.map((task, idx) => (
            // TODO: Conditional styles based on selected tool
            <Task
              key={idx}
              task={task}
              handleTaskClick={handleTaskClick}
            />
          ))}
          {arrowList.map((arrow, idx) => (
            <Xarrow
              key={idx}
              start={arrow.from.toString()}
              end={arrow.to.toString()}
            />
          ))}
        </div>
      </Xwrapper>
    </div>
  );
};
