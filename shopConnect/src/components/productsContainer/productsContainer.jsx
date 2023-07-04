import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Card/Card"
import "./productsContainer.css"

const productsContainer = () => {
    const products = useSelector(state => state.products);

    
    console.log(products)
    console.log("products")

    return (
        <>
            <h2>Recomendados para ti</h2>
            <div className="container-recommended-products">
                {products?.map(props => <Card key={props.id} props={props} />)}
            </div>
        </>
    );
};

export { productsContainer };