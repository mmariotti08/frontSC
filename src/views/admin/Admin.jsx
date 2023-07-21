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
    // const  dispatch = useDispatch();

    // const { isLoaded, user } = useUser();

    // const [adminData, setAdminData] = useState({
    //     mail: "",
    //     password: ""
    // });

    const access = useSelector(state => state.getApprovalAdmin);

    // if(isLoaded) {
    //     console.log(user.primaryEmailAddress.emailAddress);
    //     adminData.mail = user.primaryEmailAddress.emailAddress
    //     dispatch(getApproval(adminData));
    // }

    // useEffect(() => {
        
    // }, [isLoaded]);

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