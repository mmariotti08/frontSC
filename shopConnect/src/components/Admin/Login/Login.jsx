import { useState } from "react";
import { useDispatch } from "react-redux";
import { getApproval } from "../../../redux/actions";
import validation from "./validation";
import styles from './Login.module.css';

const Login = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState({});

    const [adminData, setAdminData] = useState({
        email: "",
        password: ""
    });

    const handleChange = ({ target: { name, value } }) => {
        setAdminData({
            ...adminData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(adminData.email.length < 3 || adminData.password.length < 6 || !adminData.email.length || !adminData.password.length) {
            setError(validation({...adminData, [event.target.name]: event.target.value }));
        } else {
            dispatch(getApproval(adminData));
        };
    };

    return (
        <div className={styles.container}>
            <form action="">
                <div>
                    <label htmlFor="mail">Username or email</label>
                    {error.e1 && <p>{error.e1}</p>}
                </div>
                <div>
                    <input type="text" name="email" value={adminData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    {error.p1 && <p>{error.p1}</p>}
                </div>
                <div>
                    <input type="password" name="password" value={adminData.password} onChange={handleChange} />
                </div>
                <button type="SUBMIT" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export { Login }