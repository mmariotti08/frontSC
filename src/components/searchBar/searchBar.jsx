import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductName, paginate } from "../../redux/actions";
import style from "./searchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
      dispatch(paginate(1));
    }
  };

  const handleSubmit = async () => {
    if (name.trim() === "") {
      // Si el nombre está vacío, muestra un error
      toast.error("The search cannot be empty.");
      return;
    }

    // Realizar la búsqueda
    const searchResultsPromise = dispatch(getProductName(name));
    const searchResults = await searchResultsPromise;

    console.log(searchResults);

    if (searchResults.length < 1) {
      // No se encontraron resultados válidos
      toast.error(
        `No results found for the product name: ${name}.`
      );
      return;
    }
   
  };

  useEffect(() => {
    if (name === "") {
      // Si el valor del input se borra, actualizar la búsqueda de todos los zapatos
      dispatch(getProductName(""));
      dispatch(paginate(1));
    }
  }, [name, dispatch]);

  return (
    <div className={style.searchContainer}>
      <input
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        value={name}
        placeholder="Search..."
      />
      <button onClick={handleSubmit}>
        <FaSearch />
      </button>
    </div>
  );
};


export default SearchBar;


// //const SearchBar = ({ onSearch, toggleCarousel }) => {

//     if (name.length > 0){
//       toggleCarousel(false)
//     }
//   };
