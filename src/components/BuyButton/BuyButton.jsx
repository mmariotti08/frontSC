import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser,  } from "@clerk/clerk-react";
import { useDispatch, useSelector  } from "react-redux"
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";
import styles from './BuyButton.module.css'


const BuyButton = ()=>{
    const userss = useSelector((state)=> state.users)
    const cart = useSelector((state)=> state.cart)
    
    console.log(cart);


    const user = useUser(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    


    useEffect(()=>{
        
        dispatch(getUsers()  )
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
        return (checkout())
    }
   }
    
    return(
       <button onClick={selectRoute} className={styles.finalize}>Buy Now </button>
    )

};

export default BuyButton;