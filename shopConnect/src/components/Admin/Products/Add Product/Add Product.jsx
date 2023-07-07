import { useState } from "react";
import styles from "./Add Product.module.css";
import { MdClear, MdAdd } from "react-icons/md";

const Add_Product = () => {
    const [data, setData] = useState({
        name: "",
        brand_name: "",
        category: [""],
        color: "",
        gender: "",
        main_picture_url: "",
        retail_price_cents: "",
        slug: "",
        status: "",
    });

    const [stocks, setStocks] = useState({
        productId: null,
        size: "",
        quantity: null
    });

    const handleChange = ({ target: { name, value } }) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleDraft = (event) => {
        event.preventDefault();
        // Lógica para guardar como borrador
    };

    const handleActive = (event) => {
        event.preventDefault();
        // Lógica para publicar
    };

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
                    <div>
                        <label htmlFor="gender">Gender</label>
                    </div>
                    <input type="text" name="gender" value={data.gender} onChange={handleChange} />
                    <div>
                        <label htmlFor="main_picture_url">Image</label>
                    </div>
                    <input type="text" name="main_picture_url" value={data.main_picture_url} onChange={handleChange} />
                    <div>
                        <label htmlFor="retail_price_cents">Price</label>
                    </div>
                    <input type="text" name="retail_price_cents" value={data.retail_price_cents} onChange={handleChange} pattern="[0-9]*" />


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
