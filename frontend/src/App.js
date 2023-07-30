import AddTask from "./AddTask";
import DisplayTasks from "./DisplayTasks";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
const TasksContext = createContext();

function App() {
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/get-tasks`);
    setTasks(res.data.tasks);
  };
  const fetchTasks = useCallback(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider value={{ tasks }}>
      <div className="App">
        <div className="container">
          <h1>Task Manager</h1>
          <AddTask />
          <DisplayTasks />
        </div>
      </div>
    </TasksContext.Provider>
  );
}
export const useTasksContext = () => {
  return useContext(TasksContext);
};

export default App;
