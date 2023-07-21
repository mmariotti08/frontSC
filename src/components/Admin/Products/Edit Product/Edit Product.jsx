import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import { useEffect, useState } from "react";
import styles from "./Edit Product.module.css";
import { MdClear, MdAdd } from "react-icons/md";
import { getStockID } from "../../../../redux/actions";
import { getDetail } from "../../../../redux/actions";
import { putProducto } from "../../../../redux/actions";
import { Upload_Image } from "../../Others/Upload Image/Upload Image";

const Edit_Product = ({ productId }) => {
    const dispatch = useDispatch();
    
    const product = useSelector(state => state.detail);
    const stock = useSelector(state => state.get_stock_by_id);

    const [image, setImage] = useState([]);
    const [formOn, setFormOn] = useState(true);
    const [error, setError] = useState({});
    const [stocks, setStocks] = useState([{ size: "", quantity: "1" }]);
    const [data, setData] = useState({
        name: "",
        brand_name: "",
        category: [""],
        color: "",
        gender: "Man",
        main_picture_url: [""],
        retail_price_cents: "0",
        slug: "",
        status: "",
    });

    const gender = ["Man", "Woman", "Unisex"];
    const sizes = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "14.5", "15"];

    useEffect(() => {
        dispatch(getDetail(productId));
        dispatch(getStockID(productId));
    }, [productId, dispatch]);

    useEffect(() => {
        if (product && product.name) {
            setData({
                name: product.name,
                brand_name: product.brand_name,
                category: product.category,
                color: product.color,
                gender: product.gender[0],
                main_picture_url: product.main_picture_url,
                retail_price_cents: product.retail_price_cents,
                slug: "",
                status: "",
            });
            setStocks(stock);
            setImage(product.main_picture_url)
        };
    }, [product, stock]);

    const handleChange = ({ target: { name, value } }) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        data.gender = [data.gender];
        data.main_picture_url = image;

        const stockIsValid = stocks.every(stock => stock.size !== "" && stock.quantity > 0);
        const categoryIsValid = data.category.every(category => category !== "");
        if(!categoryIsValid || !stockIsValid || !data.name.length || !data.brand_name.length || !data.color || !data.main_picture_url || data.retail_price_cents < 0) {
            setError(validation({ ...data, [event.target.name]: event.target.value }, stockIsValid, categoryIsValid));
        } else {
            dispatch(putProducto(productId, data, stocks));
            setError({});
            setFormOn(false)
            window.scrollTo(0, 0);
        };
    };

    // MANEJO DE CATEGORIAS
    const handleAddCategory = () => {
        setData({
          ...data,
          category: [...data.category, ""]
        });
      };

    const handleRemoveCategory = (index) => {
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
    const handleAddStock = () => {
        setStocks([
            ...stocks,
            {
                size: "",
                quantity: "1"
            }
        ]);
    };

    const handleRemoveStock = (index) => {
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
                <h1>Edit Product</h1>
            </div>
            <div className={styles.containerform}>
                {!formOn
                    ? <>
                        <h3>Product edited successfully!</h3>
                    </>
                    : <form>
                        {/* NAME */}
                        <div>
                            <div className={styles.container_label_error}>
                                <label htmlFor="name">Product name</label>
                                {error.n1 && <p>{error.n1}</p>}
                            </div>
                            <input type="text" name="name" value={data.name} onChange={handleChange} />
                        </div>
                        {/* BRAND NAME */}
                        <div>
                            <div className={styles.container_label_error}>
                                <label htmlFor="brand_name">Brand name</label>
                                {error.bn1 && <p>{error.bn1}</p>}
                            </div>
                            <input type="text" name="brand_name" value={data.brand_name} onChange={handleChange} />
                        </div>
                        {/* CATEGORY */}
                        <div className={styles.category2}>
                            <label htmlFor="category">Category</label>
                            {error.ca1 && <p>{error.ca1}</p>}
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
                        {/* COLOR */}
                        <div>
                            <div className={styles.container_label_error}>
                                <label htmlFor="color">Color</label>
                                {error.c1 && <p>{error.c1}</p>}
                            </div>
                            <input type="text" name="color" value={data.color} onChange={handleChange} />
                        </div>
                        {/* GENDER */}
                        <div>
                            <label htmlFor="gender">Gender</label>
                        </div>
                        <select name="gender" value={data.gender} onChange={handleChange}>
                            {gender.map((props) => <option key={props} value={props}>{props}</option>)}
                        </select>
                        {/* PRICE */}
                        <div>
                            <div className={styles.container_label_error}>
                                <label htmlFor="retail_price_cents">Price</label>
                                {error.p1 && <p>{error.p1}</p>}
                            </div>
                            <input type="number" name="retail_price_cents" value={data.retail_price_cents} onChange={handleChange} min={0} pattern="[0-9]*" />
                        </div>
                        {/* STOCK */}
                        <div className={styles.category2}>
                            <label htmlFor="stock">Stock</label>
                            {error.s1 && <p>{error.s1}</p>}
                            <button type="button" onClick={handleAddStock}><MdAdd /></button>
                        </div>
                        <div className={styles.container_category}>
                            {stocks.map((stock, index) => (
                                <div key={index} className={styles.category}>
                                    <label htmlFor={`stock-size-${index}`}>Size</label>
                                    <select
                                        id={`stock-size-${index}`}
                                        name={`stock-size-${index}`}
                                        value={stock.size}
                                        onChange={(event) => handleChangeStockSize(event, index)}
                                        >
                                        <option value="">Select Size</option>
                                        {sizes.map((size) => (
                                            <option key={size} value={size} disabled={stocks.some(stock => stock.size === size)}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor={`stock-quantity-${index}`}
                                        >Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id={`stock-quantity-${index}`}
                                        name={`stock-quantity-${index}`}
                                        value={stock.quantity}
                                        onChange={(event) => handleChangeStockQuantity(event, index)}
                                        min={1}
                                        pattern="[0-9]*"
                                    />
                                    {stocks.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveStock(index)}
                                            ><MdClear />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* IMAGE */}
                        <div>
                            <div className={styles.container_label_error}>
                                <label htmlFor="main_picture_url">Image</label>
                                {error.mp1 && <p>{error.mp1}</p>}
                            </div>
                            <Upload_Image image={image} setImage={setImage} />
                        </div>
                        {/* BUTTON */}
                        <div className={styles.container_button}>
                            <button
                                type="submit"
                                onClick={handleUpdate}
                                >Update
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
};

export { Edit_Product };