"use client";
import {
  ArrowFlowUpRight24Filled,
  ArrowFlowUpRight24Regular,
  ArrowMove24Filled,
  ArrowMove24Regular,
  CalendarAdd24Regular,
  Cursor24Regular,
  Cursor24Filled,
  SlideAdd24Regular,
  SlideAdd24Filled
} from '@fluentui/react-icons';
import { Tool } from '@/components/Board';
import { Tooltip } from 'react-tooltip';

interface Props {
  selectedTool: Tool;
  setSelectedTool: (arg: Tool) => void;
};

export default function Toolbar({ selectedTool, setSelectedTool }: Props) {
  const isPointer = selectedTool === Tool.Pointer;
  const isMove = selectedTool === Tool.Move;
  const isTask = selectedTool === Tool.Task;
  const isArrow = selectedTool === Tool.Arrow;
  return (
    <div className="bg-surface-050/50 border-2 border-surface-100 rounded-xl backdrop-blur-xl flex flex-col fixed left-4 top-64 z-30">
      <div className="grid grid-cols-1 gap-1 p-1">
        <a data-tooltip-id='select' data-tooltip-content='Select' data-tooltip-place='right'>
          <button
            className={`p-1 rounded-lg hover:bg-surface-100 ${isPointer ? 'bg-surface-100' : ''}`}
            onClick={() => setSelectedTool(Tool.Pointer)}
          >
            {isPointer ? <Cursor24Filled /> : <Cursor24Regular />}
          </button>
        </a>
        <Tooltip id='select'/>
        <a data-tooltip-id='move' data-tooltip-content='Move' data-tooltip-place='right'>
          <button
            className={`p-1 rounded-lg hover:bg-surface-100 ${isMove ? 'bg-surface-100' : ''}`}
            onClick={() => setSelectedTool(Tool.Move)}
          >
            {isMove ? <ArrowMove24Filled /> : <ArrowMove24Regular />}
          </button>
        </a>
        <Tooltip id='move'/>
      </div>
      <span className="border-t-2 border-surface-100" />
      <div className="grid grid-cols-1 gap-1 p-1">
        <a data-tooltip-id='addtask' data-tooltip-content='Add Task' data-tooltip-place='right'>
          <button
            className={`p-1 rounded-lg hover:bg-surface-100 ${isTask ? 'bg-surface-100' : ''}`}
            onClick={() => setSelectedTool(Tool.Task)}
          >
            {isTask ? <SlideAdd24Filled /> : <SlideAdd24Regular />}
          </button>
        </a>
        <Tooltip id='addtask'/>
        <a data-tooltip-id='addarrow' data-tooltip-content='Add Arrow' data-tooltip-place='right'>
          <button
            className={`p-1 rounded-lg hover:bg-surface-100 ${isArrow ? 'bg-surface-100' : ''}`}
            onClick={() => setSelectedTool(Tool.Arrow)}
          >
            {isArrow ? <ArrowFlowUpRight24Filled /> : <ArrowFlowUpRight24Regular />}
          </button>
        </a>
        <Tooltip id='addarrow'/>
      </div>
    </div>
  );
}
