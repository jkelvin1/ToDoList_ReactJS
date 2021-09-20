import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Header from './components/Header';
import TaskDetails from './components/TaskDetails';

import './App.css'

const App =()=>{
  const [tasks, setTasks]=useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get('https://projetonode.jkelvin1.repl.co/todos?_limit=10')
      setTasks(data)
      localStorage.setItem('Tasks', JSON.stringify(data))
    }

    fetchTasks()
  }, [])

  const handleTaskClick = (taskID) => {
    const newTasks = tasks.map(task =>{
      if (task.id === taskID) return {...task, completed: !task.completed}

      return task;
    });
    setTasks(newTasks)
    localStorage.setItem('Tasks', JSON.stringify(newTasks))
  }

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [ 
      ...tasks, 
      {
      id: uuidv4(),
      title: taskTitle ? taskTitle : "Untitled",
      completed: false,
      description: 'Write a description for the task.',
      },
    ];
    setTasks(newTasks);
    localStorage.setItem('Tasks', JSON.stringify(newTasks))
  }

  const handleTaskDeletion = (taskID) => {
    const newTasks = tasks.filter(task => task.id !== taskID)

    setTasks(newTasks)
    localStorage.setItem('Tasks', JSON.stringify(newTasks))
  }

  return(
    <Router>
      <div className="container">
      <Header/>
      <Route
        path="/"
        exact
        render={() => (
          <>  
            <AddTask handleTaskAddition = {handleTaskAddition}/>
            <Tasks 
              tasks = {JSON.parse(localStorage.getItem('Tasks'))}
              handleTaskClick={handleTaskClick}
              handleTaskDeletion={handleTaskDeletion}
              />
          </>
        )}
      />
      <Route
        path="/:taskID"
        exact
        component={TaskDetails} 
      />
    </div>
    </Router>
  )
}

export default App;