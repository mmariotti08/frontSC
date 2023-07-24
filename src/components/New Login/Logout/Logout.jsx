import { useDispatch } from "react-redux";
import styles from "./Logout.module.css";
import { GoogleLogout } from 'react-google-login';
import { logout } from "../../../redux/actions";

const Logout = ({ setSignIn, googleAccessToken, setGoogleAccessToken }) => {
    const clientId = "1027048250245-li9gor30unv7ieg8tkk77fpbh78cahbs.apps.googleusercontent.com";

    const dispatch = useDispatch();
    
    const onLogoutSuccess = () => {
        console.log("Success");
        // localStorage.removeItem('googleAccessToken');
        setGoogleAccessToken(null)
        setSignIn(false);
        dispatch(logout());
    };
    
    return (
        <>
            {googleAccessToken
                ? <GoogleLogout
                    className={styles.logout_google}
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onLogoutSuccess}
                />
                : <button onClick={onLogoutSuccess}>Logout-2</button>
            }
        </>
    );
};

export { Logout };