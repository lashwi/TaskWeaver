"use client";
import { Dismiss24Filled } from '@fluentui/react-icons';
import styles from './TaskPopup.module.css';

interface Props {
  task: Task;
  arrows: Arrow[];
  otherTasks: Task[];
  onClose: () => void;
};

export default function DependencyView(props: Props) {
  const { task, arrows, otherTasks, onClose } = props;
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
      <button className="flex flex-row self-end p-1 rounded-lg hover:bg-surface-100">
        <Dismiss24Filled onClick={onClose} />
      </button>
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
