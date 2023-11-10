// src/app/task-popup.tsx

import React from 'react';
import styles from '../styles/TaskPopup.module.css';
import Dropdown from '@/components/Dropdown';

type TaskPopupProps = {
  onClose: () => void; // function to close the popup
};

export default function TaskDetails({ onClose }: TaskPopupProps) {
  const handleDropdownChange = (selectedValue: string) => {
    console.log('User selected:', selectedValue);
    // Perform further actions based on the selected value
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.closeButton} onClick={onClose} style={{ position: 'relative' }}>
          <span style={{ 
            position: 'absolute', 
            top: '0', 
            right: '5px', 
            fontSize: '24px', 
            lineHeight: '24px', 
            cursor: 'pointer' // Optional, for a pointer cursor on hover
          }}>×</span>
        </div>
        <div className={styles.panelContent}>
          <div className={styles.leftPanel}>
            <div className={styles.inputGroup}>
              <input className={styles.inputField} placeholder="Untitled task" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{marginRight:"6px"}}>Assignees:</div>
              <div className={styles.addButton}>+</div>
            </div>
            <div className={styles.inputGroup}>
              <textarea className={styles.inputField2} placeholder="Description"></textarea>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.dropdowns}>
              <Dropdown 
                options={['Status', 'Option 2', 'Option 3']}
                onChange={handleDropdownChange}
              />
              <Dropdown 
                options={['Deadline', 'Option 2', 'Option 3']}
                onChange={handleDropdownChange}
              />
            </div>
            <div className={styles.dropdowns}>
              <Dropdown 
                options={['Priority', 'Option 2', 'Option 3']}
                onChange={handleDropdownChange}
              />
              <Dropdown 
                options={['Time Needed', 'Option 2', 'Option 3']}
                onChange={handleDropdownChange}
              />
            </div>
            <div className={styles.inputGroup}> {/* Dropdowns go here */} </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{marginRight:"6px"}}>This task depends on:</div>
              <div className={styles.addButton}>+</div>
            </div>
            
            <input className={styles.inputField3} placeholder="Dependency" />
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{marginRight:"6px"}}>Depends on this task:</div>
              <div className={styles.addButton}>+</div>
            </div>

            <input className={styles.inputField3} placeholder="Dependency" />
            <div className={styles.bottomButton}>
              View dependency graph
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
