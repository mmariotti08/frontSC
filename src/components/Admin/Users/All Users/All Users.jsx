import styles from "./All Users.module.css";
import { getUsers } from "../../../../redux/actions";
import { putUser } from "../../../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paginate } from "../../../paginate/paginate";

const All_Users = ({ option, setOption }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const users = useSelector(state => state.users);

    const adminCount = users?.reduce((count, user) => user.administrator ? count + 1 : count, 0);

    const options = {
        label_table: ["Name", "Last name", "Mail", "Phone", "Role"],
        mini_menu: ["Edit", "Ban" ]
    };

    const [editing, setEditing] = useState(null);
    const [userEdits, setUserEdits] = useState({});

    const handleChange = ({ target: { value, name } }) => {
        setUserEdits({
            ...userEdits,
            [name]: name !== "administrator"
                        ? value
                        : value === "User"
                            ? false
                            : true
        });
    };

    const handleSave = async (userId) => {
        await dispatch(putUser(userId, userEdits));
        dispatch(getUsers());
        setEditing(null);
        setUserEdits({});
    };

    const handleCancel = () => {
        setEditing(null);
        setUserEdits({});
    };

    // RENDERING
    const handleClick = async (option, userId = "") => {
        if(option === "Ban") {
            await dispatch(putUser(userId, { active: false }));
            dispatch(getUsers());
        } else if(option === "Edit") {
            setEditing(userId);
        }
        //   else {
        //     setOption(option);
        //     //cambiar
        //     setProductId(userId);
        // };
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
    const perPage = 10;
    const max = Math.ceil(users.length / perPage);

    return (
        <div className={styles.container}>
            <div>
                <h1>All Users</h1>
            </div>
            <div>
                <div className={styles.container_button}>
                    {editing &&
                        <>
                            <button onClick={() => handleSave(editing)}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </>}
                </div>
                {!users.length
                    ? <div className={styles.container_no_banned}>
                        <h3>There are no users.</h3>
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
                                        {editing === c.id 
                                            ? <input name="name" defaultValue={c.name} onChange={handleChange} /> 
                                            : c.name}
                                        {showMenu && currentUsersId === c.id && editing !== c.id && (
                                        <div className={styles.menu3}>
                                            <ul>
                                                {c.administrator && adminCount <= 1 
                                                    ? options.mini_menu.filter(option => option !== "Ban").map(option => (
                                                        <li key={`menu3-${option}`} onClick={() => handleClick(option, c.id)}>
                                                            <p>{option}</p>
                                                        </li>
                                                    )) 
                                                    : options.mini_menu.map(option => (
                                                        <li key={`menu3-${option}`} onClick={() => handleClick(option, c.id)}>
                                                            <p>{option}</p>
                                                        </li>
                                                ))}
                                            </ul>
                                        </div>)}
                                    </td>
                                    <td>
                                        {editing === c.id 
                                            ? <input name="last_name" defaultValue={c.last_name} onChange={handleChange} /> 
                                            : c.last_name}
                                    </td>
                                    <td>
                                        {editing === c.id 
                                            ? <input name="mail" defaultValue={c.mail} onChange={handleChange} /> 
                                            : c.mail}
                                    </td>
                                    <td>
                                        {editing === c.id 
                                            ? <input name="phone" defaultValue={c.phone} onChange={handleChange} /> 
                                            : c.phone}
                                    </td>
                                    <td>
                                        {editing === c.id 
                                            ? (
                                                c.administrator && adminCount <= 1
                                                ? "Admin"
                                                : (
                                                    <select name="administrator" defaultValue={c.administrator ? "Admin" : "User"} onChange={handleChange}>
                                                        <option value="Admin">Admin</option>
                                                        <option value="User">User</option>
                                                    </select>
                                                )
                                            ) 
                                            : c.administrator ? "Admin" : "User"}
                                    </td>
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

export { All_Users };