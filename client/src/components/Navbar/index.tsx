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
      <div className="relative">
        <div className="flex panel-surface-050 items-center p-1">
          <button
            className="p-1 rounded-lg hover:bg-surface-100"
            onClick={toggleBoardMenu}
          >
            <Folder24Regular />
          </button>
        </div>
        {isBoardMenuOpen && (
          <div className="flex flex-col absolute left-0 mt-2 whitespace-nowrap panel-surface-050">
            <div className="flex flex-col p-1">
              <button
                className="p-2 text-left text-sm rounded-lg hover:bg-surface-100 disabled:text-surface-300" 
                onClick={() => {
                  closeBoardMenu(); 
                  handleNewBoard();
                }}
              >
                New Board
              </button>
              <button
                className="p-2 text-left text-sm rounded-lg hover:bg-surface-100 disabled:text-surface-300"
                disabled
                onClick={closeBoardMenu}
              >
                Open Board
              </button>
              <button
                className="p-2 text-left text-sm rounded-lg hover:bg-surface-100 disabled:text-surface-300"
                disabled
                onClick={closeBoardMenu}
              >
                Save Board
              </button>
            </div>
            <span className="w-full border-t-2 border-surface-100" />
            <div className="flex flex-col p-1">
              <button
                className="p-2 text-left text-sm rounded-lg hover:bg-surface-100 disabled:text-surface-300"
                onClick={() => {
                  closeBoardMenu();
                  window.alert(
                    "TaskWeaver is a student project for CS 465 User Interface Design at UIUC.\n\n" +
                    "Developers:\n" +
                    "  - Zhuojun Cheng\n" +
                    "  - Minh Duong\n" +
                    "  - Lilly He\n" +
                    "  - Ashwin Lamani\n" +
                    "  - Stephanie Patterson\n\n" +
                    "Source code: https://github.com/lashwi/TaskWeaver"
                  )
                }}
              >
                Credits
              </button>
            </div>
          </div>
        )}
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
        place="bottom"
      />
    </nav>
  );
};
