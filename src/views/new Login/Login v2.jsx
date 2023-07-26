import styles from "./Login v2.module.css";
import { Mail_Login } from "../../components/New Login/Mail Login/Mail Login";
import { Google_Login } from "../../components/New Login/Google Login/Google Login";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from 'react-icons/io';

const Login_v2 = ({ setSignIn, setGoogleAccessToken }) => {
    const containerSignInRef = useRef(null);
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleBackgroundMouseEnter = () => {
        document.body.style.cursor = 'auto';
    };

    const handleBackgroundMouseLeave = () => {
        document.body.style.cursor = 'auto';
    };

    const handleClose = () => {
        setSignIn(false);
    };

    const handleBackgroundClick = ({ target }) => {
        if (containerSignInRef.current && !containerSignInRef.current.contains(target)) {
            handleClose();
        };
    };

    const [modeSingUp, setSingUp] = useState(false);

    return (
        <div
            className={styles.background}
            onMouseEnter={handleBackgroundMouseEnter}
            onMouseLeave={handleBackgroundMouseLeave}
            onClick={handleBackgroundClick}
            >
            <div
                className={styles.container_signIn}
                ref={containerSignInRef}
                >
                <button
                    id={styles.button_close}
                    onClick={handleClose}
                    >
                    <IoMdClose />
                </button>
                <div className={styles.title}>
                    <h2>{modeSingUp ? "Sign Up" : "Sign In"}</h2>
                    <span>
                        {modeSingUp
                            ? "Do you already have an account? "
                            : "Do you not have an account yet? "
                        }
                        <strong
                            onClick={() => setSingUp(!modeSingUp)}
                            >
                            {modeSingUp ? "Sign In" : "Sign Up"}
                        </strong>
                    </span>
                </div>
                <Mail_Login
                    modeSingUp={modeSingUp}
                    setSingUp={setSingUp}
                    />
                <div id={styles.or}>
                    <div className={styles.hr_line}></div>
                    <span>OR</span>
                    <div className={styles.hr_line}></div>
                </div>
                <Google_Login
                    setGoogleAccessToken={setGoogleAccessToken}
                    modeSingUp={modeSingUp}
                    />
            </div>
        </div>
    );
};

export { Login_v2 };