import "./App.css";
import AddOrUpdateTask from "./components/AddOrUpdateTask";
import { useState } from "react";
import TasksList from "./components/TasksList";
const App = () => {
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [initialData, setInitialData] = useState(null);
  return (
    <div className="min-h-screen bg-gray-200 flex p-10 justify-center">
      <div className="max-w-3xl w-full mx-10 bg-blue-200 p-4 flex flex-col gap-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md self-end w-fit cursor-pointer"
          onClick={() => setVisible(true)}
        >
          Add Task
        </button>
        <TasksList
          reload={reload}
          setReload={setReload}
          setInitialData={setInitialData}
          setVisible={setVisible}
        />
      </div>
      {visible && (
        <div
          onClick={() => {
            setVisible(false);
            setInitialData(null);
          }}
          className="absolute inset-0  bg-black/50 flex items-center justify-center"
        >
          <AddOrUpdateTask
            visible={visible}
            setVisible={setVisible}
            setReload={setReload}
            initialData={initialData}
            setInitialData={setInitialData}
          />
        </div>
      )}
    </div>
  );
};
export default App;
