import { useDispatch } from "react-redux";
import { orderByName, orderByPrice } from "../../redux/actions";
import style from './Order.module.css'


const Order = () => {

    const dispatch = useDispatch();


    const handleOrderByName = (event) => {
        event.preventDefault();
        dispatch(orderByName(event.target.value));
      };

      const handleOrderByPrice = (event) => {
        event.preventDefault();
        dispatch(orderByPrice(event.target.value));
      };
    return(
        <div className={style.container}>
            {/* <label className={style.letras}>Order by Name</label> */}
            <select onChange={(event) => handleOrderByName(event)}className={style.letras}>
                <option defaultChecked value="0" className={style.letras}>Order by Name</option>
                <option value="a-z"className={style.letras}>Ascendente</option>
                <option value="z-a"className={style.letras}>Descendente</option>
            </select>

            {/* <label className={style.letras}>Order by Price</label> */}
            <select onChange={(event) => handleOrderByPrice(event)}className={style.letras}>
                <option defaultChecked value="0" className={style.letras}>Order by Price</option>
                <option value="des" value="asc"className={style.letras}>Precio mas bajo</option>
                <option value="des" className={style.letras}>Precio mas alto</option>
            </select>


        </div>

    );
}

export default Order;