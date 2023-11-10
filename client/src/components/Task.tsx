"use client";
import { useRef, useState } from 'react';
import Moveable from 'react-moveable';

interface Props {
  task: Task;
}

export default function Task({ task }: Props) {
  // const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  // }
  const target_ref = useRef(null);
  const [task_state, setTaskState] = useState<Task>(task);
  // Event handlers
  const handleDrag = (e: any) => {
    const { target, left, top } = e;
    setTaskState({
      ...task_state,
      posX: left,
      posY: top,
    });
    console.log("dragging", left, top)
    console.log(e)
  }
  const handleDragEnd = (e: any) => {
    const { target, left, top } = e;
    setTaskState({
      ...task_state,
      posX: left,
      posY: top,
    });
    console.log("dragging", left, top)
    console.log(e)
  }
  const handleResize = (e: any) => {
    const { target, clientX, clientY, width, height } = e;
    // console.log(e);
    setTaskState({
      ...task_state,
      // posX: clientX,
      // posY: clientY,
      width: width,
      height: height
    });
    console.log("resizing", clientX, clientY, width, height)
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
          // transform: `translate(${task_state.posX}px, ${task_state.posY}px)`
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
        onResize={handleResize}
      />
    </>
  );
}
