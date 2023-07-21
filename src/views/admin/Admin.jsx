import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../components/Admin/Login/Login";
import { Menu } from "./Menu";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { getApproval } from "../../redux/actions";

const Admin = () => {
    const navigate = useNavigate();

    const access = useSelector(state => state.getApprovalAdmin);

    useEffect(() => {
        !access.access && navigate('/admin');
    }, [access.access, navigate]);

    return (
        <div className={styles.container_admin}>
            {access.access 
                ? <Menu /> 
                : <Login />}
        </div>
    );
};

export { Admin };