import {  useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { v4 as uuid} from "uuid";
import { TrashIcon } from '@heroicons/react/16/solid';
import  {saveTask,getTasks, deleteTask,updateTask}from './api/CRUD';

function App() {
  const [todo,settodo] = useState('');
const [chores,setchores] = useState([]);

const [refetch,setrefetch] = useState(false);



useEffect(()=>{
  const fetchTasks = async() =>{
         const data = await getTasks();
         setchores(data);
   }

   fetchTasks();
},[])

useEffect(()=>{
  const fetchTasks = async() =>{
         const data = await getTasks();
         setchores(data);
   }

   fetchTasks();
},[refetch])



  const onInputChange = (e) => {
    settodo(e.target.value);
  }
 console.log(chores);
  const onClickToDo =  async () =>{
   if(todo.trim().length==0){return;}
    const newTask = {title: todo,isCompleted:false};
    console.log(newTask)
    await saveTask(newTask);

    setrefetch(prev => !prev);

   
      settodo(""); 
     
  

  }

  
   const onClickDelete = (key) =>{
          const filteredChores = chores.filter(chore => chore.id!==key);
          setchores(filteredChores);
          deleteTask(key)
   }

   const onClickComplete = async (task) => {
    const updatedTask = {...task,isCompleted:!(task.isCompleted)}

    try{
       const savedTask = await updateTask(task.id,updatedTask);
          const updatedChores = chores.map(chore => chore.id===task.id ?  savedTask  :chore);

        //  console.log(updatedChores);
        setchores(updatedChores);
    }
    catch(error){
      console.log(error);
    }
        
   } 
  
  
  return (
    <div className='flex flex-col bg-slate-800 flex-col items-center min-h-screen pt-20'> 
    <h1 className='text-5xl font-semibold text-center mb-4 text-white'> To-Do List</h1>
    {/* SHARED WIDTH CONTAINER */}
<div className="w-[400px]">

  {/* Input + Button */}
  <div className="flex gap-3 mb-6">
    <input
      value={todo}
      onChange={onInputChange}
      placeholder="Add ur chores..."
      className="flex-1 border bg-gray-200 text-black placeholder-gray-500 rounded-md px-3 py-2"
    />
    <button
      className="border rounded-md px-4 py-2 text-lg bg-amber-400 text-slate-900 hover:bg-amber-500"
      onClick={onClickToDo}
    >
      Add
    </button>
  </div>

  {/* Todo List */}
  <div className="text-lg font-mono">
    {chores.map(task => (
      <div
        key={task.id}
        className="flex items-center justify-between text-white text-lg px-3 py-2 border rounded-md mb-2"
      >
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => onClickComplete(task)}
          />
          <span className={task.isCompleted ? 'line-through' : ''}>
            {task.title}
          </span>
        </label>

        <button
          onClick={() => onClickDelete(task.id)}
          className="text-red-400 hover:text-red-500"
        >
          <TrashIcon className='h-5 w-5'/>
        </button>
      </div>
    ))}
  </div>

</div>

    
      </div>
  )
}

export default App
