import { useRef, useState, useEffect } from 'react';
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
  users: User[];
  handleClose: () => void;
  handleTaskUpdate: (task: Task) => void;
  addArrow: (firstTaskId: number, secondTaskId: number) => void;
  removeArrow: (firstTaskId: number, secondTaskId: number) => void;
};

interface PaneState {
  posX: number;
  posY: number;
  width: number;
  height: number;
};

export default function TaskDetailsPane(props: Props) {
  const { task, otherTasks, arrows, handleClose, handleTaskUpdate, addArrow, removeArrow } = props;
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

  let taskIdsDependingOn: any[] = [];
  arrows.map((arrow: Arrow) => {
    if(arrow.from === task.id) taskIdsDependingOn = [...taskIdsDependingOn, arrow.to];
  });

  let taskIdsDependentOn: any[] = [];
   arrows.map((arrow: Arrow) => {
    if(arrow.to === task.id) taskIdsDependentOn = [...taskIdsDependentOn, arrow.from];
  });

  const getTaskValuesFromIds = (taskIds: any) => {
    return otherTasks.filter(task => taskIds.includes(task.id)).map(t => ({
      value: t.id.toString(),
      label: t.title
    }))
  };

  let tasksDependingOn = getTaskValuesFromIds(taskIdsDependingOn);
  let tasksDependentOn = getTaskValuesFromIds(taskIdsDependentOn);

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

  const handleSelectChangeForDependentTasks = (newValues: any) => {
    const newTaskIdsDependentOn = newValues.map((val: { value: string; }) => parseInt(val.value));
    if (taskIdsDependentOn.length > newTaskIdsDependentOn.length) {
      let removedTaskId = taskIdsDependentOn.filter(id => !newTaskIdsDependentOn.includes(id));
      if(removedTaskId[0] != undefined) {
        removeArrow(removedTaskId[0], task.id);
        taskIdsDependentOn = newTaskIdsDependentOn;
      }
    } else {
      let addedTaskId = newTaskIdsDependentOn.filter((id: number | undefined) => !taskIdsDependentOn.includes(id));
      if(addedTaskId[0] != undefined) {
        addArrow(addedTaskId[0], task.id);
        taskIdsDependentOn = newTaskIdsDependentOn;
      }
    }
  }

  const handleSelectChangeForDependingTasks = (newValues: any) => {
    const newTaskIdsDependingOn = newValues.map((val: { value: string; }) => parseInt(val.value));
    if (taskIdsDependingOn.length > newTaskIdsDependingOn.length) {
      let removedTaskId = taskIdsDependingOn.filter(id => !newTaskIdsDependingOn.includes(id));
      if(removedTaskId[0] != undefined) {
        removeArrow(task.id, removedTaskId[0]);
        taskIdsDependingOn = newTaskIdsDependingOn;
      }
    } else {
      let addedTaskId = newTaskIdsDependingOn.filter((id: number | undefined) => !taskIdsDependingOn.includes(id));
      if(addedTaskId[0] != undefined) {
        addArrow(task.id, addedTaskId[0]);
        taskIdsDependingOn = newTaskIdsDependingOn;
      }
    }
  }

  return (
    <span key={task.id} className="pointer-events-auto">
      <div
        className="panel-surface-050 p-1"
        style={{
          position: "relative",
          left: `${pane_state.posX}px`,
          top: `${pane_state.posY}px`,
          width: `${pane_state.width}px`,
          height: `${pane_state.height}px`
        }}
        ref={target_ref}
      >
        <div className="flex items-center justify-end">
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
            placeholder="Enter task description"
            defaultValue={task.description ?? ''}
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
            defaultValue={tasksDependentOn}
            onChange={handleSelectChangeForDependentTasks}
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
            defaultValue={tasksDependingOn}
            onChange={handleSelectChangeForDependingTasks}
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
      {showDependencyGraph && <DependencyView task={task} arrows={arrows} otherTasks={otherTasks} onClose={handleDependencyGraph} />}
    </span>
  );
};
