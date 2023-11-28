"use client";
import {
  ArrowFlowUpRight24Filled,
  ArrowFlowUpRight24Regular,
  ArrowMove24Filled,
  ArrowMove24Regular,
  Cursor24Filled,
  Cursor24Regular,
  SlideAdd24Filled,
  SlideAdd24Regular
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
    <div className="flex flex-col panel-surface-050 pointer-events-auto">
      <div className="grid grid-cols-1 gap-1 p-1">
        <button
          className={`p-1 rounded-lg hover:bg-surface-100 ${isPointer ? 'bg-surface-100' : ''}`}
          onClick={() => setSelectedTool(Tool.Pointer)}
          data-tooltip-id="tooltip-toolbar"
          data-tooltip-content="Select"
        >
          {isPointer ? <Cursor24Filled /> : <Cursor24Regular />}
        </button>
        <button
          className={`p-1 rounded-lg hover:bg-surface-100 ${isMove ? 'bg-surface-100' : ''}`}
          onClick={() => setSelectedTool(Tool.Move)}
          data-tooltip-id="tooltip-toolbar"
          data-tooltip-content="Move/Resize"
        >
          {isMove ? <ArrowMove24Filled /> : <ArrowMove24Regular />}
        </button>
      </div>
      <span className="border-t-2 border-surface-100" />
      <div className="grid grid-cols-1 gap-1 p-1">
        <button
          className={`p-1 rounded-lg hover:bg-surface-100 ${isTask ? 'bg-surface-100' : ''}`}
          onClick={() => setSelectedTool(Tool.Task)}
          data-tooltip-id="tooltip-toolbar"
          data-tooltip-content="Add Task"
        >
          {isTask ? <SlideAdd24Filled /> : <SlideAdd24Regular />}
        </button>
        <button
          className={`p-1 rounded-lg hover:bg-surface-100 ${isArrow ? 'bg-surface-100' : ''}`}
          onClick={() => setSelectedTool(Tool.Arrow)}
          data-tooltip-id="tooltip-toolbar"
          data-tooltip-content="Add Arrow"
        >
          {isArrow ? <ArrowFlowUpRight24Filled /> : <ArrowFlowUpRight24Regular />}
        </button>
      </div>
      <Tooltip
        id="tooltip-toolbar"
        className="!rounded-xl"
        opacity={1}
        place="right"
      />
    </div>
  );
}
