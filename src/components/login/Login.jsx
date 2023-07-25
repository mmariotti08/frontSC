import React from 'react';
import { UserButton, SignUp, useAuth, useUser, SignIn } from "@clerk/clerk-react";
import style from './Login.module.css';
import { connect, useDispatch } from "react-redux";
import { addUser } from "../../redux/actions";
import { useEffect } from "react";
//import Profile from '../../views/profile/Profile'



const Login = ({ closeModal, addUser }) => {

	const { isSignedIn, user } = useUser();
	
const dispatch = useDispatch();

	const handleCloseModal = () => {
		closeModal();
	};

	return (
		<div className={style.container}>
			<div className={style.signInContainer}>
				<SignUp />
				<SignIn />
			</div>
			<UserButton />
			<button className={style.butt} onClick={handleCloseModal}>
				Cerrar
			</button>
		</div>
	);
};

const mapDispatchToProps = { addUser };

export default connect(null, mapDispatchToProps)(Login);