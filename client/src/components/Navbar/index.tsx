import {
  ArrowRedo24Filled,
  ArrowUndo24Filled,
  Folder24Regular,
  Person24Filled
} from '@fluentui/react-icons';
import { Tooltip } from 'react-tooltip';

export default function Navbar() {
  return (
    <nav className="flex flex-row absolute top-4 left-4 right-4 z-20 gap-2">
      <div className="flex bg-surface-050/50 border-2 border-surface-100 rounded-xl backdrop-blur-xl items-center p-1">
        <button
          className="p-1 rounded-lg hover:bg-surface-100"
          data-tooltip-id="tooltip-navbar"
          data-tooltip-content="Boards"
        >
          <Folder24Regular />
        </button>
      </div>
      <div className="flex bg-surface-050/50 border-2 border-surface-100 rounded-xl backdrop-blur-xl items-center p-1">
        <input
          type="text"
          className="outline-none bg-transparent h-6 focus:border-b-2 border-surface-150 mx-2 sm:w-[30ch] md:w-[40ch]"
          placeholder="Untitled board"
        />
      </div>
      <div className="flex bg-surface-050/50 border-2 border-surface-100 rounded-xl backdrop-blur-xl items-center">
        <div className="p-1">
          <button
            className="flex flex-row p-1 rounded-lg hover:bg-surface-100"
            data-tooltip-id="tooltip-navbar"
            data-tooltip-content="Undo"
          >
            <ArrowUndo24Filled />
          </button>
        </div>
        <span className="h-full border-l-2 border-surface-100" />
        <div className="p-1">
          <button
            className="flex flex-row p-1 rounded-lg hover:bg-surface-100"
            data-tooltip-id="tooltip-navbar"
            data-tooltip-content="Redo"
          >
            <ArrowRedo24Filled />
          </button>
        </div>
      </div>
      <div className="flex bg-surface-050/50 border-2 border-surface-100 rounded-xl backdrop-blur-xl items-center ml-auto">
        <div className="p-1">
          <button className="flex flex-row p-1 rounded-lg hover:bg-surface-100">
            <span className="hidden md:flex px-2">
              Login
            </span>
            <Person24Filled />
          </button>
        </div>
      </div>
      <Tooltip
        id="tooltip-navbar"
        className="!rounded-xl"
        opacity={1}
        place="bottom"
      />
    </nav>
  );
};
