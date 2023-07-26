import ProductsContainer from "../../components/productsContainer/productsContainer";
import Carousel from "../../components/carousel/Carousel";
import "react-toastify/dist/ReactToastify.css";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import { Brands } from "./brands/brands";
 
const Home = ({ toggle }) => {
	const perPage = 8;

	return (
		<div id={styles.container_home}>
			{toggle && <Carousel />}
			<div className={styles.container_prodcuts}>
				<h2 className={styles.title}>FEATURED PRODUCTS</h2>
				<ProductsContainer perPage={perPage} />
				<div id={styles.see_more}>
					<Link to="/products"><button>SEE MORE</button></Link>
				</div>
			</div>
			<div id={styles.container_brand}>
				<h2 className={styles.title}>OUR BRANDS</h2>
				<Brands />
			</div>
		</div>
	);
};

export default Home;