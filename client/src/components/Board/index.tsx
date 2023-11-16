"use client"
import { useEffect, useState } from 'react';
import Task from '@/components/Task';
import './styles.css';

interface BoardViewState {
  offsetX: number;
  offsetY: number;
  zoom: number;
};

const tasks = [
  {
    id: 1,
    title: 'Task 1 iwth a lot of text arnteionarsetioanio sntan rstnrasen traie tnrasn entr sntseans trenienart ineta rsniea tr',
    description: 'Example description!',
    width: 200,
    height: 100,
    posX: 0,
    posY: 100,
    color: "#ff0000"
  }
];

export default function Board() {
  const [board_view_state, setBoardViewState] = useState<BoardViewState>({
    offsetX: 0,
    offsetY: 0,
    zoom: 1.0,
  });
  return (
    <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden bg-white">
      <div
        style={{ zoom: board_view_state.zoom }}
        // className="board-bg-grid bg-white absolute left-1/2 top-1/2"
        className="board-bg-grid bg-white absolute h-full w-full"
      >
        <Task task={tasks[0]} />
      </div>
    </div>
  );
};
