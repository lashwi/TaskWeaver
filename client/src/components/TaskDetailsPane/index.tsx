import { useRef, useState } from 'react';
import Moveable from 'react-moveable';
import Select from 'react-select';
import { Dismiss24Filled } from '@fluentui/react-icons';
import Dropdown from '@/components/Dropdown';
import DependencyView from '@/components/TaskDetails/DependencyView';
import './ResizablePane.css';

interface Props {
  task: Task;
  otherTasks: Task[];
  arrows: Arrow[];
  handleClose: () => void;
  handleTaskUpdate: (task: Task) => void;
};

interface PaneState {
  posX: number;
  posY: number;
  width: number;
  height: number;
};

export default function TaskDetailsPane(props: Props) {
  const { task, otherTasks, arrows, handleClose, handleTaskUpdate } = props;
  const target_ref = useRef(null);
  const [pane_state, setPaneState] = useState<PaneState>({
    posX: 0,
    posY: 0,
    width: 320,
    height: 630
  });
  const [showDependencyGraph, setShowDependencyGraph] = useState(false);
  const personas = [
    {value: '1', label: 'Alice'},
    {value: '2', label: 'Bob'}
  ];
  const taskOptions = otherTasks.map((t) => ({
    value: t.id.toString(),
    label: t.title
  }));

  // Task update functions
  const setTitle = (title: string) => {
    handleTaskUpdate({
      ...task,
      title
    });
  };
  const setDescription = (description: string) => {
    handleTaskUpdate({
      ...task,
      description
    });
  };

  // const handleResize = (event: React.MouseEvent) => {
  //   // Calculate the new width and height based on mouse position
  //   const newWidth = event.clientX - (event.currentTarget.getBoundingClientRect().left + window.scrollX);
  //   const newHeight = event.clientY - (event.currentTarget.getBoundingClientRect().top + window.scrollY);

  //   // Set minimum and maximum dimensions if needed
  //   const minWidth = 200; // Minimum width in pixels
  //   const maxWidth = 600; // Maximum width in pixels
  //   const minHeight = 200; // Minimum height in pixels
  //   const maxHeight = 600; // Maximum height in pixels

  //   // Update the width and height within the specified limits
  //   if (newWidth >= minWidth && newWidth <= maxWidth) {
  //     setPaneState
  //   }
  //   if (newHeight >= minHeight && newHeight <= maxHeight) {
  //     setPaneHeight(newHeight);
  //   }
  // };
  // const handleResizeStop = (event: any, { size }: any) => {
  //   // Update the width and height when resizing stops
  //   setPaneWidth(size.width);
  //   setPaneHeight(size.height);
  // };

  // Function to toggle the popup visibility
  const handleDependencyGraph = () => {
    setShowDependencyGraph(!showDependencyGraph);
  };

  const handleDropdownChange = (selectedValue: string) => {

  }

  const handleAddAssignee = () => {
    // Implement logic to add assignees to the state
  };

  return (
    <span className="pointer-events-auto">
      <div
        className="resizable-pane open"
        style={{
          position: 'relative',
          left: `${pane_state.posX}px`,
          top: `${pane_state.posY}px`,
          width: `${pane_state.width}px`,
          height: `${pane_state.height}px`
        }}
        ref={target_ref}
      >
        <div className="pane-header">
          <h2></h2>
          {/* <CloseIcon className="closeButton2" onClick={onClose}></CloseIcon> */}
          <button className="flex flex-row p-1 rounded-lg hover:bg-surface-100">
            <Dismiss24Filled onClick={handleClose} />
          </button>
        </div>

        <div className="assignee-section">
          <div className="title">Title: </div>
          <input
            type="text"
            placeholder="Untitled task"
            defaultValue={task.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGroup" style={{top: '15px'}}>
          <div style={{ display: 'flex', alignItems: 'center',top: '15px' }}>
            <div style={{ marginRight: "6px" }}>Add Assignee:</div>
            <div className="addButton">+</div>
          </div>
          <Select
            isMulti
            name="colors"
            options={personas}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div className="description-section">
          <span>Description:</span>
          <textarea
            placeholder="Task Description"
            defaultValue={task.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex flex-row w-full mb-4'>
          <div className='grid grid-cols-2 gap-2 border w-full'>
            <Dropdown 
              options={['Status','Option2','Option3']}
              onChange={handleDropdownChange}
            />
            <Dropdown 
              options={['Deadline','Option2','Option3']}
              onChange={handleDropdownChange}
            />
            <Dropdown 
              options={['Priority','Option2','Option3']}
              onChange={handleDropdownChange}
            />
            <Dropdown 
              options={['Time Needed','Option2','Option3']}
              onChange={handleDropdownChange}
            />
          </div>
        </div>
        <div className="inputGroup">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: "6px" }}>This task depends on:</div>
            <div className="addButton">+</div>
          </div>
          <Select
            isMulti
            name="colors"
            options={taskOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div className= "inputGroup">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: "6px" }}>Depends on this task:</div>
            <div className="addButton">+</div>
          </div>
          <Select
            isMulti
            name="colors"
            options={taskOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div>
          <button
            className="bottomButton"
            onClick={handleDependencyGraph}
          >
            View dependency graph
          </button>
        </div>
      </div>
      {/* <Moveable
        target={target_ref}
        draggable={true}
        resizable={true}
        throttleDrag={1}
        throttleResize={1}
      /> */}
      {showDependencyGraph && <DependencyView onClose={handleDependencyGraph} />}
    </span>
  );
};
