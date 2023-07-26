import style from "./userBanner.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useUser } from "@clerk/clerk-react";
import { getUsers } from "../../redux/actions";

const UserBanned = ({ setNavBarEnabled }) => {
  const { isSignedIn } = useUser();
  const userss = useSelector((state)=> state.users)
  const user = useUser(true);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
        
    dispatch(getUsers())
}, [dispatch])
const idUser = userss.length > 0 ? userss.find(item => item.mail === user.user?.primaryEmailAddress.emailAddress) : null;

useEffect(() => {
  if (isSignedIn && idUser && idUser.active === false) { // Cambia la condición a idUser.validate === false
    setShowModal(true);

  } else {
    setShowModal(false);

  }
}, [isSignedIn, idUser]); // Elimina setNavBarEnabled de las dependencias



return (
  <>
  {showModal && (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>¡You have been banned!</h2>
        <p>Your account has been deactivated because it violates our terms of use. You can get more information in the Frequent Questions or by contacting us at shopconnect@gmail.com.</p>
        {/* No incluir el botón "Cerrar" */}
      </div>
    </div>
  )}
</>
);
}

export default UserBanned;