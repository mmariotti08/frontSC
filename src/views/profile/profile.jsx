import React, { useState } from 'react';
import style from './Profile.module.css';
// import { useUser } from '@clerk/clerk-react';
import Suggestions from './Suggestions/Suggestions';



const Profile = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [profilePicture, setProfilePicture] = useState('');

    if (!isLoaded || !isSignedIn) {
      return null;
    }
  
    // Función para manejar el cambio de la imagen seleccionada
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.h2}>User Profile</h2>
      <div>
      <img className={style.image} src={profilePicture || user.imageUrl} alt="Profile" />
      </div>
      <div>
        <label className={style.label}> Change Profile Picture:</label>
        <input className={style.input} type="file" onChange={handleImageChange} />
        <button className={style.button} type="submit">Save Picture</button>
      </div>
      <div>
        <label className={style.label}>First Name:</label>
        <input className={style.input} type="text" value={user.firstName} 
        />
      </div>
      <div>
        <label className={style.label}>Last Name:</label>
        <input className={style.input} type="text" value={user.lastName}  />
      </div>
      <div>
        <label className={style.label}>Password:</label>
        <input className={style.input} 
        type="password" value="*********" />
      </div>
      <div>
        <label className={style.label} >Mail:</label>
        <input className={style.input} 
        type="mail" value={user.primaryEmailAddress.emailAddress}  />
      </div>
      <div>
        <label className={style.label}>Phone:</label>
        <input className={style.input} 
        type="phone" value={user.primaryPhoneNumber.phoneNumber} 
         />
      </div>
      <div>
        <button className={style.button} type="submit">Save Changes</button>
      </div>
      
      <Suggestions />
    </div>
  );
};

export default Profile