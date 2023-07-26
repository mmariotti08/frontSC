import { useState } from "react";
import ProductsContainer from "../../components/productsContainer/productsContainer";
import Carousel from "../../components/carousel/Carousel";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions";
import { Loader } from "../../components/Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

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

	const perPage = 8;

	return (
		<div id={styles.container_home}>
			{/* {isLoading
				? <Loader />
				: <>
					{toggle && <Carousel />}
					<Filter />
					<ProductsContainer />
				</>} */}

					{toggle && <Carousel />}
					{/* <Filter /> */}
					<div className={styles.container_prodcuts}>
						<h2 className={styles.title}>FEATURED PRODUCTS</h2>
						<ProductsContainer perPage={perPage} />
					</div>
					<Link to="/products" id={styles.see_more}><button>SEE MORE</button></Link>
					
		</div>
	);
};

export default Home;