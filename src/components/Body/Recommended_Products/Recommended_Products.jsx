import { useSelector } from "react-redux";
import { Card } from "../Card/Card"
import "./Recommended_Products.css"

const Recommended_Products = () => {
    const products = useSelector(state => state.products);

    
    return (
        <>
            <h2>Recomendados para ti</h2>
            <div className="container-recommended-products">
                {products?.map(props => <Card key={props.id} props={props} />)}
            </div>
        </>
    );
};

export { Recommended_Products };