import { useEffect } from "react";
import styles from "./All Orders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../../redux/actions";

const All_Orders = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders());
    }, []);

    const orders = useSelector(state => state.all_Orders);

    const options = {
        label_table: ["", "", "", "", "Total amount", "Products"]
    };

    // PAGINADO
    const page = useSelector((state) => state.page);
    const perPage = 10;
    const max = Math.ceil(orders.length / perPage);

    return (
        <div className={styles.container}>
            <div>
                <h1>
                    All Orders
                </h1>
            </div>
            <div>
                {!orders.length
                    ? <div className={styles.container_no_banned}>
                        <h3>There are no available orders.</h3>
                    </div>
                    :<table>
                        <thead>
                            <tr>
                                {options.label_table.map((c, index) => (<th key={index}>{c}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders
                                .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                                ?.map((c, index) => (
                                    <tr
                                        key={`${c.id}-${index}`}
                                        className={index % 2 === 0 ? styles.evenRow : null}
                                        // onMouseEnter={() => handleMouseEnter(c.id)}
                                        // onMouseLeave={handleMouseLeave}
                                        >
                                        <td>{c.description}</td>
                                        <td>{c.status}</td>
                                        <td>{c.payment_method}</td>
                                        <td>{c.shipping_address}</td>
                                        <td>{c.total_amount}</td>
                                        <td><p>View</p></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>
            {orders.length > perPage && <Paginate max={max}/>}
        </div>
    );
};

export { All_Orders };