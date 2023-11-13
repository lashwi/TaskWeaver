"use client";
import { useRef, useState } from 'react';
import Moveable from 'react-moveable';

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
  return (
    <>
      <div
        className="h-[100px] w-[200px] select-none"
        style={{
          position: 'absolute',
          left: task_state.posX,
          top: task_state.posY,
          width: task_state.width,
          height: task_state.height,
          background: task_state.color,
        }}
        ref={target_ref}
      >
        <p>{task_state.title}</p>
      </div>
      <Moveable
        target={target_ref}
        draggable={true}
        resizable={true}
        snappable={true}
        snapThreshold={5}
        snapDirections={['top', 'left', 'bottom', 'right']}
        verticalGuidelines={[0,50,100,150,200,250,300,400,450,500,550]}
        horizontalGuidelines={[0,50,100,150,200,250,300,400,450,500,550]}
        throttleDrag={1}
        throttleResize={1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
      />
    </>
  );
}
