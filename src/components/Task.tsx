import { Trash } from 'phosphor-react'
import styles from './Task.module.css'
import { ChangeEvent, useState } from 'react';

export interface Task {
  id: number;
  task: string;
  checked: boolean;
}

interface TaskProps {
  task: Task;
  onCheckedComplete: (id: number, check: boolean) => void;
  onDeleteTask: (id: number) => void;
}

export function Task ({ task, onCheckedComplete, onDeleteTask }: TaskProps) {

  const [ check, setCheck ] = useState(task.checked)

  function handleCompleteTask(event: ChangeEvent<HTMLInputElement>){
    onCheckedComplete(task.id, event.target.checked)
  }

  function handleDeleteTask() {
    onDeleteTask(task.id)
  }

  return (
    <div className={styles.item}>
      <div className={styles.checkboxWrapper}>
        <input type="checkbox" id={`task${task.id}`} defaultChecked={task.checked} onChange={handleCompleteTask}/>
        <label htmlFor={`task${task.id}`}/>
      </div>
      <p>{task.checked? <s>{task.task}</s> : `${task.task}`}</p>
      <button
        onClick={handleDeleteTask}
        title='Deletar Task'
      >
        <Trash size={14} />
      </button>
    </div>
  )
}