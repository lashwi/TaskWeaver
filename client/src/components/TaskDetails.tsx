// src/app/task-popup.tsx

import React from 'react';
import styles from '../styles/TaskPopup.module.css';

type TaskPopupProps = {
  onClose: () => void; // function to close the popup
};

export default function TaskDetails({ onClose }: TaskPopupProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.closeButton} onClick={onClose}>
          ✖️
        </div>
        <div className={styles.panelContent}>
          <div className={styles.leftPanel}>
            <div className={styles.inputGroup}>
              <input className={styles.inputField} placeholder="Untitled task" />
            </div>
            <div className={styles.addButton}>Add Assignees +</div>
            <div className={styles.inputGroup}>
              <textarea className={styles.inputField2} placeholder="Description"></textarea>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.dropdowns}>
              <select className={styles.dropdown}><option>Status</option></select>
              <select className={styles.dropdown}><option>Deadline</option></select>
            </div>
            <div className={styles.dropdowns}>
              <select className={styles.dropdown}><option>Priority</option></select>
              <select className={styles.dropdown}><option>Time Needed</option></select>
            </div>
            <div className={styles.inputGroup}> {/* Dropdowns go here */} </div>
            <div className={styles.addButton}>Add Task Dependency +</div>
            <input className={styles.inputField} placeholder="Dependency" />
            <div className={styles.addButton}>Add Dependent Task +</div>
            <input className={styles.inputField} placeholder="Dependency" />
            <div className={styles.bottomButton}>
              View dependency graph
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
