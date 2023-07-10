import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  getProductName } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = ({ onSearch, toggleCarousel }) => {
  const [name, setName] = useState("");

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
    }
  };



  const handleSubmit = () => {
    onSearch(name);
    if (name.length > 0){
      toggleCarousel(false)
    }else{
      //toggleCarousel(true)
    }
    //setName('')
  };

console.log(name);


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
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;