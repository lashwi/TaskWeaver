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
    <div className="bg-surface-050/50 border-2 border-surface-100 rounded-xl backdrop-blur-2xl p-2 flex flex-col fixed left-4 top-64 z-30">
      <div className="grid grid-cols-1 gap-4">
        <button
          className={selectedTool === Tool.Pointer ? 'bg-surface-150' : ''}
          onClick={() => setSelectedTool(Tool.Pointer)}
        >
          <Cursor24Regular />
        </button>
        <button
          className={selectedTool === Tool.Move ? 'bg-surface-150' : ''}
          onClick={() => setSelectedTool(Tool.Move)}
        >
          <ArrowMove24Regular />
        </button>
        <hr className="border-surface-200" />
        <button
          className={selectedTool === Tool.Task ? 'bg-surface-150' : ''}
          onClick={() => setSelectedTool(Tool.Task)}
        >
          <SlideAdd24Regular />
        </button>
        <button
          className={selectedTool === Tool.Arrow ? 'bg-surface-150' : ''}
          onClick={() => setSelectedTool(Tool.Arrow)}
        >
          <ArrowFlowUpRight24Regular />
        </button>
      </div>
    </div>
  );
}
