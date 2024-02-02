import axios from "axios";
import { sortTasks } from "./index";
import { toast } from "react-toastify";

const fetchAllTasks = async () => {
  console.log(process.env.REACT_APP_API_URL);
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL);
    if (response.data) {
      const sortedData = sortTasks(response.data, "title");
      return sortedData;
    }
  } catch (err) {
    console.log(err);
    toast.error("Some error occurred! Please try again.");
  }
};

const addTask = async (task) => {
  try {
    const originalDate = new Date(task.dueDate);
    const formattedDate = originalDate.toISOString();

    task.dueDate = formattedDate;

    const response = await axios.post(process.env.REACT_APP_API_URL, task);
    if (response.data) {
      toast.success("Task added successfully!");
      return response.data;
    }
  } catch (err) {
    console.log(err);
    toast.error("Some error occurred! Please try again.");
  }
};

const updateTask = async (task) => {
  try {
    const originalDate = new Date(task.dueDate);
    const formattedDate = originalDate.toISOString();

    task.dueDate = formattedDate;

    const response = await axios.put(
      process.env.REACT_APP_API_URL + task.id,
      task
    );
    if (response.data) {
      toast.success("Task updated successfully!");
      return response.data;
    }
  } catch (err) {
    console.log(err);
    toast.error("Some error occurred! Please try again.");
  }
};

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(process.env.REACT_APP_API_URL + id);
    if (response.data) {
      toast.success("Task deleted successfully!");
      return response.data;
    }
  } catch (err) {
    console.log(err);
    toast.error("Some error occurred! Please try again.");
  }
};

const toggleComplete = async (id) => {
  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "complete/" + id
    );
    if (response.data) {
      return response.data.success;
    }
  } catch (err) {
    console.log(err);
    toast.error("Some error occurred! Please try again.");
  }
};

export { fetchAllTasks, addTask, deleteTask, toggleComplete, updateTask };
