import { filterBrandName, filterByCategory, filterByGender } from "../../redux/actions";
import style from "./Filter.module.css"
import { useDispatch } from "react-redux";

const Filter = () => {
    const dispatch = useDispatch();

    const handleFilterByCategory = (event) => {
        event.preventDefault();
        dispatch(filterByCategory(event.target.value));
      };

      const handleFilterByGender = (event) => {
        event.preventDefault();
        dispatch(filterByGender(event.target.value));
      };

      const handleFilterBrandName = (event) => {
        event.preventDefault();
        dispatch(filterBrandName(event.target.value));
      };

    return(
        <div className={style.container}>

            <select onChange={(event) => handleFilterByGender(event)}className={style.selectBox}>
                <option defaultChecked value="all" className={style.letras}>Filter by Gender</option>
                <option value="men"className={style.letras}>Men</option>
                <option value="women"className={style.letras}>Women</option>
                <option value="youth"className={style.letras}>Youth</option>
            </select>

            <select onChange={(event) => handleFilterByCategory(event)}className={style.selectBox}>
                <option defaultChecked value="all" className={style.letras}>Category</option>
                <option value="other"className={style.letras}>Other</option>
                <option value="running"className={style.letras}>Running</option>
                <option value="lifestyle"className={style.letras}>Lifestyle</option>
                <option value="basketball"className={style.letras}>Basketball</option>
                <option value="skateboarding"className={style.letras}>Skateboarding</option>
            </select>

            <select onChange={(event) => handleFilterBrandName(event)}className={style.selectBox}>
                <option defaultChecked value="all" className={style.letras}>Brand-Name</option>
                <option value="Nike"className={style.letras}>Nike</option>
                <option value="Vans"className={style.letras}>Vans</option>
                <option value="Gucci"className={style.letras}>Gucci</option>
                <option value="adidas"className={style.letras}>Adidas</option>
                <option value="Champion"className={style.letras}>Champion</option>
                <option value="Converse"className={style.letras}>Converse</option>
                <option value="Air Jordan"className={style.letras}>Air Jordan</option>
            </select>
           

        </div>
    )
}

export default Filter;