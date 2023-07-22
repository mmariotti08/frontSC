import { useDispatch, useSelector } from "react-redux";
import { getStockID } from "../../../../redux/actions";
import { getDetail } from "../../../../redux/actions";
import { useEffect } from "react";
import styles from "./Stock.module.css";

const Stock = ({ productId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStockID(productId));
        dispatch(getDetail(productId))
    }, [productId]);

    const product = useSelector(state => state.detail);
    const stock = useSelector(state => state.get_stock_by_id).sort((a, b) => a.size - b.size);

    const options = ["Size", "Quantity"];

    return (
        <div className={styles.container}>
            <div>
                <h1>Stock</h1>
            </div>
            <div className={styles.container_img_table}>
                <div className={styles.container_img}>
                    {product.main_picture_url?.map(img => <img key={img} src={img} alt="" />)}
                </div>
                <div className={styles.container_title_table}>
                    <div className={styles.container_title}>
                        <h3>{product.name}</h3>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {options?.map((c, index) => (<th key={index}>{c}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {stock?.map((c, index) => (
                                <tr key={`${c.id}-${index}`} className={index % 2 === 0 ? styles.evenRow : null}>
                                    <td>{c.size}</td>
                                    <td>{c.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export { Stock };