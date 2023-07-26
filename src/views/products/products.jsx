import styles from "./products.module.css";
import Filter from "../../components/Filter/Filter";
import ProductsContainer from "../../components/productsContainer/productsContainer";

const Products = () => {
    return (
        <div id={styles.products}>
            <Filter />
            <ProductsContainer />
        </div>
    );
};

export { Products };