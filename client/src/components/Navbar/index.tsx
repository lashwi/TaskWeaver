"use client"
import { useState } from 'react';
import {
  ArrowRedo24Filled,
  ArrowUndo24Filled,
  Folder24Regular,
  HandLeftFilled,
  Person24Filled
} from '@fluentui/react-icons';
import { Tooltip } from 'react-tooltip';

interface Props {
  title: string;
  handleTitleChange: (title: string) => void;
  handleNewBoard: () => void;
};

export default function Navbar(props: Props) {
  const { title, handleTitleChange, handleNewBoard } = props;

  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <nav className="flex flex-row gap-2 pointer-events-none [&>*]:pointer-events-auto">
      <div className="flex panel-surface-050 items-center p-1">
        <div className="relative">
          <button
            className="p-1 rounded-lg hover:bg-surface-100"
            data-tooltip-id="tooltip-navbar"
            data-tooltip-content="Boards"
            onClick={openDropdown}
          >
            <Folder24Regular />
          </button>

          {isOpen && (
            <div className="origin-top-left absolute left-0 p-1 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <li>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                    Save Board
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                    Open Board
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => {
                      closeDropdown(); 
                      handleNewBoard();
                    }}>
                    New Board
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex panel-surface-050 items-center p-1">
        <input
          type="text"
          className="outline-none bg-transparent h-6 focus:border-b-2 border-surface-150 mx-2 w-full min-w-[10ch] sm:w-[30ch] md:w-[40ch]"
          defaultValue={title}
          placeholder="Untitled board"
          spellCheck={false}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>
      <div className="flex panel-surface-050 items-center">
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
      <div className="flex panel-surface-050 items-center ml-auto">
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
        place="right"
      />
    </nav>
  );
};
