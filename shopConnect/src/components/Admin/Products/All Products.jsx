import { useSelector } from "react-redux";
import styles from "./All Products.module.css"

const All_Products = () => {
    const products = useSelector(state => state.products);
    console.log(products);

    const options = {
        menu1: ["Add new", "Import", "Export"],
        menu2: ["id", "Imagen", "Nombre", "Inventario", "Precio", "Categorías"]
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>All Products</h1>
                <div className={styles.container_button}>
                    {options.menu1.map(c => (<button key={c}>{c}</button>))}
                </div>
            </div>
            <div>
                <table>
                    <thead className={styles.menu2}>
                        <tr>
                            {options.menu2.map((c, index) => (<th key={index}>{c}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(c => (
                            <tr key={c.id} className={c.id % 2 !== 0 && styles.evenRow}>
                                <td>{c.id}</td>
                                <td><img src={c.main_picture_url} alt="" /></td>
                                <td>{c.name}</td>
                                <td>2</td>
                                <td>${c.retail_price_cents}</td>
                                <td>{c.category.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { All_Products };