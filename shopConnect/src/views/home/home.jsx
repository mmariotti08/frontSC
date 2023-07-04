import ProductsContainer  from "../../components/ProductsContainer/ProductsContainer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/actions";
const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);
  
    return (
        <div>

            <ProductsContainer />
        </div>
    );
};

export default Home ;