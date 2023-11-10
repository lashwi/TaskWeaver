"use client";
// import React from 'react';

// export default function App(props) {
//   return (
//     <div style={{position:'fixed', left:0, top:100, display: 'flex', flexDirection: 'column'}}>
//       <button className='button'>Select</button>
//       <button className='button'>Move</button>
//       <button className='button'>Task</button>
//       <button className='button'>Arrow</button>
//     </div>
//   );
// }

import React from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import GearIcon from '@rsuite/icons/Gear';
import MousePointer from '@rsuite/icons/legacy/MousePointer'
import {ArrowFlowUpRight24Regular, CalendarAdd24Regular, ArrowMove24Regular, Cursor24Regular} from "@fluentui/react-icons"
import Arrows from '@rsuite/icons/legacy/Arrows'
import TaskPlus from '@rsuite/icons/legacy/ExpandO'

export default function App(props) {
  const changeCursor = (cursorType) => {
    document.body.style.cursor = cursorType;
  };
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <IconButton icon={<Cursor24Regular />} 
        appearance='primary' 
        color='cyan' 
        onClick={() => changeCursor('default')}
      />
      <IconButton icon={<ArrowMove24Regular />} 
        appearance='primary' 
        color='blue' 
        size='lg' 
        onClick={() => changeCursor('move')}/>
      <IconButton icon={<CalendarAdd24Regular />} 
        appearance='primary'
        color='blue'
        size='lg'
      />
      <IconButton icon={<ArrowFlowUpRight24Regular />} 
        appearance='primary'
        color='blue'
        size='lg'
      />
    </div>
  );
}
