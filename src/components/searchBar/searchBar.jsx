import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductName, paginate } from "../../redux/actions";
import style from "./searchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const [name, setName] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			toast.error("The search cannot be empty.");
			return;
		}

		const searchResultsPromise = dispatch(getProductName(name));
		const searchResults = await searchResultsPromise;

		if (searchResults.length < 1) {
			toast.error(
				`No results found for the product name: ${name}.`
			);
			return;
		} else {
			navigate("/products");
		}
	};

	useEffect(() => {
		if (name === "") {
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