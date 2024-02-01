import Select from "react-select";

import { search } from "../../assets/icons";
import styles from "./searchBar.module.css";

export default function SearchBar({
  setOptionSelected,
  setOpenModal,
  searchQuery,
  setSearchQuery,
}) {
  const options = [
    { value: "title", label: "Title" },
    { value: "dueDate", label: "Due Date" },
    { value: "completed", label: "Completed" },
    { value: "unCompleted", label: "Uncompleted" },
    { value: "timeCreated", label: "Time Created" },
  ];

  const handleChange = (selectedOption) => {
    if (selectedOption === null) {
      selectedOption = { value: "title", label: "Title" };
    }
    setOptionSelected({ selectedOption });
  };

  return (
    <div className={styles.topBar}>
      <button className={styles.addTaskBtn} onClick={() => setOpenModal(true)}>
        <span className={styles.addTaskIcon}> &#43;</span> Add Task
      </button>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBar}
        />
        <button className={styles.searchBtn}>
          <img src={search} alt="search" />
        </button>
      </div>
      <div className={styles.filter}>
        <Select
          defaultValue={null}
          onChange={handleChange}
          placeholder="Filter"
          className={styles.filterSelect}
          options={options}
          isSearchable={false}
          isClearable={true}
        />
      </div>
    </div>
  );
}
