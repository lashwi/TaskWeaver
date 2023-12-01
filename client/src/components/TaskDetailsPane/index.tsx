import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Moveable from 'react-moveable';
import Select from 'react-select';
import { Dismiss24Filled } from '@fluentui/react-icons';
import Dropdown from '@/components/Dropdown';
import DependencyView from '@/components/TaskDetails/DependencyView';

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
  const taskOptions = otherTasks.map((t) => ({
    value: t.id.toString(),
    label: t.title
  }));
  const userOptions = props.users.map((u) => ({
    value: u.id.toString(),
    label: u.name
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

  const handleDropdownChange_status = (status: string) => {
    handleTaskUpdate({
      ...task,
      status
    });
  };

  const handleDropdownChange_priority = (priority: string) => {
    handleTaskUpdate({
      ...task,
      priority
    });
  };

  const setTimeNeeded = (timeNeeded: string) => {
    handleTaskUpdate({
      ...task,
      timeNeeded
    });
  };

  const setDDL = ( e : ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    task.deadline = newValue;
    console.log(newValue);
    handleTaskUpdate({
      ...task,
      deadline: newValue
    });
  }

  const handleAddAssignee = (selectedOptions: any) => {
    // Implement logic to add assignees to the state
    console.log(selectedOptions);
    const newSelectedUsers: User[] = selectedOptions.map((option: any) => ({
      id: parseInt(option.value),
      name: option.label,
    }));

    handleTaskUpdate({
      ...task,
      assignees: newSelectedUsers
    });
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

  useEffect(() => {
    let taskDetailsPane = document.getElementById('task-details');
    taskDetailsPane?.querySelectorAll("textarea").forEach((textarea) => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      });
    });
  });

  return (
    <span id="task-details" key={task.id} className="pointer-events-auto">
      <div
        className="panel-surface-050 p-1 overflow-hidden flex flex-col max-h-full"
        style={{
          position: "relative",
          left: `${pane_state.posX}px`,
          top: `${pane_state.posY}px`,
          width: `${pane_state.width}px`,
          // height: `${pane_state.height}px`
        }}
        ref={target_ref}
      >
        <button className="flex flex-row self-end p-1 rounded-lg hover:bg-surface-100">
          <Dismiss24Filled onClick={handleClose} />
        </button>
        <div className="flex flex-col grow px-2 pb-2 gap-1 overflow-y-auto">
          <span className="flex flex-col">
            <textarea
              className="resize-none overflow-y-hidden outline-none bg-transparent focus:border-b-2 border-surface-150 w-full text-xl font-bold"
              defaultValue={task.title}
              placeholder="Untitled task"
              rows={1}
              onChange={(e) => setTitle(e.target.value)}
            />
          </span>
          <span className="flex flex-col">
            <span>
              Description
            </span>
            <textarea
              className="resize-none overflow-y-hidden outline-none border-2 border-surface-150 w-full rounded-md px-2 py-1"
              defaultValue={task.description ?? ''}
              placeholder="Enter task description"
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
            />
          </span>
          <span className="flex flex-col">
            <span>
              Assignees
            </span>
            <Select
              isMulti
              options={userOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleAddAssignee}
              defaultValue={task.assignees?.map((user) => ({ value: user.id.toString(), label: user.name }))}
            />
          </span>
          <div className="grid grid-cols-2 gap-2">
            <span className="flex flex-col">
              <span>
                Status
              </span>
              <Dropdown 
                options={['N/A','To Do','Doing','Done']}
                curValue={task.status || ""}
                onChange={(e) => handleDropdownChange_status(e)}
              />
            </span>
            <span className="flex flex-col">
              <span>
                Deadline
              </span>
              <input
                id="start"
                type="date"
                name="trip-start"
                className="border-2 border-surface-150 rounded-md p-1"
                value={task.deadline || "2023-12-30"}
                min="2023-01-01"
                max="2024-12-31"
                onChange={(e)=> setDDL(e)}
              />
            </span>
            <span className="flex flex-col">
              <span>
                Priority
              </span>
              <Dropdown 
                options={['N/A','Critical','High','Normal','Low']}
                curValue={task.priority || ""}
                onChange={(e) => handleDropdownChange_priority(e)}
              />
            </span>
            <span className="flex flex-col">
              <span>
                Time Needed
              </span>
              <input
                type="text"
                className="border-2 border-surface-150 rounded-md p-1"
                placeholder="Ex: 2 hours"
                defaultValue={task.timeNeeded ?? ""}
                onChange={(e) => setTimeNeeded(e.target.value)}
              />
            </span>
          </div>
          <span className="flex flex-col">
            <span>
              Previous tasks this task depends on:
            </span>
            <Select
              isMulti
              options={taskOptions}
              defaultValue={tasksDependentOn}
              onChange={handleSelectChangeForDependentTasks}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </span>
          <span className="flex flex-col">
            <span>
              Next tasks that depend on this task:
            </span>
            <Select
              isMulti
              options={taskOptions}
              defaultValue={tasksDependingOn}
              onChange={handleSelectChangeForDependingTasks}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </span>
          <button
            className="text-white bg-primary hover:bg-secondary rounded-lg p-2 text-lg mt-3"
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
