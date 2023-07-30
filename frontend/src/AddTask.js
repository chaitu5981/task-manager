import React, { useState } from "react";
import axios from "axios";
import { useTasksContext } from "./App";
const AddTask = () => {
  const { tasks, getTasks } = useTasksContext();
  const [name, setName] = useState("");
  const saveTask = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/create-task`,
        { name }
      );
      console.log(res.data);
      setName("");
    } catch (error) {}
  };
  return (
    <div className="add-task">
      <input
        type="text"
        placeholder="Enter your task"
        className="task-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button type="button" className="btn" onClick={saveTask}>
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
