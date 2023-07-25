import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApproval, auth_mail_Login } from "../../../redux/actions";
import validation from "./validation";
import styles from './Login.module.css';

const Login = () => {
    const dispatch = useDispatch();

    const access = useSelector(state => state.getApprovalAdmin);

    const [error, setError] = useState({});

    const [adminData, setAdminData] = useState({
        mail: "",
        password: ""
    });

    useEffect(() => {
        if(!access.access){
            setError({message: access.message});
            setAdminData({
                mail: "",
                password: ""
            });
        };
    }, [access]);

    const handleChange = ({ target: { name, value } }) => {
        setAdminData({
            ...adminData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(adminData.mail.length < 3 || adminData.password.length < 6 || !adminData.mail.length || !adminData.password.length) {
            setError(validation({...adminData, [event.target.name]: event.target.value }));
        } else {
            dispatch(auth_mail_Login(adminData));
            // dispatch(getApproval(adminData));
        };
    };

    return (
        <div className={styles.container}>
            <form>
                <div>
                    <label htmlFor="mail">Email</label>
                    {error.n1 ? <p>{error.n1}</p> : <p>{error.e1}</p>}
                    {!access.access && <p>{error.message}</p>}
                </div>
                <div>
                    <input type="text" name="mail" value={adminData.mail} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    {error.p2 ? <p>{error.p2}</p> : <p>{error.p1}</p>}
                </div>
                <div>
                    <input type="password" name="password" value={adminData.password} onChange={handleChange} />
                </div>
                {/* <div>
                    <label htmlFor="rememberMe">Remember me</label>
                    <input type="checkbox" name="rememberMe" checked={adminData.rememberMe} onChange={handleChange} />
                </div> */}
                <button type="SUBMIT" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export { Login }