import { Link, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";

const BuyButton =()=>{
    const user = useUser()
    const users = useSelector((state)=> state.users)
    const dispatch = useDispatch()

    const idUser = users.find(item => item.mail === user.user.primaryEmailAddress.emailAddress)
    
    
    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])

   
    const selectRoute = ()=>{
    if(!user){
        return alert('sadasd')
    }else if(!idUser.address){
        return alert('2')
    }else{
        return alert('a comprar papeer')
    }
   }
    
    return(
       <button onClick={selectRoute}>Buy</button>
    )

};

export default BuyButton;