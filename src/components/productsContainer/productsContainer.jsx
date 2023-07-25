import { useSelector } from "react-redux";
import { Paginate } from "../paginate/paginate";
import  Card  from "../Card/Card"
import "./productsContainer.css"

const productsContainer = () => {
    const products = useSelector(state => state.products);

    const page = useSelector((state) => state.page);
    const perPage = 10;
    const max = Math.ceil(products.length / perPage);

    return (
        <>
            <div className="container-recommended-products">
            {products.slice((page - 1) * perPage, (page - 1) * perPage + perPage)?.map(props => <Card key={props.id} props={props} />)}
            </div>
            <Paginate max={max}/>
        </>
    );
};

export default productsContainer ;