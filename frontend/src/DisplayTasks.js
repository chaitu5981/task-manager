import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { useTasksContext } from "./App";
const DisplayTasks = () => {
  const { tasks } = useTasksContext();
  const markTaskComplete = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER}/mark-task-complete`,
        { id }
      );
      console.log(res.data.task);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER}/delete-task`,
        { data: { id } }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dislay-tasks">
      <div className="summary">
        <p>Total Tasks : {tasks.length}</p>
      </div>
      {tasks.map((task) => {
        return (
          <div
            className={task.completed ? "task completed" : "task"}
            key={task._id}
          >
            {task.name}
            <div className="btns">
              <button onClick={() => markTaskComplete(task._id)}>
                <TiTick />
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  deleteTask(task._id);
                }}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayTasks;
