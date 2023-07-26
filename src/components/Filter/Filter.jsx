
import axios from 'axios'
import { useState } from "react";
import { filter_order, getProducts } from "../../redux/actions";
import style from "./Filter.module.css"
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [order, setOrder] = useState('')
  const [asc_desc, setAsc_desc] = useState('')
  const products = useSelector(state => state.products);

  const handleSetOrder = (event) => {
    if (event === 'a-z') {
      let order = 'name'
      let asc_desc = 'asc'
      setOrder('name')
      setAsc_desc('asc')
      dispatch(filter_order({ brand, category, gender, order, asc_desc }))
    } else if (event === 'z-a') {
      let order = 'name'
      let asc_desc = 'desc'
      setOrder('name')
      setAsc_desc('desc')
      dispatch(filter_order({ brand, category, gender, order, asc_desc }))
    } else if (event === 'asc') {
      let order = 'retail_price_cents'
      let asc_desc = 'asc'
      setOrder('retail_price_cents')
      setAsc_desc('asc')
      dispatch(filter_order({ brand, category, gender, order, asc_desc }))
    } else if (event === 'desc') {
      let order = 'retail_price_cents'
      let asc_desc = 'desc'
      setOrder('retail_price_cents')
      setAsc_desc('desc')
      dispatch(filter_order({ brand, category, gender, order, asc_desc }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.get(`fill?brand=${brand}&category=${category}&gender=${gender}&order=${order}&asc_desc=${asc_desc}`)
      dispatch(filter_order({ brand, category, gender, order, asc_desc }));
    } catch (error) {
      dispatch(filter_order('null'))
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getProducts());
    setBrand('')
    setCategory('')
    setGender('')
    setOrder('')
    setAsc_desc('')
  };

  return (
    <div className={style.container}>
      <div className={style.containerOrder}>
        <select className={style.select} onChange={(event) => handleSetOrder(event.target.value)}>
          <option defaultChecked value="" hidden className={style.letras}>Order by Name</option>
          <option value="a-z" className={style.letras}>A - Z</option>
          <option value="z-a" className={style.letras}>Z - A</option>
        </select>

        <select className={style.select} onChange={(event) => handleSetOrder(event.target.value)}>
          <option defaultChecked value="" hidden className={style.letras}>Order by Price</option>
          <option value="asc" className={style.letras}>lowest price</option>
          <option value="desc" className={style.letras}>highest price</option>
        </select>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          Brand Name
          <select className={style.select} value={brand} onChange={(event) => setBrand(event.target.value)}>
            <option value="" hidden>-</option>
            <option value="Nike" className={style.letras}>Nike</option>
            <option value="Vans" className={style.letras}>Vans</option>
            <option value="Gucci" className={style.letras}>Gucci</option>
            <option value="adidas" className={style.letras}>Adidas</option>
            <option value="Champion" className={style.letras}>Champion</option>
            <option value="Converse" className={style.letras}>Converse</option>
            <option value="Air Jordan" className={style.letras}>Air Jordan</option>
          </select>
        </label>
        <label className={style.label}>
          Category
          <select className={style.select} value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="" hidden>-</option>
            <option value="other" className={style.letras}>Other</option>
            <option value="running" className={style.letras}>Running</option>
            <option value="lifestyle" className={style.letras}>Lifestyle</option>
            <option value="basketball" className={style.letras}>Basketball</option>
            <option value="skateboarding" className={style.letras}>Skateboarding</option>
          </select>
        </label>
        <label className={style.label}>
          Gender
          <select className={style.select} value={gender} onChange={(event) => setGender(event.target.value)}>
            <option value="" hidden>-</option>
            <option value="men" className={style.letras}>Men</option>
            <option value="women" className={style.letras}>Women</option>
            <option value="youth" className={style.letras}>Youth</option>
          </select>
        </label>

        <button className={style.button} type="submit">Apply Filters</button>

        <button className={style.button} onClick={(event) => handleClick(event)}>Reset Products</button>
      </form>

      <div className={style.information}>
        {products.length === 0 ? <h2>Information not found</h2> : <div></div>}
      </div>
    </div>
  )
}
export default Filter;