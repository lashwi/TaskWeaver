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
  const [board, setBoard] = useState<Board>({
    id: 1,
    title: "Dream Treehouse Project",
    tasks: [
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
        color: "#f7d9c4",
        textColor: "#b35b5b"
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
    ],
    arrows: [
      {
        id: 1,
        from: 1,
        to: 2,
        color: "#7f00f7"
      },
      {
        id: 2,
        from: 1,
        to: 3,
        color: "#7f00f7"
      },
      {
        id: 3,
        from: 4,
        to: 5,
        color: "#7f00f7"
      },
      {
        id: 4,
        from: 3,
        to: 5,
        color: "#7f00f7"
      },
      {
        id: 5,
        from: 2,
        to: 5,
        color: "#7f00f7"
      }
    ],
    users: [
      {
        id: 1,
        name: "Alice"
      },
      {
        id: 2,
        name: "Bob"
      }
    ]
  });
  const setTasks = (tasks: Task[]) => {
    setBoard({
      ...board,
      tasks
    });
  };
  const setArrows = (arrows: Arrow[]) => {
    setBoard({
      ...board,
      arrows
    });
  };
  // const setUsers = (users: User[]) => {
  //   setBoard({
  //     ...board,
  //     users
  //   });
  // };
  const [nextTaskID, setNextTaskID] = useState<number>(6);
  const [nextArrowID, setNextArrowID] = useState<number>(6);

  // Temporary board view state
  const [board_view_state, setBoardViewState] = useState<BoardViewState>({
    offsetX: 0,
    offsetY: 0,
    zoom: 1.0,
  });

  // Tool-specific states
  const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Pointer);
  const [pointerToolState, setPointerToolState] = useState<PointerToolState>({
    _selected_task: null
  });
  const [arrowToolState, setArrowToolState] = useState<ArrowToolState>({
    color: "#7f00f7",
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
        const selected_task = board.tasks.find((t) => t.id == id);
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
      id: nextTaskID,
      title: "Untitled task",
      description: "",
      width: 200,
      height: 100,
      posX: clientX,
      posY: clientY,
      color: "#faedcb"
    };
    setNextTaskID(nextTaskID + 1);
    setTasks([...board.tasks, newTask]);
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
    const taskIdx = board.tasks.findIndex((t) => t.id == task.id);
    if (taskIdx == -1) {
      console.error(`Task ${task.id} not found`);
      return;
    }
    console.log(`Updating task ${task.id}`);
    const newTasks = board.tasks.slice();
    newTasks[taskIdx] = task;
    setTasks(newTasks);
    setPointerToolState({
      ...pointerToolState,
      _selected_task: task
    });
  };

  const addArrow = (firstTaskId: number, secondTaskId: number) => {
    const newArrow: Arrow = {
      id: nextArrowID,
      from: firstTaskId,
      to: secondTaskId,
      color: arrowToolState.color
    };
    setNextArrowID(nextArrowID + 1);
    setArrows([...board.arrows, newArrow]);
  };

  const removeArrow = (firstTaskId: number, secondTaskId: number) => {
    const updatedArrows = board.arrows.filter(arrow => !(arrow.from == firstTaskId && arrow.to == secondTaskId));
    setArrows(updatedArrows);
  };

  const deleteTask = (task: Task) => {
    if (!window.confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      return;
    }
    console.log(`Deleting task ${task.id}`);
    const updatedArrows = board.arrows.filter(a => (a.from != task.id && a.to != task.id));
    const newTasks = board.tasks.filter(t => t.id != task.id);
    setBoard({
      ...board,
      arrows: updatedArrows,
      tasks: newTasks,
    });
    resetPointerToolState();
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
          {board.tasks.map((task) => {
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
                key={task.id}
                task={task}
                className={className}
                isMoveable={selectedTool == Tool.Move}
                handleTaskClick={handleTaskClick}
                handleTaskUpdate={updateTask}
              />
            );
          })}
          {board.arrows.map((arrow) => (
            <Xarrow
              key={arrow.id}
              start={arrow.from.toString()}
              end={arrow.to.toString()}
              color={arrow.color}
            />
          ))}
        </Xwrapper>
      </div>
      <div className="z-10 absolute top-4 left-4 right-4 bottom-4 flex flex-col pointer-events-none">
        <Navbar
          title={board.title}
          handleTitleChange={(title) => setBoard({ ...board, title })}
          handleNewBoard={() => {
            resetPointerToolState();
            resetArrowToolState();
            setBoard({
              id: 2,
              title: "New board",
              tasks: [],
              arrows: [],
              users: []
            });
          }}
        />
        <div className="relative h-full">
          <div className="h-full flex">
            <span className="my-auto pt-2 pb-32">
              <Toolbar
                selectedTool={selectedTool}
                setSelectedTool={handleSetTool}
              />
            </span>
          </div>
          <div className="absolute w-full top-8 bottom-4">
            {pointerToolState._selected_task ? (
              <TaskDetailsPane
                task={pointerToolState._selected_task}
                otherTasks={board.tasks.filter((task) => task.id != pointerToolState._selected_task!.id)}
                arrows={board.arrows}
                users={board.users}
                handleClose={() => setPointerToolState({...pointerToolState, _selected_task: null })}
                handleTaskUpdate={updateTask}
                addArrow={addArrow}
                removeArrow={removeArrow}
                deleteTask={deleteTask}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
