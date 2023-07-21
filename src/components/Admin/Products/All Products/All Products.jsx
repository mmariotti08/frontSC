
import styles from "./All Products.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paginate } from "../../../paginate/paginate";
import { getProducts, putProducto } from "../../../../redux/actions";

const All_Products = ({ setOption, setProductId }) => {
    const dispatch = useDispatch();

    const formatPrice = (price) => {
        const formattedPrice = (price / 100).toFixed(2);
        return `${formattedPrice}`;
    };

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const products = useSelector(state => state.products);

    // MANEJO DE MENUS Y OPCIONES
    const options = {
        menu1: ["Add new", "Import", "Export"],
        menu2: ["ID", "Image", "Name", "Inventory", "Price", "Categories"],
        menu3: ["Edit", "Send to Draft", "Stock"]
    };

    const counterStock = (stocks, counter = 0) => {
        stocks.map(stock => counter += stock.quantity);
        if(counter > 0) return `Available (${counter})`;
        return `Not available`;
    };

    // PAGINADO
    const page = useSelector((state) => state.page);
    const perPage = 10;
    const max = Math.ceil(products.length / perPage);

    // RENDERING
    const handleClick = async (option, productId = "") => {
        if(option === "Send to Draft") {
            await dispatch(putProducto(productId, { status: "draft" }));
            dispatch(getProducts());
        } else {
            setOption(option);
            setProductId(productId);
        };
    };

    // MENU 3
    const [showMenu, setShowMenu] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    const handleMouseEnter = (productId) => {
        setShowMenu(true);
        setCurrentProductId(productId);
    };

    const handleMouseLeave = () => {
        setShowMenu(false);
        setCurrentProductId(null);
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>All Products</h1>
                {/* <div className={styles.container_button}>
                    {options.menu1.map(c => (<button key={c} onClick={() => handleClick(c)}>{c}</button>))}
                </div> */}
                <button onClick={() => handleClick("Add product")}>Add product</button>
            </div>
            <div>
                {!products.length
                    ? <div className={styles.container_no_banned}>
                        <h3>There are no available products.</h3>
                    </div>
                    :<table>
                        <thead className={styles.menu2}>
                            <tr>
                                {options.menu2.map((c, index) => (<th key={index}>{c}</th>))}
                            </tr>
                        </thead>
                        <tbody className={styles.table_body}>
                            {products
                                .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                                ?.map((c, index) => (
                                    <tr
                                        key={`${c.id}-${index}`}
                                        className={index % 2 === 0 ? styles.evenRow : null}
                                        onMouseEnter={() => handleMouseEnter(c.id)}
                                        onMouseLeave={handleMouseLeave}
                                        >
                                        <td>{c.id}</td>
                                        <td><img src={c.main_picture_url[0]} alt="" /></td>
                                        <td>
                                            {c.name}
                                            {showMenu && currentProductId === c.id && (
                                            <div className={styles.menu3}>
                                                <ul>
                                                    {options.menu3.map(option => (
                                                        <li
                                                            key={`menu3-${option}`}
                                                            // CONFIGURAR RENDERIZADO V V V
                                                            onClick={() => handleClick(option, c.id)}
                                                            >
                                                            <p>{option}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>)}
                                        </td>
                                        <td className={counterStock(c.Stocks).includes('Not available') ? styles.Not_Available : styles.Available}>{counterStock(c.Stocks)}</td>
                                        <td>${formatPrice(c.retail_price_cents)}</td>
                                        <td>{c.category.join(", ")}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
            {products.length > perPage && <Paginate max={max}/>}
        </div>
    );
};

export { All_Products };