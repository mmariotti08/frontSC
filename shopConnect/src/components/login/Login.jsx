import { UserButton, SignIn, useAuth, useUser } from "@clerk/clerk-react";
import style from './Login.css?inline';
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
  const { accessToken } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      dispatch(addUser(user));
    }
  }, [isSignedIn]);

  return (
    <div className={style.container}>
      <div className={style.signInContainer}>
        <SignIn />
      </div>
      <UserButton />
      <button className={style["close-button"]} onClick={handleCloseModal}>
        Cerrar
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  addUser,
};

export default connect(null, mapDispatchToProps)(Login);
