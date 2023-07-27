import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getUserId } from "../../../redux/actions";
import { useEffect } from "react";
import style from "./UserOrders.module.css"


const Orders = () => {
    const dispatch = useDispatch();
    const userId = user.id
    useEffect(() => {
      
        dispatch(getAllOrders());
        dispatch(getUserId(userId));
      }, [dispatch, userId]);
      
    const allOrders = useSelector((state) => state.all_Orders); 
    const user = useSelector((state) => state.get_user_id);

    const userOrders = allOrders.filter((order) => order.userId === userId);

    return (
      <div>
        {user && (
          <div>
            <h2 className={style.h2}>Your Orders {user.name}</h2>
          </div>
        )}

        {userOrders.length > 0 ? (
          <div>
            {userOrders.map((order) => (
              <div key={order.id}>
                <ul>
                  {order.OrderProducts.map((orderProduct) => (
                    <div key={orderProduct.id}>
                      <img src={orderProduct.main_picture_url[0]} alt={orderProduct.name} />
                      <p>Product: {orderProduct.name}</p>
                      <p>Quantity: {orderProduct.quantity}</p>
                      <p>Size: {orderProduct.size}</p>
                    </div>
                  ))}
                </ul>
                <h3>Total Amount: {order.total_amount}</h3>
                <h3>{order.description}</h3>
              </div>
            ))}
          </div>
        ) : (
          <h2>No order found for this user</h2>
        )}
      </div>
    );
  };

export default Orders