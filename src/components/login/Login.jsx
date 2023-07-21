import React from 'react';
import { UserButton, SignUp, useAuth, useUser } from "@clerk/clerk-react";
import style from './Login.module.css';
import { connect, useDispatch } from "react-redux";
import { addUser } from "../../redux/actions";
import { useEffect } from "react";
//import Profile from '../../views/profile/Profile'



const Login = ({ closeModal, addUser }) => {

  const { isSignedIn } = useUser();
  
const dispatch = useDispatch();

  const handleCloseModal = () => {
    closeModal();
    
  };

  const user = useUser();
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

/*Renderizado condicional
{isSignedIn ? (
  // Mostrar el componente Profile si el usuario ha iniciado sesión
  <Profile />
) : (
  // Mostrar los componentes actuales si el usuario no ha iniciado sesión
  <>
    <div className={style.signInContainer}>
      <SignUp />
    </div>
    <UserButton />
    <button className={style.butt} onClick={handleCloseModal}>
      Cerrar
    </button>
  </>
)}
</div>
);
};*/
