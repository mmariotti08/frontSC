import { useNavigate } from "react-router-dom";
import { useSelector  } from "react-redux"
import styles from './BuyButton.module.css'
import axios from 'axios'
import { toast } from "react-toastify";

const BuyButton = ()=>{
    const navigate = useNavigate()

    const { isAuthenticated, user } = useSelector(state => state.auth_token);

    const cardPey = useSelector((state)=> state.cart)
    console.log('a', user);
    const selectRoute = async()=>{
        if(!isAuthenticated){
            toast.success("Log In before continuing");
            // <Login_v2 />
        }else if(!user.address){
            return navigate('/addAddress')
        }else{
            console.log("aqui");
            const response = await axios.post('payment', { cardPey, user })
            console.log(response);
            const info=response.data;
            window.location.href= info.init_point;
        }
    }

    return(
        <button onClick={selectRoute} className={styles.buyB}>BUY NOW</button>
    );
};

export default BuyButton;