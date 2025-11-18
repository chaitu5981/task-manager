import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";
const AddOrUpdateTask = ({
  initialData = null,
  setVisible,
  setReload,
  setInitialData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("pending");
  const addTask = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
        { title, description }
      );
      if (data.success) {
        toast.success(data.message);
        setVisible(false);
        setReload(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const updateTask = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${initialData._id}`,
        { title, description, status }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setVisible(false);
        setReload(true);
        setInitialData(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    }
  }, [initialData]);
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg m-6"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-2xl font-bold text-center mb-4">
        {initialData ? "Update Task" : "Add Task"}
      </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={initialData ? updateTask : addTask}
      >
        <div className="flex flex-col gap-1">
          <label for="title">Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label for="description">Description</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {initialData && (
          <div className="flex flex-col gap-2">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              className="border border-gray-300 rounded-md p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          {loading ? <Loader /> : `${initialData ? "Update Task" : "Add Task"}`}
        </button>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            setInitialData(null);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default AddOrUpdateTask;
