import { useEffect, useState } from "react";
import styles from "./All Orders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getUsers } from "../../../../redux/actions";
import { Paginate } from "../../../paginate/paginate";

const All_Orders = ({ setOption, setOrderId }) => {
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    useEffect(() => {
        setLoading(true);
        Promise.all([dispatch(getAllOrders()), dispatch(getUsers())])
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading data: ", error);
                setLoading(false);
            });
    }, []);

    const orders = useSelector(state => state.all_Orders);
    const users = useSelector(state => state.users);

    const handleMouseEnter = (id) => {
        setShowMenu(true);
        setCurrentProductId(id);
    };

    const handleMouseLeave = () => {
        setShowMenu(false);
        setCurrentProductId(null);
    };

    const options = {
        label_table: ["User", "Status", "Payment method", "Total", "Date"],
        mini_menu: ["Order Details"]
    };

    // PAGINADO
    const page = useSelector((state) => state.page);
    const perPage = 10;
    const max = Math.ceil(orders.length / perPage);

    const handleGetUser = (userId) => {
        const [ user ] = users?.filter(c => c.id === userId);
        return `${user.name} ${user.last_name}`;
    };

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

    // RENDERING
    const handleClick = async (option, orderId) => {
        setOption(option);
        setOrderId(orderId)
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>
                    All Orders
                </h1>
            </div>
            <div>
            {loading ? <div>Loading...</div>
                : !orders.length
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
                                        onMouseEnter={() => handleMouseEnter(c.id)}
                                        onMouseLeave={handleMouseLeave}
                                        >
                                        <td>
                                            {handleGetUser(c.userId)}
                                            {showMenu && currentProductId === c.id && (
                                            <div className={styles.menu3}>
                                                <ul>
                                                    {options.mini_menu.map(option => (
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
                                        <td>{c.status}</td>
                                        <td>{c.payment_method}</td>
                                        <td>{`$${formatPrice(c.total_amount)}`}</td>
                                        <td>{handleDate(c.createdAt)}</td>
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