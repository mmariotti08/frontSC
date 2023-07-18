import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser,  } from "@clerk/clerk-react";
import { useDispatch, useSelector  } from "react-redux"
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";
import styles from './BuyButton.module.css'


const BuyButton = ()=>{
    const userss = useSelector((state)=> state.users)
    const user = useUser(true)
    console.log(user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        
        dispatch(getUsers())
    }, [dispatch])

    // const idUser = userss.find(item => item.mail === user.user?.primaryEmailAddress.emailAddress )
    const idUser = userss.length > 0 ? userss.find(item => item.mail === user.user?.primaryEmailAddress.emailAddress) : null;
    

   
    const selectRoute = ()=>{
    if(!user.user){
        return navigate('/login')
    }else if(!idUser.address){
        console.log('fsdfsdf');
        return navigate('/addAddress')
    }else{
        return alert('redirige a compra')
    }
   }
    
    return(
       <button onClick={selectRoute} className={styles.buyB}>Buy</button>
    )

};

export default BuyButton;