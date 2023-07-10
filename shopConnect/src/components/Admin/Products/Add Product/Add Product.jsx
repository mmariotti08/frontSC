import { useState } from "react";
import styles from "./Add Product.module.css";
import { MdClear, MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../../redux/actions";

const Add_Product = () => {
    const dispatch = useDispatch();

    const gender = ["Man", "Woman", "Unisex"];

    const [data, setData] = useState({
        name: "",
        brand_name: "",
        category: [""],
        color: "",
        gender: "Man",
        main_picture_url: "",
        retail_price_cents: 0,
        slug: "",
        status: "",
    });

    console.log(data);

    const handleChange = ({ target: { name, value } }) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleDraft = (event) => {
        event.preventDefault();
        data.status = "draft"
        data.slug = `${data.name.replace(/\s/g, "-")}`
        dispatch(createProduct(data, stocks));
        setData({
            name: "",
            brand_name: "",
            category: [""],
            color: "",
            gender: "",
            main_picture_url: "",
            retail_price_cents: 0,
            slug: "",
            status: "",
        });
    };

    const handleActive = (event) => {
        event.preventDefault();
        data.status = "active"
        data.slug = `${data.name.replace(/\s/g, "-")}`
        dispatch(createProduct(data, stocks));
        setData({
            name: "",
            brand_name: "",
            category: [""],
            color: "",
            gender: "",
            main_picture_url: "",
            retail_price_cents: 0,
            slug: "",
            status: "",
        });
    };

    // MANEJO DE CATEGORIAS
    const handleAddCategory = () => {
        setData({
          ...data,
          category: [...data.category, ""]
        });
      };

    const handleRemoveCategory = (index) => {
        if (data.category.length === 1) {
            return; // Evitar eliminar el último input de categoría
        }
        setData({
            ...data,
            category: data.category.filter((_, i) => i !== index),
        });
    };

    const handleChangeCategory = ({ target: { value } }, index) => {
        setData({
            ...data,
            category: data.category.map((category, i) => (i === index ? value : category))
          });
    };


    // MANEJO DE STOCK
    const [stocks, setStocks] = useState([{
        size: "",
        quantity: 0
    }]);

    const handleAddStock = () => {
        setStocks([
            ...stocks,
            {
                size: "",
                quantity: 0
            }
        ]);
    };

    const handleRemoveStock = (index) => {
        if (stocks.length === 1) {
            return; // Evitar eliminar el último input de stock
        }
        setStocks(stocks.filter((_, i) => i !== index));
    };

    const handleChangeStockSize = ({ target: { value } }, index) => {
        setStocks(
            stocks.map((stock, i) => i === index ? { ...stock, size: value } : stock)
        );
    };

    const handleChangeStockQuantity = ({ target: { value } }, index) => {
        setStocks(
            stocks.map((stock, i) => i === index ? { ...stock, quantity: parseInt(value) } : stock)
        );
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>Add new product</h1>
            </div>
            <div className={styles.containerform}>
                <form>
                    <div>
                        <label htmlFor="name">Product name</label>
                    </div>
                    <input type="text" name="name" value={data.name} onChange={handleChange} />
                    <div>
                        <label htmlFor="brand_name">Brand name</label>
                    </div>
                    <input type="text" name="brand_name" value={data.brand_name} onChange={handleChange} />

                    <div className={styles.category2}>
                        <label htmlFor="category">Category</label>
                        <button type="button" onClick={handleAddCategory}><MdAdd /></button>
                    </div>
                    <div className={styles.container_category}>
                        {data.category.map((category, index) => (
                            <div key={index} className={styles.category}>
                                <input
                                    type="text"
                                    name={`category-${index}`}
                                    value={category}
                                    onChange={(event) => handleChangeCategory(event, index)}
                                />
                                {data.category.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCategory(index)}>
                                            <MdClear />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <label htmlFor="color">Color</label>
                    </div>
                    <input type="text" name="color" value={data.color} onChange={handleChange} />
                    
                    {/* GENDER */}
                    <div>
                        <label htmlFor="gender">Gender</label>
                    </div>
                    <select name="gender" value={data.gender} onChange={handleChange}>
                        {gender.map((props) => <option key={props} value={props}>{props}</option>)}
                    </select>
                    {/* <input type="text" name="gender" value={data.gender} onChange={handleChange} /> */}
                    
                    <div>
                        <label htmlFor="main_picture_url">Image</label>
                    </div>
                    <input type="text" name="main_picture_url" value={data.main_picture_url} onChange={handleChange} />
                    <div>
                        <label htmlFor="retail_price_cents">Price</label>
                    </div>
                    <input type="number" name="retail_price_cents" value={data.retail_price_cents} onChange={handleChange} pattern="[0-9]*" />


                    {/* STOCK */}
                    <div className={styles.category2}>
                        <label htmlFor="stock">Stock</label>
                        <button type="button" onClick={handleAddStock}><MdAdd /></button>
                    </div>
                    <div className={styles.container_category}>
                        {stocks.map((stock, index) => (
                            <div key={index} className={styles.category}>
                                <label htmlFor={`stock-size-${index}`}>Size</label>
                                <input
                                    type="text"
                                    id={`stock-size-${index}`}
                                    name={`stock-size-${index}`}
                                    value={stock.size}
                                    onChange={(event) => handleChangeStockSize(event, index)}
                                />
                                <label htmlFor={`stock-quantity-${index}`}>Quantity</label>
                                <input
                                    type="number"
                                    id={`stock-quantity-${index}`}
                                    name={`stock-quantity-${index}`}
                                    value={stock.quantity}
                                    onChange={(event) => handleChangeStockQuantity(event, index)}
                                />
                                {stocks.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStock(index)}>
                                            <MdClear />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* AQUI */}



                    <div className={styles.container_button}>
                        <button type="submit" onClick={handleDraft}>Save draft</button>
                        <button type="submit" onClick={handleActive}>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Add_Product };
