import { useSelector } from "react-redux";
import { Paginate } from "../paginate/paginate";
import  Card  from "../Card/Card";
import styles from "./productsContainer.module.css";
import { useLocation } from "react-router-dom";

const ProductsContainer = ({ perPage = 10 }) => {
    const products = useSelector(state => state.products);

    const page = useSelector((state) => state.page);

    const { pathname } = useLocation();
    
    // const perPage = 10;
    const max = Math.ceil(products.length / perPage);

    return (
        <>
            <div className={styles.container_card}>
                {products.slice((page - 1) * perPage, (page - 1) * perPage + perPage)?.map(props => <Card key={props.id} props={props} />)}
            </div>
            {pathname === "/products" && products.length > perPage && <Paginate max={max}/>}
        </>
    );
};

export default ProductsContainer ;