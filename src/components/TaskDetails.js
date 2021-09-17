import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Button from './Button';

import './TaskDetails.css'

 const TaskDetails = () => {
     const params = useParams();
     const history = useHistory();
     const Tasks = localStorage.getItem('Tasks')
     const objTasks = JSON.parse(Tasks)
     const task = objTasks.find(task => task.id===params.taskID)
     
     const handleBackButtonClick = () =>{
         history.goBack();
     }
     return ( 
         <>
            <div className="back-button-container">
                <Button onClick={handleBackButtonClick}>Voltar</Button>
            </div>
            <div className="task-details-container">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
            </div>
         </>
      );
 }
  
 export default TaskDetails;