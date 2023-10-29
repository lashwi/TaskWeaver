"use client";
import { useEffect, useState } from 'react';

const GridCanvas = () => {
  const [tool, setTool] = useState('pen');

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    const startDrawing = (e) => {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    };

    

    const draw = (e) => {
      if (!drawing) return;

      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

      if (tool === 'pen') {
        ctx.stroke();
      } else if (tool === 'eraser') {
        ctx.clearRect(
          e.clientX - canvas.offsetLeft,
          e.clientY - canvas.offsetTop,
          10,
          10
        );
      }
    };

    const endDrawing = () => {
      drawing = false;
    };

    // Fill canvas with white color
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;

    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', endDrawing);
    };
  }, [tool]);
  const drawRectangle = (x, y, width, height) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();
  };

  const handleDrawRectangle = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Set rectangle properties (position and size)
    const x = 100;
    const y = 100;
    const width = 50;
    const height = 30;

    // Draw the rectangle
    drawRectangle(x, y, width, height);
  };

  const handleToolChange = (newTool) => {
    setTool(newTool);
  };

  return (
    <div>
      <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleToolChange('pen')}>Pen</button> &nbsp;
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleToolChange('eraser')}>Eraser</button> &nbsp;
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDrawRectangle}>Draw Rectangle</button>
      </div>
      <canvas
        id="canvas"
        width="800"
        height="600"
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
};

export default GridCanvas;
