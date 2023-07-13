import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  getProductName, paginate  } from "../../redux/actions";
import style from "./searchBar.module.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, toggleCarousel }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();


  const handleChange = (event) => {
    setName(event.target.value);
    // if (name.length > 0){
    //   toggleCarousel(false)
    // }else{
    //   toggleCarousel(true)
    // }

  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
      dispatch(paginate(1))
    }
  };



  const handleSubmit = () => {
    onSearch(name);
    dispatch(paginate(1))
    if (name.length > 0){
      toggleCarousel(false)
    }
  };



  return (
    <div className={style.searchContainer}>
      <div className={style.inputContainer}>
        <input
          className={style.searchInput}
          onChange={handleChange}
          onKeyDown={(event) => handleKeyPress(event)}
          type="search"
          name="search"
          value={name}
          placeholder="Search..."
        />
      </div>
      <div className={style.buttonContainer}>
        <button className={style.searchButton} onClick={handleSubmit}>
          <FaSearch/>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;