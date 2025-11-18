import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { MdEdit, MdDelete } from "react-icons/md";
const TasksList = ({ reload, setReload, setInitialData, setVisible }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks`
      );
      if (data.success) setTasks(data.tasks);
      else toast.error(data.message);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  useEffect(() => {
    if (reload) {
      fetchTasks();
      setReload(false);
    }
  }, [reload, setReload]);
  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        setReload(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  if (loading) return <Loader size={30} />;
  if (error) return <div>Error: {error}</div>;
  if (tasks.length === 0) return <div>No tasks found</div>;
  return (
    <div className="w-full">
      <div className="grid grid-cols-[25%_40%_20%_15%] border-b border-gray-500">
        <div className="border-r border-gray-500 text-center p-1 text-wrap break-words">
          Title
        </div>
        <div className="border-r border-gray-500 text-center p-1 break-words">
          Description
        </div>
        <div className="border-r border-gray-500 text-center p-1 break-words">
          Status
        </div>
        <div className="text-center p-1 break-words">Actions</div>
      </div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="grid grid-cols-[25%_40%_20%_15%] border-b border-gray-500"
        >
          <div className="border-r border-gray-500 text-center p-1 break-words">
            {task.title}
          </div>
          <div className="border-r border-gray-500 text-center p-1 break-words  ">
            {task.description}
          </div>
          <div className="border-r border-gray-500 text-center p-1 flex items-center justify-center">
            <div
              className={`${
                task.status === "completed" ? "bg-green-500" : "bg-orange-500"
              } px-2 py-1 rounded-md w-fit h-fit mx-auto break-words `}
            >
              <span className="text-white break-words grid grid-cols-1 text-sm">
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="text-center p-1 flex justify-center items-center gap-2 flex-col sm:flex-row">
            <button
              className="bg-blue-500 text-white p-1 rounded-md w-fit  h-fit cursor-pointer"
              onClick={() => {
                setInitialData(task);
                setVisible(true);
              }}
            >
              <MdEdit />
            </button>
            <button
              className="bg-red-500 text-white p-1 rounded-md w-fit h-fit cursor-pointer"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {loading ? <Loader size={10} /> : <MdDelete />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TasksList;
