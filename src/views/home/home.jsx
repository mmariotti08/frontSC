import { useEffect, useState } from "react";
import ProductsContainer from "../../components/productsContainer/productsContainer";
import Carousel from "../../components/carousel/Carousel";
import Filter from "../../components/Filter/Filter";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions";
import { Loader } from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ toggle }) => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);	

	// useEffect(() => {
	// 	const loadData = async () => {
	// 		await new Promise((resolve) => setTimeout(resolve, 2000));
	// 		dispatch(getProducts());
	// 		window.scrollTo(0, 0);
	// 		setIsLoading(false);
	// 	};
	// 	loadData();
	// }, [dispatch]);

	return (
		<div>
			{/* {isLoading
				? <Loader />
				: <>
					{toggle && <Carousel />}
					<Filter />
					<ProductsContainer />
					<ToastContainer />
				</>} */}

					{toggle && <Carousel />}
					<Filter />
					<ProductsContainer />
					<ToastContainer />
		</div>
	);
};

export default Home;