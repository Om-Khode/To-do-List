import axios from "axios";
import { sortTasks } from "./index";

const fetchAllTasks = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/tasks/");
    if (response.data) {
      const sortedData = sortTasks(response.data, "title");
      return sortedData;
    }
  } catch (err) {
    console.log(err);
  }
};

const addTask = async (task) => {
  try {
    const originalDate = new Date(task.dueDate);
    const formattedDate = originalDate.toISOString();

    task.dueDate = formattedDate;

    const response = await axios.post("http://localhost:8080/api/tasks/", task);
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const updateTask = async (task) => {
  try {
    const originalDate = new Date(task.dueDate);
    const formattedDate = originalDate.toISOString();

    task.dueDate = formattedDate;

    const response = await axios.put(
      "http://localhost:8080/api/tasks/" + task.id,
      task
    );
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(
      "http://localhost:8080/api/tasks/" + id
    );
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const toggleComplete = async (id) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/api/tasks/complete/" + id
    );
    if (response.data) {
      return response.data.success;
    }
  } catch (err) {
    console.log(err);
  }
};

export { fetchAllTasks, addTask, deleteTask, toggleComplete, updateTask };
