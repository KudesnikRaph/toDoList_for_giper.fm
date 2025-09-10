import { useState, useEffect } from 'react'
import './App.css'

const App = ({ addTask }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTask(value);
    setValue("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          className="input"
          value={value}
          placeholder="Задачи"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="addBtn">+</button>
      </form>
    </>
  );
};

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { text, isCompleted: false }]);
  };

  return (
    <div className="todo">
      <h1>Мои задачи</h1>
      <App addTask={addTask} />
      <ul className='ulList'>
        {tasks.map((task, i) => (
          <li key={i}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
