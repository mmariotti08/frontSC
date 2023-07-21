import { useDispatch, useSelector } from "react-redux";
import styles from "./Draft.module.css";
import { getProductDraft } from "../../../../redux/actions";
import { putProducto } from "../../../../redux/actions";
import { deleteProduct } from "../../../../redux/actions";
import { useEffect, useState } from "react";
import { Paginate } from "../../../paginate/paginate";

const Draft = ({ option, setOption, setProductId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDraft());
    }, []);

    const products = useSelector(state => state.product_draft);

    // MANEJO DE MENUS Y OPCIONES
    const options = {
        label_head_table: ["ID", "Image", "Name", "Price", "Categories"],
        menu_options: ["Edit", "Publish", "Stock", "Delete"]
    };

    // RENDERING
    const handleClick = async (option, productId = "") => {
        if(option === "Publish") {
            await dispatch(putProducto(productId, { status: "active" }));
            dispatch(getProductDraft());
        } else if(option === "Delete") {
            await dispatch(deleteProduct(productId));
            dispatch(getProductDraft());
        } else {
            setOption(option);
            setProductId(productId);
        };
    };
    
    // MENU_OPTIONS
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

    // PAGINADO
    const page = useSelector((state) => state.page);
    const perPage = 10;
    const max = Math.ceil(products.length / perPage);

    const formatPrice = (price) => {
        const formattedPrice = (price / 100).toFixed(2);
        return `${formattedPrice}`;
    };
    
    return (
        <div className={styles.container}>
            <div>
                <h1>Product Draft</h1>
            </div>
            <div>
                {!products.length
                    ? <div className={styles.container_no_banned}>
                        <h3>There are no products in draft.</h3>
                    </div>
                    :<table>
                        <thead>
                            <tr>
                                {options.label_head_table.map((c, index) => (<th key={index}>{c}</th>))}
                            </tr>
                        </thead>
                        <tbody>
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
                                        <div className={styles.menu_options}>
                                            <ul>
                                                {options.menu_options.map(option => (
                                                    <li
                                                        key={`menu_options-${option}`}
                                                        // CONFIGURAR RENDERIZADO V V V
                                                        onClick={() => handleClick(option, c.id)}
                                                        >
                                                        <p>{option}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>)}
                                    </td>
                                    {/* <td className={counterStock(c.Stocks).includes('Not available') ? styles.Not_Available : styles.Available}>{counterStock(c.Stocks)}</td> */}
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

export { Draft };