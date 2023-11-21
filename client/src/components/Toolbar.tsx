"use client";
import { IconButton } from 'rsuite';
import {
  ArrowFlowUpRight24Regular,
  ArrowMove24Regular,
  CalendarAdd24Regular,
  Cursor24Regular
} from "@fluentui/react-icons";
import { Tooltip } from 'react-tooltip';

interface toolbarProps {
  addTask: () => void;
}

export default function Toolbar({ addTask = () => {}}: toolbarProps) {
  const changeCursor = (cursorType: string) => {
    document.body.style.cursor = cursorType;
  };
  return (
    <div
      className="bg-surface-050/50 border-2 border-surface-100 rounded-xl backdrop-blur-2xl p-2 flex flex-col fixed left-4 top-64 z-30"
    >
      <div className="grid grid-cols-1 gap-4">
        <a data-tooltip-id='select' data-tooltip-content='Select' data-tooltip-place='right'>
          <IconButton icon={<Cursor24Regular />} 
            appearance='primary' 
            color='cyan' 
            onClick={() => changeCursor('default')}
          />
        </a>
        <Tooltip id='select'/>
        <a data-tooltip-id='move' data-tooltip-content='Move' data-tooltip-place='right'>
          <IconButton icon={<ArrowMove24Regular />} 
            appearance='primary' 
            color='blue' 
            size='lg' 
            onClick={() => changeCursor('move')}/>
        </a>
        <Tooltip id='move'/>
        <hr className="border-surface-200" />
        <a data-tooltip-id='addtask' data-tooltip-content='Add Task' data-tooltip-place='right'>
          <IconButton icon={<CalendarAdd24Regular />} 
            appearance='primary'
            color='blue'
            size='lg'
            onClick={() => addTask()}
          />
        </a>
        <Tooltip id='addtask'/>
        <a data-tooltip-id='addarrow' data-tooltip-content='Add Arrow' data-tooltip-place='right'>
          <IconButton icon={<ArrowFlowUpRight24Regular />} 
            appearance='primary'
            color='blue'
            size='lg'
          />
        </a>
        <Tooltip id='addarrow'/>
      </div>
    </div>
  );
}
