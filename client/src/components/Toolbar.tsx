"use client";
import {
  ArrowFlowUpRight24Regular,
  ArrowMove24Regular,
  Cursor24Regular,
  SlideAdd24Regular
} from '@fluentui/react-icons';
import { Tool } from '@/components/Board';

interface Props {
  selectedTool: Tool;
  setSelectedTool: (arg: Tool) => void;
};

export default function Toolbar({ selectedTool, setSelectedTool }: Props) {
  return (
    <div className="bg-surface-050/50 border-2 border-surface-100 rounded-xl backdrop-blur-2xl flex flex-col fixed left-4 top-64 z-30">
      <div className="grid grid-cols-1 gap-1 p-1">
        <button
          className={`p-1 rounded-lg hover:bg-surface-100 ${selectedTool === Tool.Pointer ? 'bg-surface-100' : ''}`}
          onClick={() => setSelectedTool(Tool.Pointer)}
        >
          <Cursor24Regular />
        </button>
        <button
          className={`p-1 rounded-lg hover:bg-surface-100 ${selectedTool === Tool.Move ? 'bg-surface-100' : ''}`}
          onClick={() => setSelectedTool(Tool.Move)}
        >
          <ArrowMove24Regular />
        </button>
      </div>
      <span className="border-t-2 border-surface-100" />
      <div className="grid grid-cols-1 gap-1 p-1">
        <button
          className={`p-1 rounded-lg hover:bg-surface-100 ${selectedTool === Tool.Task ? 'bg-surface-100' : ''}`}
          onClick={() => setSelectedTool(Tool.Task)}
        >
          <SlideAdd24Regular />
        </button>
        <button
          className={`p-1 rounded-lg hover:bg-surface-100 ${selectedTool === Tool.Arrow ? 'bg-surface-100' : ''}`}
          onClick={() => setSelectedTool(Tool.Arrow)}
        >
          <ArrowFlowUpRight24Regular />
        </button>
      </div>
    </div>
  );
}
