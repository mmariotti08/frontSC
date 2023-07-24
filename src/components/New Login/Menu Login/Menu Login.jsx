import { useSelector } from "react-redux";
import { Logout } from "../Logout/Logout";
import styles from "./Menu Login.module.css"
import { Link } from "react-router-dom";

const Menu_Login = ({ setSignIn, googleAccessToken, setGoogleAccessToken }) => {
    const { user: { administrator } } = useSelector(state => state.auth_token);
    
    return (
        <div id={styles.menu_login}>
            <Link to={'/my-account/orders'}>Orders</Link>
            <Link to={'/favorites'}>Favorites</Link>
            <Link to={'/cart'}>Cart</Link>
            <Link to={'/my-account'}>Account</Link>
            {administrator && <Link to={'/admin'}>Admin</Link>}
            <Logout
                setSignIn={setSignIn}
                googleAccessToken={googleAccessToken}
                setGoogleAccessToken={setGoogleAccessToken}
                />
        </div>
    );
};

export { Menu_Login };