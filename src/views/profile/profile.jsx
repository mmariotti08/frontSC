import React, { useEffect, useState } from 'react';
import style from './Profile.module.css';
import Suggestions from './Suggestions/Suggestions';
import { Upload_Image } from '../../components/Admin/Others/Upload Image/Upload Image';
import { updateOneUser, getUserId } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


const Account = ({userId}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  //const user = useSelector((state) => state.users);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth_token);

  useEffect(() => {
    if (isAuthenticated && user && user.id) {
    const userId = user.id;
    dispatch(getUserId(userId));
    }
  }, [isAuthenticated, user, dispatch]);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEditClick = () => {
    setEditing(true);
    setEditedUser(user)
  };

  const handleSaveClick = async () => {
    try {
      const userId = user.id; // Obtener el ID del usuario autenticado
      await dispatch(updateOneUser(userId, editedUser)); // Actualizar la información del usuario
      setEditing(false); // Salir del modo de edición
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };


  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <h2 className={style.h2}>My Account</h2>
      <div>
      <Upload_Image image={image} setImage={setImage} />
      </div>
      <div>
         <button className={style.button} type="submit">Save Picture</button>
      </div>
     {editing ? (
        <div>
      <div>
        <label className={style.label} htmlFor="name">First Name:</label>
        <input className={style.input} type="text" id="name" name="name" 
        value={editedUser.name} onChange={handleInputChange}
        />
      </div>
      <div>
        <label className={style.label} htmlFor="last_name">Last Name:</label>
        <input className={style.input} type="last_name" id="last_name" name="last_name"
        value={editedUser.last_name} onChange={handleInputChange} />
      </div>
      <div>
        <label className={style.label}>Password:</label>
        <input className={style.input} type="password" value="*********" />
      </div>
      <div>
        <label className={style.label} htmlFor="mail" >Mail:</label>
        <input className={style.input} type="mail" id="mail" name="mail"
        value={user.mail} />
      </div>
      <div>
        <label className={style.label} htmlFor="phone">Phone:</label>
        <input className={style.input} type="phone" id="phone" name="phone" 
        value={editedUser.phone} onChange={handleInputChange}  />
      </div>
      <div>
        <button className={style.button} type="submit" 
        onClick={handleSaveClick} >Save Changes</button>
      </div>
        </div>
      ) : (
        <div>

          <p>First Name: {user.name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Password: ******** </p>
          <p>Mail: {user.mail}</p>
          <p>Phone: {user.phone}</p>
          <button className={style.button} onClick={handleEditClick}>Editar</button>
        </div>
      )}   

      <Suggestions />
    </div>
  );
};


export default Account