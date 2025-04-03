import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    async function loadTasks() {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    }
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask) return;
    const task = { title: newTask, completed: false };
    await addDoc(collection(db, "tasks"), task);
    setNewTask("");
    setTasks([...tasks, task]); // Temporary UI update
  };

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default Tasks;
