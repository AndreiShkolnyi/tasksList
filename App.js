import axios from 'axios';
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react';
import MyLoader from './components/Loader/Loader';
import Loader from './components/Loader/Loader';
import { Task } from './components/Task';
import { TaskAddForm } from './components/ui/AddForm';
import './index.scss';


function App() {

  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [checkedTasksList, setChecked] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategory] = useState(0);
   

  useEffect(() => {
    setLoading(true)
    getTasksList(tasks)
    setLoading(false)
  }, []);

  useEffect(() => {
    axios.get('https://631eaf0022cefb1edc3806a7.mockapi.io/tasks-categories')
    .then((response) => setCategories(response.data))
    .catch((error) => console.log(error))
  }, [])

  const getTasksList = () => {
    axios.get('https://631eaf0022cefb1edc3806a7.mockapi.io/tasks')
    .then((response) => setTasks(response.data))
    .catch((error) => error.message)
  }

  const checkedTask = (id) => {
    setChecked((prevState) => ([...prevState, id]))
  }

  const deleteCheckedTasks = async () => {
   await checkedTasksList.map((id) => (
      axios.delete(`https://631eaf0022cefb1edc3806a7.mockapi.io/tasks/${id}`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error.message))
    ))
    const filteredArray = tasks.filter((task) => ( !checkedTasksList.includes(task.id)))
    setTasks(filteredArray)
  }

    

  const deleteTask = async (id) => {
        axios.put(`https://631eaf0022cefb1edc3806a7.mockapi.io/tasks/${id}`, {isCompleted: "true"})
        .then((response) => getTasksList());
      
        
}
  const addTask = async (data) => {
   const newTask = {...data, id: nanoid(), date: Date.now().toString()}
  
   await axios.post(`https://631eaf0022cefb1edc3806a7.mockapi.io/tasks`, newTask)
    .then((response) => (
      setTasks((prevState) => [...prevState, data])))
    .catch(((error) => console.log(error)))
      getTasksList()
  }
  const currentTasks = () => {
    switch (categoryId) {

      case 1:
         return tasks.filter((task) => task.isCompleted === 'true').map((task) => (<Task task={{task}} key={task.id} onCheck={checkedTask} onDelete={deleteTask}/>));
        
      case 2:
        return tasks.filter((task) => task.isCompleted !== 'true').map((task) => (<Task task={{task}} key={task.id} onCheck={checkedTask} onDelete={deleteTask}/>));
      
      default:  return tasks.map((task) => (
        <Task task={{task}} key={task.id} onCheck={checkedTask} onDelete={deleteTask} />
      ))
    }
  }
  
  return (
   
    <div className="App">
      <div className="top">
        <ul className="tabs">
          {categories.map((category, i) => (
            <li className={categoryId === i? 'active' : ''} key={i} onClick={() => {setCategory(i)}}>{category.name}</li>
          ))}
        </ul>
        <svg  onClick={deleteCheckedTasks} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z" />
        </svg>
      </div>
      { isLoading ? 
      (<MyLoader/>)
      : (currentTasks())
      }
      { categoryId !== 1 ? <TaskAddForm addClick={addTask}/> : ''}
    </div>
    )

}

export default App;
