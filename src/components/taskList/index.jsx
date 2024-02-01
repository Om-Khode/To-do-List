import React, { useEffect, useState } from "react";

import { check, edit, trash } from "../../assets/icons";
import {
  toggleComplete,
  deleteTask,
  capitalizeFirstLetter,
  colorDueDate,
  sortTasks,
  searchedTasks,
} from "../../utils";
import styles from "./taskList.module.css";

export default function TaskList({
  tasks,
  optionSelected,
  getAllTasks,
  setEditTask,
  setOpenModal,
  searchQuery,
}) {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const filterTasks = (tasks, optionSelected) => {
    if (!optionSelected) {
      return tasks;
    }
    const { selectedOption } = optionSelected;
    const filteredTasks = sortTasks(tasks, selectedOption.value);
    return filteredTasks;
  };

  useEffect(() => {
    const filteredTasks = filterTasks(tasks, optionSelected);
    setFilteredTasks(filteredTasks);

    if (searchQuery) {
      const searchTasks = searchedTasks(filteredTasks, searchQuery);
      setFilteredTasks(searchTasks);
    }
  }, [tasks, optionSelected, searchQuery]);

  return (
    <div className={styles.taskListContainer}>
      <div className={styles.flexContainer}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                getAllTasks={getAllTasks}
                setEditTask={setEditTask}
                setOpenModal={setOpenModal}
              />
            );
          })
        ) : (
          <div className={styles.noTask}>No Tasks Found!</div>
        )}
      </div>
    </div>
  );
}

function Task({ task, getAllTasks, setEditTask, setOpenModal }) {
  const { id, title, description, completed, dueDate } = task;

  const handleClick = async (id, name) => {
    switch (name) {
      case "complete":
        await toggleComplete(id);
        break;
      case "delete":
        await deleteTask(id);
        break;
      case "edit":
        setEditTask(task);
        setOpenModal(true);
        break;
      default:
        break;
    }
    await getAllTasks();
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.taskDetails}>
        <div className={`${styles.taskTitle} ${completed && styles.complete}`}>
          {title}
        </div>
        <div
          className={`${styles.taskDueDate} ${colorDueDate(
            dueDate,
            completed
          )}`}
        >
          {capitalizeFirstLetter(dueDate)}
        </div>
        <div className={styles.taskDescription}>{description}</div>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={`${styles.btn} ${styles.edit}`}
          onClick={() => handleClick(task, "edit")}
        >
          <img src={edit} alt="edit" />
        </button>
        <button
          className={`${styles.btn} ${styles.trash}`}
          onClick={() => handleClick(id, "delete")}
        >
          <img src={trash} alt="trashIcon" />
        </button>
        <button
          className={`${styles.btn} ${styles.check} ${
            completed && styles.checked
          }`}
          onClick={() => handleClick(id, "complete")}
        >
          <img src={check} alt="mark as done" />
        </button>
      </div>
    </div>
  );
}
