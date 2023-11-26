"use client";
import { IconButton } from 'rsuite';
import {
  ArrowFlowUpRight24Regular,
  ArrowMove24Regular,
  CalendarAdd24Regular,
  Cursor24Regular
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
        <IconButton
          icon={<Cursor24Regular />} 
          appearance="primary"
          color="cyan"
          className={selectedTool === Tool.Pointer ? 'bg-surface-150' : ''}
          onClick={() => setSelectedTool(Tool.Pointer)}
        />
        <IconButton icon={<ArrowMove24Regular />}
          appearance="primary"
          color="blue"
          size="lg"
          className={selectedTool === Tool.Move ? 'bg-surface-150' : ''}
          onClick={() => setSelectedTool(Tool.Move)}/>
        <hr className="border-surface-200" />
        <IconButton icon={<CalendarAdd24Regular />}
          appearance="primary"
          color="blue"
          size="lg"
          className={selectedTool === Tool.Task ? 'bg-surface-150' : ''}
          onClick={() => setSelectedTool(Tool.Task)}
        />
        <IconButton icon={<ArrowFlowUpRight24Regular />}
          appearance="primary"
          color="blue"
          size="lg"
          className={selectedTool === Tool.Arrow ? 'bg-surface-150' : ''}
          onClick={() => setSelectedTool(Tool.Arrow)}
        />
      </div>
    </div>
  );
}
