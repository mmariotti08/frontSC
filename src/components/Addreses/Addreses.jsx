import { useDispatch, useSelector } from "react-redux"
import { getUsers, updateUser } from "../../redux/actions"
import { useEffect, useState } from "react"
import styles from "./Address.module.css"
import { useNavigate } from "react-router-dom";
import validation from "./validation";

const Addreses = ()=>{
    const { user } = useSelector(state => state.auth_token);

    const [data, setData]= useState({
        street:"",
        country:"",
        city:"",
        postalCode:"",
        description:""

    });
    
    const [error, setError] = useState({
        street:"",
        country:"",
        city:"",
        postalCode:"",
    });

  
   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleSumbit = (e) => {
        e.preventDefault();
      
        if (!error.street && !error.country && !error.city && !error.postalCode) {
          // No hay errores, proceder con el envío del formulario
          const direction = {
            address: {
              street: data.street,
              country: data.country,
              city: data.city,
              postalCode: data.postalCode,
              description: data.description
            }
          };
          
          dispatch(updateUser(user.id, direction));
          navigate(`/cart`);
        } else {
          // Hay errores, mostrar una alerta
          alert('Formulario incompleto.');
        }
      };
    const handleStreet = (e) => {
        setData({
            ...data,
            street: e.target.value
        });
        validation({...data, street: e.target.value}, error, setError)
    };
    const handleCountry = (e)=>{
        setData({
            ...data,
            country: e.target.value
        })
        validation({...data, country: e.target.value}, error, setError)
    };

    const handleCity = (e)=>{
        setData({
            ...data,
            city: e.target.value
        })
        validation({...data, city: e.target.value}, error, setError)
    };
    const handlePostalCode = (e)=>{
        setData({
            ...data,
            postalCode: e.target.value
        })
        validation({...data, postalCode: e.target.value}, error, setError)
    };
    const handleDescription = (e)=>{
        setData({
            ...data,
            description: e.target.value
        })
    }

    return (
        <div className={styles.cAddress}>
            <form onSubmit={handleSumbit}>
                
                <h1>Add Address</h1>
                <div className={styles.inputs}>
                <div>
                    <label>Street Address</label>
                    <input type="text" value={data.street} name='street' onChange={handleStreet} placeholder="Street Address..." />
                    <h3>{error.street}</h3>
                </div>
                <br/>
                <div>
                    <label>Country</label>
                    <input type="text" value={data.country} name="country"  onChange={handleCountry} placeholder="Country..."/>
                    <h3>{error.country}</h3>
                </div>
                <br/>
                <div>
                    <label>City</label>
                    <input type="text" value={data.city} name="city" onChange={handleCity} placeholder="City..."/>
                    <h3>{error.city}</h3>
                </div>
                <br/>
                <div>
                    <label>Postal Code</label>
                    <input type="text" value={data.postalCode} name="postalCode" onChange={handlePostalCode} placeholder="Postal Code..."/>
                    <h3>{error.postalCode}</h3>
                </div>
                <br/>
                
                </div>
                <div className={styles.desc}>
                    <label>Description</label>
                    <input type="text" value={data.description} name="description" onChange={handleDescription} placeholder="Description(optional)" />
                </div>
                <br/>
            
                <button type="sumbit" className={styles.butt}>SEND ADDRESS</button>
            </form>
        </div>
    )
}

export default Addreses