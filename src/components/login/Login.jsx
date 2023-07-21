import React from 'react';
import { UserButton, SignUp, useAuth, useUser } from "@clerk/clerk-react";
import style from './Login.module.css';
import { connect, useDispatch } from "react-redux";
import { addUser } from "../../redux/actions";
import { useEffect } from "react";


const Login = ({ closeModal, addUser }) => {

  const { isSignedIn } = useUser();
  
const dispatch = useDispatch();

  const handleCloseModal = () => {
    closeModal();
  };

  const user = useUser();

  console.log("aqui");
  console.log(user);
  console.log("aqui");
  const { accessToken } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      dispatch(addUser(user));

    }
    window.scrollTo(0, 0);
  }, [isSignedIn]);

  return (
    <div className={style.container}>
      <div className={style.signInContainer}>
        <SignUp />
      </div>
      <UserButton />
      <button className={style.butt} onClick={handleCloseModal}>
        Cerrar
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  addUser,
};

export default connect(null, mapDispatchToProps)(Login);
