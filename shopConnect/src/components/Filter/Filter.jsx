import { useState } from "react";
import { filterByAll, getProducts } from "../../redux/actions";
import style from "./Filter.module.css"
import { useDispatch } from "react-redux";

const Filter = () => {
    const dispatch = useDispatch();
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
       
    
      const handleSubmit = (event) => {
      event.preventDefault();
     dispatch(filterByAll(brand, category, gender ));
           
                 
    };

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getProducts());
        setBrand('')
        setCategory('')
        setGender('')
      };
    
    return(
        <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.label}>
        Brand Name
        <select className={style.select} value={brand} onChange={(event) => setBrand(event.target.value)}>
          <option value="">-</option>
          <option value="Nike"className={style.letras}>Nike</option>
          <option value="Vans"className={style.letras}>Vans</option>
          <option value="Gucci"className={style.letras}>Gucci</option>
          <option value="adidas"className={style.letras}>Adidas</option>
          <option value="Champion"className={style.letras}>Champion</option>
          <option value="Converse"className={style.letras}>Converse</option>
          <option value="Air Jordan"className={style.letras}>Air Jordan</option>
        </select>
      </label>
      <label className={style.label}>
        Category
        <select className={style.select} value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">-</option>
          <option value="other"className={style.letras}>Other</option>
          <option value="running"className={style.letras}>Running</option>
          <option value="lifestyle"className={style.letras}>Lifestyle</option>
          <option value="basketball"className={style.letras}>Basketball</option>
          <option value="skateboarding"className={style.letras}>Skateboarding</option> 
        </select>
      </label>
      <label className={style.label}>
        Gender
        <select className={style.select} value={gender} onChange={(event) => setGender(event.target.value)}>
          <option value="">-</option>
          <option value="men"className={style.letras}>Men</option>
          <option value="women"className={style.letras}>Women</option>
          <option value="youth"className={style.letras}>Youth</option> 
        </select>
      </label>
      <button className={style.button} type="submit">Apply Filters</button>
      <button className={style.button} onClick={(event) => handleClick(event)}>Reset Products
      </button>
        </form>
        </div>
    )
}
export default Filter;


