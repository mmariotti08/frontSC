import { useNavigate } from "react-router-dom";
import { useSelector  } from "react-redux"
import styles from './BuyButton.module.css'
import axios from 'axios'
import { Login_v2 } from "../../views/new Login/Login v2";

const BuyButton = ()=>{
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth_token);
    const cardPey = useSelector((state)=> state.cart)
    
    const selectRoute = async()=>{
        if(!user.user){
            <Login_v2 />
        }else if(!user.address){
            return navigate('/addAddress')
        }else{
            const response= await axios.post('payment', { cardPey, user })
            const info=response.data;
            window.location.href= info.init_point;
        }
    }
    
    return(
        <button onClick={selectRoute} className={styles.buyB}>BUY NOW</button>
    );
};

export default BuyButton;