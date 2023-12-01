"use client";
import { useState } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import Navbar from '@/components/Navbar';
import Task from '@/components/Task';
import TaskDetailsPane from '@/components/TaskDetailsPane';
import Toolbar from '@/components/Toolbar';
import './styles.css';


interface BoardViewState {
  offsetX: number;
  offsetY: number;
  zoom: number;
};

interface PointerToolState {
  _selected_task: Task | null;
};

interface TaskToolState {
  color: string;
};

interface ArrowToolState {
  color: string;
  _firstId: number;
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

  const [arrows, setarrows] = useState<Arrow[]>([
    {
      id: 1,
      from: 1,
      to: 2,
      color: "#0000ff"
    }
  ]);

  // Tool-specific states
  const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Pointer);
  const [pointerToolState, setPointerToolState] = useState<PointerToolState>({
    _selected_task: null
  });
  const [arrowToolState, setArrowToolState] = useState<ArrowToolState>({
    color: "#0000ff",
    _firstId: -1
  });

  const handleSetTool = (t: Tool) => {
    setSelectedTool(t);
    switch (t) {
      case Tool.Pointer:
        console.log('Selected pointer tool');
        break;
      case Tool.Move:
        console.log('Selected move tool');
        resetPointerToolState();
        break;
      case Tool.Task:
        console.log('Selected task tool');
        resetPointerToolState();
        // handleAddTask();
        break;
      case Tool.Arrow:
        console.log('Selected arrow tool');
        resetPointerToolState();
        resetArrowToolState();
        break;
    };
  };

  const handleTaskClick = (id: number) => {
    switch (selectedTool) {
      case Tool.Pointer:
        const selected_task = tasks.find((t) => t.id == id);
        if (selected_task) {
          setPointerToolState({
            ...pointerToolState,
            _selected_task: selected_task
          });
        }
        break;
      case Tool.Move:
        break;
      case Tool.Task:
        break;
      case Tool.Arrow:
        if (id == arrowToolState._firstId) {
          resetArrowToolState();
        } else if (arrowToolState._firstId == -1) {
          setArrowToolState({
            ...arrowToolState,
            _firstId: id
          });
        } else {
          addArrow(arrowToolState._firstId, id);
          resetArrowToolState();
        }
        break;
    };
  };

  const handleAddNewTask = (e: React.MouseEvent<HTMLDivElement>) => {
    // TODO: Technically, we should do more calculations to account for a panned canvas
    const { clientX, clientY } = e.nativeEvent;
    const newTask: Task = {
      id: tasks.length + 1, // TODO: Better way of assigning task IDs
      title: "Untitled task",
      description: "",
      width: 200,
      height: 100,
      posX: clientX,
      posY: clientY,
      color: "#faedcb"
    };
    setTaskList([...tasks, newTask]);
    setSelectedTool(Tool.Pointer);
    setPointerToolState({
      ...pointerToolState,
      _selected_task: newTask
    });
  }

  const resetPointerToolState = () => {
    setPointerToolState({
      ...pointerToolState,
      _selected_task: null
    });
  };

  const resetArrowToolState = () => {
    setArrowToolState({
      ...arrowToolState,
      _firstId: -1
    });
  };

  const updateTask = (task: Task) => {
    const taskIdx = tasks.findIndex((t) => t.id == task.id);
    if (taskIdx == -1) {
      console.error(`Task ${task.id} not found`);
      return;
    }
    console.log(`Updating task ${task.id}`);
    const newTasks = tasks.slice();
    newTasks[taskIdx] = task;
    setTaskList(newTasks);
  };

  const addArrow = (firstTaskId: number, secondTaskId: number) => {
    const newArrow: Arrow = {
      id: arrows.length + 1, // TODO: Better way of assigning arrow IDs
      from: firstTaskId,
      to: secondTaskId,
      color: arrowToolState.color
    };
    setarrows([...arrows, newArrow]);
  };

  const removeArrow = (firstTaskId: number, secondTaskId: number) => {
    const updatedArrows = arrows.filter(arrow => !(arrow.from == firstTaskId && arrow.to == secondTaskId));
    setarrows(updatedArrows);
  };

  return (
    <div className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden bg-white">
      <div
        style={{ zoom: board_view_state.zoom }}
        // className="z-0 board-bg-grid bg-white absolute left-1/2 top-1/2"
        className={`z-0 board-bg-grid bg-white absolute h-full w-full ${selectedTool == Tool.Task ? 'cursor-crosshair' : ''}`}
        onClick={selectedTool == Tool.Task ? handleAddNewTask : undefined}
      >
        <Xwrapper>
          {tasks.map((task, idx) => {
            let className = '';
            if (pointerToolState._selected_task?.id == task.id) {
              className += 'ring ring-offset-2 ring-primary ';
            } else if (selectedTool == Tool.Pointer) {
              className += 'hover:cursor-pointer hover:ring hover:ring-secondary ';
            }
            if (arrowToolState._firstId == task.id) {
              className += 'ring ring-offset-2 ring-secondary ';
            }
            switch (selectedTool) {
              case Tool.Move:
                className += 'hover:cursor-move ';
                break;
              case Tool.Arrow:
                className += 'hover:cursor-alias ';
                break;
            };
            return (
              <Task
                key={idx}
                task={task}
                className={className}
                isMoveable={selectedTool == Tool.Move}
                handleTaskClick={handleTaskClick}
                handleTaskUpdate={updateTask}
              />
            );
          })}
          {arrows.map((arrow, idx) => (
            <Xarrow
              key={idx}
              start={arrow.from.toString()}
              end={arrow.to.toString()}
            />
          ))}
        </Xwrapper>
      </div>
      <div className="z-10 absolute top-4 left-4 right-4 flex flex-col pointer-events-none">
        <Navbar />
        <div className="relative">
          <div className="absolute flex grow-0 top-64">
            <Toolbar
              selectedTool={selectedTool}
              setSelectedTool={handleSetTool}
            />
          </div>
          <div className="absolute top-8 right-0">
            {pointerToolState._selected_task ? (
              <TaskDetailsPane
                task={pointerToolState._selected_task}
                otherTasks={tasks.filter((task) => task.id != pointerToolState._selected_task!.id)}
                arrows={arrows}
                handleClose={() => setPointerToolState({...pointerToolState, _selected_task: null })}
                handleTaskUpdate={updateTask}
                addArrow={addArrow}
                removeArrow={removeArrow}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
