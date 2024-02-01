import React, { useEffect, useState } from "react";

import { addTask, convertDateFormat, updateTask } from "../../utils";
import styles from "./addTask.module.css";

const AddTask = ({
  openModal,
  setOpenModal,
  getAllTasks,
  editTask,
  setEditTask,
}) => {
  const [task, setTask] = useState({
    title: editTask && editTask.title ? editTask.title : "",
    description: editTask && editTask.description ? editTask.description : "",
    dueDate:
      editTask && editTask.dueDate ? convertDateFormat(editTask.dueDate) : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.title === "" || task.dueDate === "") {
      alert("Please fill all the required fields");
      return;
    }

    const func = editTask && editTask.title ? updateTask : addTask;

    if (editTask) {
      task.id = editTask.id;
      task.completed = editTask.completed;
    }

    const res = await func(task);
    if (res) {
      setTask({
        title: "",
        description: "",
        dueDate: "",
      });
      setEditTask({});
      setOpenModal(false);
      await getAllTasks();
    }
  };

  const handleClose = () => {
    setTask({
      title: "",
      description: "",
      dueDate: "",
    });
    setEditTask({});
    setOpenModal(false);
  };

  useEffect(() => {
    if (editTask) {
      setTask({
        title: editTask.title || "",
        description: editTask.description || "",
        dueDate: convertDateFormat(editTask.dueDate) || "",
      });
    }
  }, [editTask]);

  return (
    <div className={`${styles.container} ${!openModal && styles.hidden}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.addTask}>Add Task</h3>
        <div className={styles.formGroup}>
          <label htmlFor={styles.title}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength={255}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            id="dueDate"
          />
        </div>
        <div className={styles.formBtnContainer}>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
          <button
            type="button"
            className={styles.close}
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
