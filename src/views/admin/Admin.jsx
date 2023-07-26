import {  useSelector } from "react-redux";
import { Login } from "../../components/Admin/Login/Login";
import { Menu } from "./Menu";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";
import { useEffect } from "react";

const Admin = () => {
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth_token);

    useEffect(() => {
        !user?.administrator && navigate('/admin');
    }, [user?.administrator, navigate]);

    return (
        <div className={styles.container_admin}>
            {user?.administrator
                ? <Menu /> 
                : <Login />}
        </div>
    );
};

export { Admin };