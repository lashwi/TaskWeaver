"use client";
import React from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import {ArrowFlowUpRight24Regular, CalendarAdd24Regular, ArrowMove24Regular, Cursor24Regular} from "@fluentui/react-icons"

import styles from './Toolbar.module.css'

export default function App(props) {
  const changeCursor = (cursorType) => {
    document.body.style.cursor = cursorType;
  };
  return (
    <div
      style={{
        position: 'fixed',
        left: 1,
        top: 100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className={styles.rectangle}>
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
    </div>
  );
}
