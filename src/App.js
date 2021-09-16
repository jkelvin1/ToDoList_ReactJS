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
    }

    fetchTasks()
  }, [])

  const handleTaskClick = (taskID) => {
    const newTasks = tasks.map(task =>{
      if (task.id === taskID) return {...task, completed: !task.completed}

      return task;
    });
    setTasks(newTasks)
  }

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [ 
      ...tasks, 
      {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
      description: '',
      },
    ];
    setTasks(newTasks);
  }

  const handleTaskDeletion = (taskID) => {
    const newTasks = tasks.filter(task => task.id !== taskID)

    setTasks(newTasks)
    
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
              tasks = {tasks}
              handleTaskClick={handleTaskClick}
              handleTaskDeletion={handleTaskDeletion}
              />
          </>
        )}
      />
      <Route
        path="/:taskTitle"
        exact
        component={TaskDetails} 
      />
    </div>
    </Router>
    
  )
}


export default App;