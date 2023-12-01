"use client";
import Moveable from 'react-moveable';
import { useDeferredValue, useRef } from 'react';
import { useXarrow } from 'react-xarrows';
import './styles.css';

interface Props {
  task: Task;
  className?: string;
  isMoveable?: boolean;
  handleTaskClick: (id: number) => void;
  handleTaskUpdate: (task: Task) => void;
};

export default function Task(props: Props) {
  const { task, className, isMoveable, handleTaskClick, handleTaskUpdate } = props;
  const target_ref = useRef(null);
  const updateXarrow = useXarrow();
  // Event handlers
  const handleDrag = (e: any) => {
    const { target, left, top } = e;
    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
    updateXarrow;
  };
  const handleDragEnd = (e: any) => {
    const { left, top } = e;
    handleTaskUpdate({
      ...task,
      posX: left,
      posY: top,
    });
  };
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
  };
  const handleResizeEnd = (e: any) => {
    const { width, height } = e;
    handleTaskUpdate({
      ...task,
      width,
      height
    });
  };

  return (
    <span className={`absolute left-0 top-0 task-container pointer-events-none ${isMoveable ? "active" : ""}`}>
      <div
        id={task.id.toString()} // TODO: Add prefix
        className={`pointer-events-auto select-none rounded-xl p-2 text-lg overflow-hidden ${className}`}
        style={{
          position: 'relative',
          left: `${task.posX}px`,
          top: `${task.posY}px`,
          width: `${task.width}px`,
          height: `${task.height}px`,
          background: task.color,
        }}
        ref={target_ref}
        onClick={() => handleTaskClick(task.id)}
      >
        <p>{useDeferredValue(task.title)}</p>
      </div>
      {isMoveable ? (
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
          // isDisplayGridGuidelines={true} // TODO: Reenable!!
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
      ) : null}
    </span>
  );
}
