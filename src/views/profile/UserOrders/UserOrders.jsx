import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getUserId } from "../../../redux/actions";
import { useEffect } from "react";


const Orders = ({userId}) => {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllOrders());
        dispatch(getUserId(userId));
      }, [dispatch, userId]);

      
    const allOrders = useSelector((state) => state.all_Orders); 
    const user = useSelector((state) => state.get_user_id);

  
    const userOrders = allOrders.filter((order) => order.userId === userId);

    return (
        <div>
      <h2>My Orders</h2>
    </div>
    )
}

export default Orders