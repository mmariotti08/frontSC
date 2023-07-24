import styles from "./Order Details.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderId, getUserId } from "../../../../redux/actions";

const Order_Details = ({ orderId }) => {
    const dispatch = useDispatch();

    const options = {
        user: ["Name", "Mail", "Phone"],
        order: ["Status", "Payment method", "Total", "Date"],
        product: ["Image", "Name", "Size", "Quantity"]
    }

    const order = useSelector(state => state.get_order_id);
    const user = useSelector(state => state.get_user_id);

    useEffect(() => {
        dispatch(getOrderId(orderId));
    }, [orderId]);

    useEffect(() => {
        if (order && order.userId) {
            dispatch(getUserId(order.userId));
        };
    }, [order]);

    // FORMATEAR FECHA
    const handleDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}-${formattedMonth}-${year}`;
    };

    const formatPrice = (price) => {
        const formattedPrice = (price / 100).toFixed(2);
        return `${formattedPrice}`;
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>Order Details</h1>
            </div>
            <div>
                <h3>{`Order #${order.id}`}</h3>
            </div>
            <div className={styles.container_info_table}>
                <div className={styles.container_user_order}>
                    <div>
                        <h3>User</h3>
                        <hr />
                        <p>Name</p>
                        <h4>{`${user.name} ${user.last_name}`}</h4>
                        <p>Mail</p>
                        <h4>{user.mail}</h4>
                        <p>Phone</p>
                        <h4>{user.phone}</h4>
                        <p>Shipping address</p>
                        <h4>{order.shipping_address}</h4>
                    </div>
                    <div>
                        <h3>Order</h3>
                        <hr />
                        <p>Status</p>
                        <h4>{order.status}</h4>
                        <p>Payment method</p>
                        <h4>{order.payment_method}</h4>
                        <p>Total amount</p>
                        <h4>{`$${formatPrice(order.total_amount)}`}</h4>
                        <p>Date order</p>
                        <h4>{handleDate(order.createdAt)}</h4>
                    </div>
                </div>
                {/* PRODUCT */}
                <table>
                    <thead>
                        <tr>
                            {options.product?.map((c, index) => (<th key={index}>{c}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {order.OrderProducts?.map((c, index) => (
                            <tr
                                key={`${c.id}-${index}`}
                                className={index % 2 === 0 ? styles.evenRow : null}
                                >
                                <td><img src={c.Product.main_picture_url[0]} alt="" /></td>
                                <td>{c.Product.name}</td>
                                <td>{c.size}</td>
                                <td>{c.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { Order_Details };