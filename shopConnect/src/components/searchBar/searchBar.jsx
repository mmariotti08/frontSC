import { useState } from "react";
import style from "./searchBar.module.css";
import { useDispatch } from "react-redux";



export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div className={style.searchContainer}>
      <div className={style.inputContainer}>
        <input
          className={style.searchInput}
          onChange={handleChange}
          type="search"
          name="search"
          value={name}
          placeholder="Search..."
        />
      </div>
      <div className={style.buttonContainer}>
        <button className={style.searchButton}  >
          Search
        </button>
      </div>
    </div>
  );
}


