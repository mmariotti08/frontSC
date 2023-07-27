import React, { useState } from 'react';
import style from './Profile.module.css';
//import { Upload_Image } from '../../components/Admin/Others/Upload Image/Upload Image';
import { updateOneUser} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


const Account = () => {
	const dispatch = useDispatch();
	const [image, setImage] = useState(null);
	const [editing, setEditing] = useState(false);
	const [editedUser, setEditedUser] = useState({});
	
	const { isAuthenticated, user } = useSelector((state) => state.auth_token);

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
			const userId = user.id;
			 
			dispatch(updateOneUser(userId, editedUser)); 
			setEditing(false); 
		} catch (error) {
			console.error("Error al guardar los cambios:", error);
		}
	};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

	
	if (!user) {
		return <div className={style.h2}>Loading...</div>;
	}

	return (
		<div className={style.container}>
					
		 {editing ? (
				<div>
          <h2 className={style.h2}>Edit My Account</h2>
          <div>
          {image && <img className={style.image} src={image} alt="Preview" />}
          <input type="file" accept="image/*" onChange={handleImageChange}
            />
          </div>
			<div>
				<label className={style.label} htmlFor="name">First Name:</label>
				<input className={style.input} type="text" id="name" name="name" 
				value={editedUser.name} onChange={handleInputChange}/>
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
				<div className={style.contain}>
          <div>
          <a href="/my-account/orders">
				<button className={style.buttonO}>My Orders</button>
			    </a>
          </div>
          <div>
          <h2 className={style.h2}>My Account</h2>
          {image && <img src={user.picture} alt="Profile" className={style.image} />}
          </div>
          <div>
					<p className={style.p}>First Name: {user.name}</p>
					<p className={style.p}>Last Name: {user.last_name}</p>
					<p className={style.p}>Password: ******** </p>
					<p className={style.p}>Mail: {user.mail}</p>
					<p className={style.p}>Phone: {user.phone}</p>
					<button className={style.button} onClick={handleEditClick}>Editar</button>
          </div>
				</div>
			)} 
		</div>
	);
};


export default Account

