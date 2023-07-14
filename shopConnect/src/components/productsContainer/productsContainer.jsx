import { useSelector } from "react-redux";
import { Paginate } from "../paginate/paginate";
import  Card  from "../Card/Card"
import "./productsContainer.css"
import { Loader } from "../Loader/Loader";
import { useState, useEffect} from "react";

const productsContainer = () => {
    const products = useSelector(state => state.products);

    const page = useSelector((state) => state.page);

    const perPage = 10;

    const max = Math.ceil(products.length / perPage);

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Simulación de tiempo de carga
        setTimeout(() => {
          setIsLoading(false); // Finaliza la carga
        }, 1000);
      }, []);


    return (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="container-recommended-products">
              {products.length === 0 ? (
                <p className="mensaje-error">Your sneakers were not found👟</p>
              ) : (
                products
                  .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                  .map((props) => <Card key={props.id} props={props} />)
              )}
            </div>
          )}
          <Paginate max={max} />
        </>
      );
}
export default productsContainer ;