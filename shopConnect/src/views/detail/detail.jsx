import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";



const Detail = () => {
    const dispatch = useDispatch();
    const sneaker = useSelector((state)=>state.detail);
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch])

    
    return (
        <div>
            <img src={sneaker.main_picture_url} alt="background"/> 
            <h3>Name:{sneaker.name}</h3>
            <h3>Brand:{sneaker.brand_name}</h3>
            <h3>Category:{sneaker.category}</h3>
            <h3>Color:{sneaker.color}</h3>
            <h3>Price:{sneaker.retail_price_cents}</h3>
        </div>
    );
};

export default Detail