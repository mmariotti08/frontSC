import { useSelector } from "react-redux";
import { Login } from "../../components/Admin/Login/Login";
import { Menu } from "./Menu";
import { Routes, Route } from "react-router-dom";
import styles from "./Admin.module.css"

const Admin = () => {

    const getApprovalAdmin = useSelector(state => state.getApprovalAdmin);

    return (
        <div className={styles.container_admin}>
            {getApprovalAdmin ? <Menu /> : <Login />}
        </div>
    );
};

export { Admin };