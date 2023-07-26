import styles from "./products.module.css";
import Filter from "../../components/Filter/Filter";
import ProductsContainer from "../../components/productsContainer/productsContainer";
import { useEffect } from "react";
const Products = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <div id={styles.products}>
            <Filter />
            <ProductsContainer />
        </div>
    );
};

export { Products };