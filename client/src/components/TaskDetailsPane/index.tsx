import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable'; 
import './ResizablePane.css';
import CloseIcon from '@mui/icons-material/Close';
import { HorizontalRule } from '@mui/icons-material';
import Dropdown from '../Dropdown';
import Select  from 'react-select';
import { Button } from '@mui/joy';
import DependencyView from '../TaskDetails/DependencyView';

interface ResizablePaneProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResizablePane: React.FC<ResizablePaneProps> = ({ isOpen, onClose }) => {
  const [width, setWidth] = useState<number>(300); // Initial width of the pane
  const [height, setHeight] = useState<number>(600); // Initial height of the pane
  const [title, setTitle] = useState<string>('');
  const [assignees, setAssignees] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');

  const handleResize = (event: React.MouseEvent) => {
    // Calculate the new width and height based on mouse position
    const newWidth = event.clientX - (event.currentTarget.getBoundingClientRect().left + window.scrollX);
    const newHeight = event.clientY - (event.currentTarget.getBoundingClientRect().top + window.scrollY);

    // Set minimum and maximum dimensions if needed
    const minWidth = 200; // Minimum width in pixels
    const maxWidth = 600; // Maximum width in pixels
    const minHeight = 200; // Minimum height in pixels
    const maxHeight = 600; // Maximum height in pixels

    // Update the width and height within the specified limits
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setWidth(newWidth);
    }
    if (newHeight >= minHeight && newHeight <= maxHeight) {
      setHeight(newHeight);
    }
  };
  const handleResizeStop = (event: any, { size }: any) => {
    // Update the width and height when resizing stops
    setWidth(size.width);
    setHeight(size.height);
  };
  
  const other_tasks = [
    {value: '1', label: 'Gather wood'},
    {value: '2', label: 'Build door'}
  ];

  // State to control whether the dependency graph popup is visible
  const [showDependencyGraph, setShowDependencyGraph] = useState(false);

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
    <Draggable handle=".pane-header" bounds="parent">
        <Resizable
            width={width}
            height={height}
            onResize={handleResize}
            draggableOpts={{ bounds: 'parent' }}
        >
        <div
            className={`resizable-pane ${isOpen ? 'open' : ''}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
        <div className="pane-header">
          <h2></h2>
          <CloseIcon className="closeButton2" onClick={onClose}></CloseIcon>
        </div>
        <div className="assignee-section">
          <div className="title">Title</div>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div style={{display:'flex', alignItems:'center'}}>
          <div className="title">Add Assignee</div>
          <button onClick={handleAddAssignee}> +</button>
          {/* Display assignees */}
        </div>
        <div className="description-section">
            Description:
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex flex-row w-full mb-4'>
            <div className='grid grid-cols-2 gap-2'>
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
                options={other_tasks}
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
                options={other_tasks}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>

        <div >
            <Button onClick={handleDependencyGraph} className="bottomButton">View dependency graph</Button>
            {showDependencyGraph && <DependencyView onClose={handleDependencyGraph} />}
        </div>
      </div>
      </Resizable>
    </Draggable>
    
  );
};

export default ResizablePane;