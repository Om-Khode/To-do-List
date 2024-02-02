import moment from "moment";
import styles from "../components/taskList/taskList.module.css";

const colorDueDate = (dueDate, completed) => {
  if (completed) {
    return;
  }
  if (moment(dueDate).isBefore(moment().add(1, "days"))) {
    return styles.overdue;
  }
  if (moment(dueDate).isBefore(moment().add(3, "days"))) {
    return styles.dueSoon;
  }
  return styles.dueLater;
};

const capitalizeFirstLetter = (string) => {
  const formattedString = moment(string).fromNow();
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
};

function sortTasks(tasks, sortBy) {
  let filteredTasks = [...tasks];

  switch (sortBy) {
    case "title":
      filteredTasks.sort(
        (a, b) => a.title.localeCompare(b.title) || a.id - b.id
      );
      break;
    case "dueDate":
      filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      break;
    case "completed":
      filteredTasks = filteredTasks.filter((task) => task.completed);
      filteredTasks = filteredTasks.sort((a, b) => a.id - b.id);
      break;
    case "unCompleted":
      filteredTasks = filteredTasks.filter((task) => !task.completed);
      filteredTasks = filteredTasks.sort((a, b) => a.id - b.id);
      break;
    case "timeCreated":
      filteredTasks.sort((a, b) => new Date(a.id) - new Date(b.id));
      break;
    default:
      filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  return filteredTasks;
}

function convertDateFormat(inputDate) {
  const date = new Date(inputDate);

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const searchedTasks = (tasks, searchQuery) => {
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export {
  colorDueDate,
  capitalizeFirstLetter,
  sortTasks,
  convertDateFormat,
  searchedTasks,
};
