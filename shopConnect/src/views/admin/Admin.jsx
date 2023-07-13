import { useSelector } from "react-redux";
import { Login } from "../../components/Admin/Login/Login";
import { Menu } from "./Menu";
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";
import { useEffect } from "react";

const Admin = () => {
    const navigate = useNavigate();

    const access = useSelector(state => state.getApprovalAdmin);

    useEffect(() => {
        !access && navigate('/admin');
      }, [access, navigate]);
    return (
        <div className={styles.container_admin}>
            {access 
                ? <Menu /> 
                : <Login />}
        </div>
    );
};

export { Admin };