"use client";
import { IconButton } from 'rsuite';
import {
  ArrowFlowUpRight24Regular,
  ArrowMove24Regular,
  CalendarAdd24Regular,
  Cursor24Regular
} from "@fluentui/react-icons"

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
        <IconButton icon={<Cursor24Regular />} 
          appearance='primary' 
          color='cyan' 
          onClick={() => changeCursor('default')}
        />
        <IconButton icon={<ArrowMove24Regular />} 
          appearance='primary' 
          color='blue' 
          size='lg' 
          onClick={() => changeCursor('move')}/>
        <hr className="border-surface-200" />
        <IconButton icon={<CalendarAdd24Regular />} 
          appearance='primary'
          color='blue'
          size='lg'
          onClick={() => addTask()}
        />
        <IconButton icon={<ArrowFlowUpRight24Regular />} 
          appearance='primary'
          color='blue'
          size='lg'
        />
      </div>
    </div>
  );
}
