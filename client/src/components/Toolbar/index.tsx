"use client";
import React from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import {
  ArrowFlowUpRight24Regular,
  ArrowMove24Regular,
  CalendarAdd24Regular,
  Cursor24Regular
} from "@fluentui/react-icons"

import styles from './Toolbar.module.css';

interface toolbarProps {
  addTask: ()=>void
}

export default function Toolbar({ addTask = () => {}}: toolbarProps) {
  const changeCursor = (cursorType: string) => {
    document.body.style.cursor = cursorType;
  };
  return (
    <div
      className="flex flex-col fixed h-screen left-0 top-[100px] z-30"
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
          onClick={() => addTask()}
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
