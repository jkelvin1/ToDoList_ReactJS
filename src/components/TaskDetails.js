import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {CgPen} from 'react-icons/cg';

import Button from './Button';
import Modal from './Modal';

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
     const [IsModalVisible, setIsModalVisible] = useState(false);

     return ( 
         <>
            <div className="back-button-container">
                <Button onClick={handleBackButtonClick}>Voltar</Button>
            </div>
            <div className="task-details-container">
                <div className="edit-button-container">
                    <button className="edit-task-description-button" onClick={() => setIsModalVisible(true)}>
                        <CgPen/>
                    </button>
                </div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
            </div>
            {IsModalVisible ? <Modal setIsModalVisible={setIsModalVisible} task={task}/> : null}
         </>
      );
 }
  
 export default TaskDetails;