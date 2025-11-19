import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import Pagination from "./Pagination";
const TasksList = ({ reload, setReload, setInitialData, setVisible }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => {
          if (filter === "completed") return task.status === "completed";
          if (filter === "pending") return task.status === "pending";
        });

  const displayedTasks = filteredTasks.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
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
      setDeletingId(id);
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
    } finally {
      setDeletingId(null);
    }
  };
  if (loading) return <Loader size={30} />;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <FaFilter className="text-orange-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-sm cursor-pointer"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
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
        {displayedTasks.length == 0 ? (
          <div className="text-center mt-4">No tasks found</div>
        ) : (
          displayedTasks.map((task) => (
            <div
              key={task._id}
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
                    task.status === "completed"
                      ? "bg-green-500"
                      : "bg-orange-500"
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
                  {deletingId === task._id ? (
                    <Loader size={15} />
                  ) : (
                    <MdDelete />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div>
          <label>Rows per page : </label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          totalCount={filteredTasks.length}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};
export default TasksList;
