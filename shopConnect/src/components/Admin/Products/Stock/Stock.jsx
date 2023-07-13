import { useDispatch, useSelector } from "react-redux";
import { getStockID } from "../../../../redux/actions";
import { getDetail } from "../../../../redux/actions";
import { useEffect } from "react";
import { Paginate } from "../../../paginate/paginate";
import styles from "./Stock.module.css";

const Stock = ({ productId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStockID(productId));
        dispatch(getDetail(productId))
    }, [productId]);

    const product = useSelector(state => state.detail);
    const stock = useSelector(state => state.get_stock_by_id);

    const options = ["Size", "Quantity"];

    // PAGINATION
    const perPage = 20;
    const max = Math.ceil(stock.length / perPage);
    const page = useSelector(state => state.page);

    return (
        <div className={styles.container}>
            <div>
                <h1>Stock</h1>
            </div>
            <div className={styles.container_img_table}>
                <div className={styles.container_img}>
                    <img src={product.main_picture_url} alt="" />
                </div>
                <div className={styles.container_title_table}>
                    <div className={styles.container_title}>
                        <h3>{product.name}</h3>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {options.map((c, index) => (<th key={index}>{c}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {stock
                                .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                                ?.map(c => (
                                    <tr key={c.id} className={c.id % 2 !== 0 ? styles.evenRow : null}>
                                        {/* <td>{c.productId}</td> */}
                                        <td>{c.size}</td>
                                        <td>{c.quantity}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {stock.length > 20 && <Paginate max={max}/>}
        </div>
    );
};

export { Stock };