import axios from "axios";





     export const saveTask = async (task) =>{
          try{
             const response = await axios.post("http://localhost:8080/tasks",task);

            console.log("task got created", response.data);
            return response.data;
          }
          catch(error){
            console.log("POST related error",error);
            alert('task is not created');
          }
   }


  export const getTasks = async() => {
    try{
      const tasks = await axios.get("http://localhost:8080/tasks/all");
      console.log(tasks);
      return tasks.data;
    }
    catch(error){
       console.log("GET related error",error);
    }
   }


   export const getTaskById = async(id) => {
    try{

      const task = await axios.get(`http://localhost:8080/tasks/${id}`)

    }
    catch(err){
      console.log('getById related error',err);
    }
   }

  
  export const deleteTask = async(id) => {
    try{
  
      const response = await axios.delete(`http://localhost:8080/tasks/${id}`);
      console.log('after updating',response);
      return response.data;
    }
    catch(err){
      console.log('DELETE related task',err);
    }
  }

  export const updateTask = async(id,updatedTask) => {
    try{
     const response = await axios.patch(`http://localhost:8080/tasks/${id}`,updatedTask);
     return response.data;
    }
    catch(error){
      console.log("update related error",error);
    }
  }

