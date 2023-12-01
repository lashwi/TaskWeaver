// src/app/task-popup.tsx
"use client";
import React, { useState } from 'react';
import styles from './TaskPopup.module.css';
import Dropdown from '@/components/Dropdown';
// import { Button } from '@mui/joy';
// import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';

import DependencyView from './DependencyView';

interface Props {
  task: Task;
  otherTasks: Task[];
  arrows: Arrow[];
  handleClose: () => void;
};

type OptionType = {
  value: string;
  label: string;
};

export default function TaskDetails(props: Props) {
  const { task, otherTasks, arrows, handleClose } = props;
  const handleDropdownChange = (selectedValue: string) => {
    console.log('User selected:', selectedValue);
    // Perform further actions based on the selected value
  };

  // State to control whether the dependency graph popup is visible
  const [showDependencyGraph, setShowDependencyGraph] = useState(false);

  // Function to toggle the popup visibility
  const handleDependencyGraph = () => {
    setShowDependencyGraph(!showDependencyGraph);
  };

  const taskOptions: OptionType[] = [];
  otherTasks.map((t) => {
    taskOptions.push({
      value: t.id.toString(),
      label: t.title
    })
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.panelContent}>
          <div className={styles.leftPanel}>
            <div className={styles.inputGroup}>
              <input
                className={styles.inputFieldTitle}
                placeholder="Enter task name"
                defaultValue={task.title}
              />
            </div>
            <div className={styles.inputGroup}>
              <div className="flex items-center">
                <div style={{ marginRight: "6px" }}>Assignees:</div>
                <div className={styles.addButton}>+</div>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <span>Description:</span>
              <textarea
                className={styles.inputField}
                placeholder="Enter task description"
                defaultValue={task.description}
              />
            </div>
          </div>

          <div className={styles.rightPanel}>
            <div className="flex flex-row w-full mb-4">
              <div className="grid grid-cols-2 gap-2">
                <Dropdown
                  options={['Status', 'Option 2', 'Option 3']}
                  onChange={handleDropdownChange}
                  curValue={""}
                />
                <Dropdown
                  options={['Deadline', 'Option 2', 'Option 3']}
                  onChange={handleDropdownChange}
                  curValue={""}
                />
                <Dropdown
                  options={['Priority', 'Option 2', 'Option 3']}
                  onChange={handleDropdownChange}
                  curValue={""}
                />
                <Dropdown
                  options={['Time Needed', 'Option 2', 'Option 3']}
                  onChange={handleDropdownChange}
                  curValue={""}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: "6px" }}>This task depends on:</div>
                <div className={styles.addButton}>+</div>
              </div>
              <Select
                isMulti
                name="colors"
                options={taskOptions}
                // value={selectedTasksFrom} // TODO
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className={styles.inputGroup}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: "6px" }}>Depends on this task:</div>
                <div className={styles.addButton}>+</div>
              </div>
              <Select
                isMulti
                name="colors"
                options={taskOptions}
                // value={selectedTasksTo} // TODO
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            {/* <div > */}
              {/* <Button onClick={handleDependencyGraph} className={styles.bottomButton}>View dependency graph</Button> */}
              {/* {showDependencyGraph && <DependencyView onClose={handleDependencyGraph} />} */}
            {/* </div> */}
          </div>

          
          {/* <CloseIcon className={styles.closeButton} onClick={handleClose}></CloseIcon> */}
        </div>
      </div>
    </div>
  );
}
