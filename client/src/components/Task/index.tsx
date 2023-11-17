"use client";
import { useRef, useState } from 'react';
import Moveable from 'react-moveable';
import './styles.css';
import TaskDetails from '@/components/TaskDetails';

interface Props {
  task: Task;
}

export default function Task({ task }: Props) {
  const target_ref = useRef(null);
  const [task_state, setTaskState] = useState<Task>(task);
  // Event handlers
  const handleDrag = (e: any) => {
    const { target, left, top } = e;
    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
  }
  const handleDragEnd = (e: any) => {
    const { left, top } = e;
    setTaskState({
      ...task_state,
      posX: left,
      posY: top,
    });
  }
  const handleResizeStart = (e: any) => {
    e.setMin([50, 50]);
  };
  const handleResize = (e: any) => {
    const { target, width, height, drag } = e;
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
    if (drag) {
      if (drag.left) {
        target.style.left = `${drag.left}px`;
      }
      if (drag.top) {
        target.style.top = `${drag.top}px`;
      }
    }
  }
  const handleResizeEnd = (e: any) => {
    const { width, height } = e;
    setTaskState({
      ...task_state,
      width: width,
      height: height
    });
  }

  // State to control whether the popup is visible
  const [showPopup, setShowPopup] = useState(false);

  // Function to toggle the popup visibility
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <span className="task-container pointer-events-none">
      <div
        className="pointer-events-auto hover:cursor-pointer select-none rounded-xl p-2 text-lg overflow-hidden"
        style={{
          position: 'relative',
          left: `${task_state.posX}px`,
          top: `${task_state.posY}px`,
          width: `${task_state.width}px`,
          height: `${task_state.height}px`,
          background: task_state.color,
        }}
        ref={target_ref}
        onClick={handleTogglePopup}
      >
        <p>{task_state.title}</p>
      </div>
      <Moveable
        className="pointer-events-auto"
        target={target_ref}
        draggable={true}
        resizable={true}
        snappable={true}
        snapThreshold={5}
        snapDirections={['top', 'left', 'bottom', 'right']}
        snapGridWidth={50}
        snapGridHeight={50}
        isDisplayGridGuidelines={true}
        // verticalGuidelines={[-50,0,50,100,150,200,250,300,350,400,450,500,550]}
        // horizontalGuidelines={[-50,0,50,100,150,200,250,300,350,400,450,500,550]}
        throttleDrag={1}
        throttleResize={1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onResizeStart={handleResizeStart}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
      />
      {showPopup && <TaskDetails onClose={handleTogglePopup} />}
    </span>
  );
}
