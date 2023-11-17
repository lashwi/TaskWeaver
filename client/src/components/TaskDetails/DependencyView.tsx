"use client";
import React from 'react';
import styles from './TaskPopup.module.css';
import CloseIcon from '@mui/icons-material/Close';

type DependencyGraphPopupProps = {
  onClose: () => void; // function to close the popup
};

function DependencyView({ onClose }: DependencyGraphPopupProps) {
  let from_tasks = ['Gather wood'];
  let to_tasks = ['Assemble treehouse'];
  let task = ['Build walls'];
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
      <CloseIcon className={styles.closeButton2} onClick={onClose}></CloseIcon>
        <div style={{ width: '50%', margin: '0px auto' }}>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            {from_tasks.map((number, idx) =>
              <div className="task-bubble" key={idx}>
                <label>{number}</label>
              </div>
            )}
          </div>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}> <label className='block-bubble'>Blocks</label> </div>

          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <div className="task-bubble">
                <label>{task}</label>
              </div>
          </div>

          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}> <label className='block-bubble'>Blocked By</label> </div>

          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            {to_tasks.map((number, idx) =>
              <div className="task-bubble" key={idx}>
                <label>{number}</label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>


  );
}

export default DependencyView;
