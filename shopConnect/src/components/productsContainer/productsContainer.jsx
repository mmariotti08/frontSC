import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import  Card  from "../Card/Card"
import "./productsContainer.css"

const productsContainer = () => {
    const products = useSelector(state => state.products);

    
    console.log(products)
    console.log("products")

    return (
        <>
            
            <div className="container-recommended-products">
                {products?.map(props => <Card key={props.id} props={props} />)}
            </div>
        </>
    );
};

export default productsContainer ;