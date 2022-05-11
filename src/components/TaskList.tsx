import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [count, setCount] = useState(1)

  function handleCreateNewTask() {
    if (newTaskTitle !== '') {
      let task: Task = {
        id: count,
        title: newTaskTitle,
        isComplete: false
      }

      setCount(count + 1)
      setTasks([...tasks, task])
    } else {
      console.log('Erro')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    let tasksCopy = [...tasks]

    for (let i in tasksCopy) {
      if (tasksCopy[i].id === id) {
        tasksCopy[i].isComplete = !tasksCopy[i].isComplete
      }
    }

    setNewTaskTitle('')
    setTasks(tasksCopy)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let newTasks = tasks.filter((task) => task.id !== id)

    setTasks(newTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}