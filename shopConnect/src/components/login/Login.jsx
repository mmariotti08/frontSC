import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  const componentClicked = () => {
    alert('evento');
  };

  return (
    <div className={styles.container}>
      <h2>Iniciar Sesión</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="username">Usuario</label>
        <input type="text" id="username" placeholder="Ingrese su usuario o email" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="Ingrese su contraseña" />
      </div>
      <div className={styles.socialLoginContainer}>
        <GoogleLogin
          clientId="138752131702-psg2fhljigg675atc7uoqtnb8pa63jc2.apps.googleusercontent.com"
          buttonText="Iniciar sesión con Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          className={styles.GoogleLoginButton}
        />
        <FacebookLogin
          appId="238480889043610"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
          textButton="Iniciar sesión con Facebook"
          className={styles.FacebookLoginButton}
        />
      </div>
      <div className={styles.createAccountContainer}>
        <label htmlFor="">No tienes Cuenta?</label>
        <div>
          <Link to='/createProfile'>Crear cuenta </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
