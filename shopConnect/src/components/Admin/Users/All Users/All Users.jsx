import styles from "./All Users.module.css";
import { getUsers } from "../../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const All_Users = ({ option, setOption }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const users = useSelector(state => state.allUsers);

    const options = {
        // menu1: ["Add new", "Import", "Export"],
        label_table: ["Name", "Last name", "Mail", "Phone", "Active", "Admin"],
        // menu3: ["Edit", "Send to Draft", "Stock"]
    };

    console.log(users);
    

    return (
        <div className={styles.container}>
            <div>
                <h1>Users</h1>
            </div>
            <div>
                <table>
                    <thead>
                        {options.label_table.map((c, index) => (<th key={index}>{c}</th>))}
                    </thead>
                    <tbody className={styles.table_body}>
                    {users
                        // .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                        ?.map((c, index) => (
                            <tr
                                key={`${c.id}-${index}`}
                                className={index % 2 === 0 ? styles.evenRow : null}
                                // onMouseEnter={() => handleMouseEnter(c.id)}
                                // onMouseLeave={handleMouseLeave}
                                >
                                <td>
                                    {c.name}
                                    {/* {showMenu && currentProductId === c.id && (
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
                                    </div>)} */}
                                </td>
                                <td>{c.last_name}</td>
                                <td>{c.mail}</td>
                                <td>{c.phone}</td>
                                <td>{`${c.active}`}</td>
                                <td>{`${c.administrator}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { All_Users };