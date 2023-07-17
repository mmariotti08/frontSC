import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector  } from "react-redux"
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";
import styles from './BuyButton.module.css'

const BuyButton =()=>{
    const user = useUser()
    const users = useSelector((state)=> state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const idUser = users.find(item => item.mail === user.user?.primaryEmailAddress.emailAddress)
    
    
    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])

   
    const selectRoute = ()=>{
    if(!user.user){
        return navigate('/login')
    }else if(!idUser.address){
        return navigate('/address')
    }else{
        return alert('a comprar papeer')
    }
   }
    
    return(
       <button onClick={selectRoute} className={styles.buyB}>Buy</button>
    )

};

export default BuyButton;