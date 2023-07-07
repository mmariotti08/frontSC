import { useSelector } from "react-redux";
import { Paginate } from "../../Paginate/Paginate";
import styles from "./All Products.module.css"

const All_Products = () => {
    const products = useSelector(state => state.products);

    const options = {
        menu1: ["Add new", "Import", "Export"],
        menu2: ["id", "Imagen", "Nombre", "Inventario", "Precio", "Categorías"]
    };

    const counterStock = (stocks, counter = 0) => {
        stocks.map(stock => counter += stock.quantity)
        if(counter > 0) return `Available (${counter})`
        return `Not available`;
    };
    // PAGINADO
    const page = useSelector((state) => state.page);

    const perPage = 10;

    const max = Math.ceil(products.length / perPage);

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
                        {products
                            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                            ?.map(c => (
                                <tr key={c.id} className={c.id % 2 !== 0 ? styles.evenRow : null}>
                                    <td>{c.id}</td>
                                    <td><img src={c.main_picture_url} alt="" /></td>
                                    <td>{c.name}</td>
                                    <td className={counterStock(c.Stocks).includes('Not available') ? styles.Not_Available : styles.Available}>{counterStock(c.Stocks)}</td>
                                    <td>${c.retail_price_cents}</td>
                                    <td>{c.category.join(", ")}</td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Paginate max={max}/>
        </div>
    );
};

export { All_Products };