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
            <select className={style.selectBox} onChange={(event) => handleOrderByName(event)}>
                <option defaultChecked value="0" className={style.letras}>Order by Name</option>
                <option value="a-z"className={style.letras}>upward</option>
                <option value="z-a"className={style.letras}>falling</option>
            </select>

            {/* <label className={style.letras}>Order by Price</label> */}
            <select className={style.selectBox} onChange={(event) => handleOrderByPrice(event)}>
                <option defaultChecked value="0" className={style.letras}>Order by Price</option>
                <option value="asc"className={style.letras}>lowest price</option>
                <option value="des" className={style.letras}>highest price</option>
            </select>


        </div>

    );
}

export default Order;