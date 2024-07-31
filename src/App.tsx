import { Header } from './components/Header'
import styles from './App.module.css'
import './global.css'
import { PlusCircle, Trash } from 'phosphor-react'
import { Empty } from './components/Empty'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Task } from './components/Task'

export function App() {

  const [ task, setTask ] = useState('')
  const [ taskCompletedCount, setTaskCompletedCount ] = useState(0)

  const [ tasks, setTasks ] = useState<Task[]>([])

  function handleNewTaskChange(event:ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setTask(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    const newTask:Task = {
      id: tasks.length + 1,
      task,
      checked: false,
    }
    setTasks([ ...tasks, newTask ])
    setTask('')
    console.log(tasks)
  }

  function completeTask(idTask: number, checked: boolean) {
    const taskCompleted = tasks.map(task => {
      if(task.id === idTask){
        task.checked = checked
        checked ? setTaskCompletedCount(taskCompletedCount + 1) : setTaskCompletedCount(taskCompletedCount - 1)
      }
      return task
    })
    taskCompleted.sort(function(x,y) {
      return ( !x.checked ===  !y.checked) ? 0 : !x.checked ? -1 : 1
    })
    setTasks(taskCompleted)
  }

  function deleteTask(idTaskDeleted: number) {
    tasks.map(task => {
      if(task.id === idTaskDeleted && task.checked){
        setTaskCompletedCount(taskCompletedCount - 1) 
      }
    })
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== idTaskDeleted
    })
    setTasks(tasksWithoutDeletedOne)
  }



  const taskCount = tasks.length

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.newItem}>
          <input 
            type="text" 
            placeholder='Adicione uma nova tarefa'
            value={task}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required

          />
          <button
            type='submit'
          >
            Criar
            <PlusCircle size={16} />
          </button>
        </form>

        <div className={styles.score}>
          <div>Tarefas criadas <span>{taskCount}</span></div>
          <div>
            Concluídas
            <span>
              {taskCount < 1? `0`: `${taskCompletedCount} de ${taskCount}`}
            </span>
          </div>
        </div>

        {tasks.length < 1 ? <Empty /> :
          tasks.map(task => {
            return(
              <Task 
                key={task.id} 
                task={task}
                onCheckedComplete={completeTask}
                onDeleteTask={deleteTask}
              />
            )
          })
        }


      </div>
    </div>
  )
}
