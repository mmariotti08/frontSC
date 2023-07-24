import { useState } from "react";
import styles from "./Mail Login.module.css";
import { useDispatch } from "react-redux";
import { auth_mail_Login } from "../../../redux/actions";

const Mail_Login = () => {
    const dispatch = useDispatch();
    
    const [user, setUser] = useState({
        mail: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(auth_mail_Login(user));
    };

    const handleChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value
        });
    };

    return (
        <form id={styles.form} onSubmit={handleSubmit}>
            <input
                name="mail"
                type="mail"
                placeholder="Mail"
                value={user.mail}
                onChange={handleChange}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
            />
            <button type="submit">Sign In</button>
        </form>
    );
};

export { Mail_Login };