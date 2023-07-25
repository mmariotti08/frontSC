import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser,  } from "@clerk/clerk-react";
import { useDispatch, useSelector  } from "react-redux"
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";
import styles from './BuyButton.module.css'
import axios from 'axios'
import Card from "../Card/Card";
import { Login_v2 } from "../../views/new Login/Login v2";

const BuyButton = ()=>{
    const { user } = useSelector(state => state.auth_token);
    console.log(user);
    // const userss = useSelector((state)=> state.users)
    const cardPey = useSelector((state)=> state.cart)
    // const user = useUser(true)
    // console.log(user);
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // useEffect(()=>{
    //     dispatch(getUsers())
    // }, [dispatch])

    // const idUser = userss.length > 0 ? userss.find(item => item.mail === user.user?.primaryEmailAddress.emailAddress) : null;
    
    const selectRoute = async()=>{
        if(!user.user){
            <Login_v2 />
            // return navigate('/login')
        }else if(!user.address){
            return navigate('/addAddress')
        }else{
            const response= await axios.post('http://localhost:3001/payment', { cardPey, user })
            const info=response.data;
            window.location.href= info.init_point;
        }
    }
    
    return(
       <button onClick={selectRoute} className={styles.buyB}>BUY NOW</button>
    );
};

export default BuyButton;