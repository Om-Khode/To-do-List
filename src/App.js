import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { Navbar, TaskList, AddTask, SearchBar } from "./components";
import { fetchAllTasks } from "./utils";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState({});
  const [optionSelected, setOptionSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllTasks = async () => {
    const response = await fetchAllTasks();
    if (response) {
      setTasks(response);
    }
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  useEffect(() => {
    getAllTasks();
  }, [optionSelected]);

  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <SearchBar
        setOptionSelected={setOptionSelected}
        setOpenModal={setOpenModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AddTask
        openModal={openModal}
        setOpenModal={setOpenModal}
        getAllTasks={getAllTasks}
        editTask={editTask}
        setEditTask={setEditTask}
      />
      <TaskList
        tasks={tasks}
        optionSelected={optionSelected}
        getAllTasks={getAllTasks}
        setEditTask={setEditTask}
        setOpenModal={setOpenModal}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default App;
