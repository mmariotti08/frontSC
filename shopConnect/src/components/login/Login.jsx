import { UserButton, SignIn, useAuth, useUser } from "@clerk/clerk-react";
import style from './Login.css?inline';
import { connect, useDispatch } from "react-redux";
import { addUser } from "../../redux/actions";
import { useEffect } from "react";

const Login = ({ closeModal, addUser }) => {
  const { isSignedIn } = useUser();
  console.log(isSignedIn);
const dispatch = useDispatch();

  const handleCloseModal = () => {
    closeModal();
  };

  const user = useUser();
  const { accessToken } = useAuth();

  useEffect(() => {
    console.log("aaaaaaa");
    if (isSignedIn) {
      dispatch(addUser(user));
    }
  }, [isSignedIn]);

  const sendUserDataToBackend = async () => {
    const { fullName, primaryEmailAddress  } = user;

    try {
      await addUser({ fullName, email: primaryEmailAddress?.email });
      // Otros pasos después de enviar exitosamente los datos al backend
    } catch (error) {
      console.log(error);
    }
  };

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
