import { useDispatch, useSelector } from "react-redux";
import styles from "./User Draft.module.css";
import { getUsersDraft, putUser, deleteUser } from "../../../../redux/actions";
import { useEffect, useState } from "react";
import { Paginate } from "../../../paginate/paginate";

const User_Draft = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersDraft());
    }, []);

    const users = useSelector(state => state.users_draft);

    const options = {
        label_table: ["Name", "Last name", "Mail", "Phone", "Role"],
        mini_menu: ["Unban", "Delete"]
    };

    // RENDERING
    const handleClick = async (option, userId = "") => {
        if(option === "Unban") {
            await dispatch(putUser(userId, { active: true }));
            dispatch(getUsersDraft());
        } else if(option === "Delete") {
            await dispatch(deleteUser(userId));
            dispatch(getUsersDraft());
        };
    };

    // MINI MENU
    const [showMenu, setShowMenu] = useState(false);
    const [currentUsersId, setCurrentUsersId] = useState(null);

    const handleMouseEnter = (userId) => {
        setShowMenu(true);
        setCurrentUsersId(userId);
    };

    const handleMouseLeave = () => {
        setShowMenu(false);
        setCurrentUsersId(null);
    };
    
    // PAGINADO
    const page = useSelector((state) => state.page);
    const perPage = 15;
    const max = Math.ceil(users.length / perPage);

    return (
        <div className={styles.container}>
            <div>
                <h1>Banned</h1>
            </div>
            <div>
                {!users.length
                    ? <div className={styles.container_no_banned}>
                        <h3>There are no banned users.</h3>
                    </div>
                    :<table>
                        <thead>
                            <tr>
                                {options.label_table.map((c, index) => (<th key={index}>{c}</th>))}
                            </tr>
                        </thead>
                        <tbody className={styles.table_body}>
                        {users
                            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                            ?.map((c, index) => (
                                <tr
                                    key={`${c.id}-${index}`}
                                    className={index % 2 === 0 ? styles.evenRow : null}
                                    onMouseEnter={() => handleMouseEnter(c.id)}
                                    onMouseLeave={handleMouseLeave}
                                    >
                                    <td>
                                        {c.name}
                                        {showMenu && currentUsersId === c.id && (
                                        <div className={styles.menu3}>
                                            <ul>
                                                {options.mini_menu.map(option => (
                                                    <li
                                                        key={`menu3-${option}`}
                                                        onClick={() => handleClick(option, c.id)}
                                                        >
                                                        <p>{option}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>)}
                                    </td>
                                    <td>{c.last_name}</td>
                                    <td>{c.mail}</td>
                                    <td>{c.phone}</td>
                                    <td>{c.administrator ? "Admin" : "User"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                
            </div>
            {users.length > perPage && <Paginate max={max}/>}
        </div>
    );
};

export { User_Draft };