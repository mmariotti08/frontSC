import { useDispatch, useSelector } from "react-redux"
import { getUsers, updateUser } from "../../redux/actions"
import { useEffect, useState } from "react"
import styles from "./Address.module.css"
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


const Addreses = ()=>{
    const [data, setData]= useState({
        street:"",
        country:"",
        city:"",
        postalCode:0,
        description:""

    });
    const direction={
        address:{
            street: data.street,
            country: data.country,
            city: data.city,
            postalCode: data.postalCode,
            description: data.description
        }
    }
   

    const navigate = useNavigate()
    const user = useUser()
    const users = useSelector((state)=> state.users)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getUsers())
        window.scrollTo(0, 0);
    },[dispatch])
    
    const idUser = users.find(item => item.mail === user.user?.primaryEmailAddress.emailAddress)
    

    const handleSumbit =(e)=>{
        e.preventDefault();
        dispatch(updateUser(idUser.id, direction))
        navigate(`/cart`)
    };
    const handleStreet = (e) => {
        setData({
            ...data,
            street: e.target.value
        })
    };
    const handleCountry = (e)=>{
        setData({
            ...data,
            country: e.target.value
        })
    };

    const handleCity = (e)=>{
        setData({
            ...data,
            city: e.target.value
        })
    };
    const handlePostalCode = (e)=>{
        setData({
            ...data,
            postalCode: e.target.value
        })
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
                </div>
                <br/>
                <div>
                    <label>Country</label>
                    <input type="text" value={data.country} name="country"  onChange={handleCountry} placeholder="Country..."/>
                </div>
                <br/>
                <div>
                    <label>City</label>
                    <input type="text" value={data.city} name="city" onChange={handleCity} placeholder="City..."/>
                </div>
                <br/>
                <div>
                    <label>Postal Code</label>
                    <input type="number" value={data.postalCode} name="postalCode" onChange={handlePostalCode} placeholder="Postal Code..."/>
                </div>
                <br/>
                
               
                </div>
                <div className={styles.desc}>
                    <label>Description</label>
                    <input type="text" value={data.description} name="description" onChange={handleDescription} placeholder="Description(optional)" />
                </div>
                <br/>
            
                <button type="sumbit" className={styles.butt}>sumbbit</button>
            </form>
        </div>
    )
}

export default Addreses