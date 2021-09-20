import React from 'react';

import Button from './Button';

import './Modal.css'

const Modal = ({setIsModalVisible, task}) => {

    const Tasks = localStorage.getItem('Tasks')
    const objTasks = JSON.parse(Tasks)
    
    const handleTaskEdition = (taskID, taskTitle, TaskDescription) => {
        const tasksFiltered = objTasks.filter(task => task.id !== taskID)
        const newTasks = [ 
          ...tasksFiltered, 
          {
          id: taskID,
          title: taskTitle ? taskTitle : "Untitled",
          completed: task.completed,
          description: TaskDescription ? TaskDescription : 'Write a description for the task.',
          },
        ];
        //setTasks(newTasks);
        localStorage.setItem('Tasks', JSON.stringify(newTasks))
        setIsModalVisible(false)
      }
    return ( 
    <>
        <div className="inputs-modal-container">
            <h2>Título</h2><br/>
            <input type='text' id='inputTitle'></input><br/>
            <h2>Descrição</h2><br/>
            <input type='text' id='inputDescription'></input><br/>
        </div>
        <div className="buttons-modal-container">
            <Button onClick={() => handleTaskEdition(task.id,
                 document.getElementById('inputTitle').value?document.getElementById('inputTitle').value:task.title,
                 document.getElementById('inputDescription').value?document.getElementById('inputDescription').value:task.description)}>Salvar</Button>
            <Button onClick={() => setIsModalVisible(false)}>Fechar</Button>
        </div>        
    </>
    );
}
 
export default Modal;