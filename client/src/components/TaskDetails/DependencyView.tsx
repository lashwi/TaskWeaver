"use client";
import React from 'react';
import styles from './TaskPopup.module.css';
import CloseIcon from '@mui/icons-material/Close';

type DependencyGraphPopupProps = {
  onClose: () => void; // function to close the popup
  task: Task;
  arrows: Arrow[];
  otherTasks: Task[];
};

function DependencyView({ onClose, task, arrows, otherTasks }: DependencyGraphPopupProps) {
  // console.log('tasks', tasksDependingOn);
  let taskIdsDependingOn = arrows.map((arrow: Arrow) => {
    if(arrow.from === task.id) return arrow.to;
  });

  let taskIdsDependentOn = arrows.map((arrow: Arrow) => {
    if(arrow.to === task.id) return arrow.from;
  });

  const getTaskValuesFromIds = (taskIds: any) => {
    // console.log(taskIds);
    return otherTasks.filter(task => taskIds.includes(task.id)).map(t => ({
      value: t.id.toString(),
      label: t.title
    }))
  };

  let tasksDependingOn = getTaskValuesFromIds(taskIdsDependingOn);
  

  let tasksDependentOn = getTaskValuesFromIds(taskIdsDependentOn);
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
      <CloseIcon className={styles.closeButton2} onClick={onClose}></CloseIcon>
        <div style={{ width: '50%', margin: '0px auto' }}>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            {tasksDependentOn.map((number, idx) =>
              <div className="task-bubble" key={idx}>
                <label>{number.label}</label>
              </div>
            )}
          </div>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>{tasksDependentOn.length > 0 && <label className='block-bubble'>Blocks</label>}  </div>

          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <div className="task-bubble">
                <label>{task.title}</label>
              </div>
          </div>

          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>{tasksDependingOn.length > 0 && <label className='block-bubble'>Blocked By</label>}  </div>

          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            {tasksDependingOn.map((number, idx) =>
              <div className="task-bubble" key={idx}>
                <label>{number.label}</label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DependencyView;
