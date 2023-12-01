"use client"
import { useState } from 'react';
import {
  ArrowRedo24Filled,
  ArrowUndo24Filled,
  Folder24Regular,
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

  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);

  const toggleBoardMenu = () => {
    setIsBoardMenuOpen(!isBoardMenuOpen);
  };

  const closeBoardMenu = () => {
    setIsBoardMenuOpen(false);
  };

  return (
    <nav className="flex flex-row gap-2 pointer-events-none [&>*]:pointer-events-auto">
      <div className="flex panel-surface-050 items-center p-1">
        <div className="relative">
          <button
            className="p-1 rounded-lg hover:bg-surface-100"
            // data-tooltip-id="tooltip-navbar"
            // data-tooltip-content="Boards"
            onClick={toggleBoardMenu}
          >
            <Folder24Regular />
          </button>
          {isBoardMenuOpen && (
            <div className="absolute left-0 mt-3 p-1 whitespace-nowrap panel-surface-050">
              <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <li>
                  <button className="w-full p-2 text-sm rounded-lg hover:bg-surface-100" onClick={closeBoardMenu}>
                    Save Board
                  </button>
                </li>
                <li>
                  <button className="w-full p-2 text-sm rounded-lg hover:bg-surface-100" onClick={closeBoardMenu}>
                    Open Board
                  </button>
                </li>
                <li>
                  <button className="w-full p-2 text-sm rounded-lg hover:bg-surface-100" 
                    onClick={() => {
                      closeBoardMenu(); 
                      handleNewBoard();
                    }}>
                    New Board
                  </button>
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
