import { useEffect, useState } from "react";
import { All_Products } from "../../components/Admin/Products/All Products/All Products";
import { Add_Product } from "../../components/Admin/Products/Add Product/Add Product";
import { Edit_Product } from "../../components/Admin/Products/Edit Product/Edit Product";
import { Categories } from "../../components/Admin/Products/Categories/Categories";
import { Stock } from "../../components/Admin/Products/Stock/Stock";
import { Draft } from "../../components/Admin/Products/Draft/Draft";
import { All_Users } from "../../components/Admin/Users/All Users/All Users";
import { User_Draft } from "../../components/Admin/Users/User Draft/User Draft";
import { All_Orders } from "../../components/Admin/Orders/All Orders/All Orders";
import styles from "./Menu.module.css"
import { useDispatch } from "react-redux";
import { paginate } from "../../redux/actions";
import { Redirection } from "../../components/Admin/Others/Redirection/Redirection";
import { Order_Details } from "../../components/Admin/Orders/Order Details/Order Details";

const Menu = () => {
    const menu = [
        { label: "Orders", submenu: ["All orders"] },
        { label: "Products", submenu: ["All products", "Add product", "Categories", "Draft"] },
        { label: "Users", submenu: ["All users", "Banned"] }
    ];

    const [option, setOption] = useState("All products");
    const [productId, setProductId] = useState("");
    const [orderId, setOrderId] = useState("");

    const componentMap = {
        "All products": All_Products,
        "Add product": Add_Product,
        "Categories": Categories,
        "Stock": Stock,
        "Draft": Draft,
        "Edit": Edit_Product,
        "All users": All_Users,
        "Banned": User_Draft,
        "All orders": All_Orders,
        "Order Details": Order_Details
    };

    const ComponentToRender = componentMap[option];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(paginate(1));
        window.scrollTo(0, 0);
    }, [ComponentToRender]);

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                {menu.map(item => (
                    <div key={item.label}>
                        <h3>{item.label}</h3>
                        {item.submenu?.map(submenu => (
                            <button key={submenu} onClick={() => setOption(submenu)}>{submenu}</button>
                        ))}
                    </div>
                ))}
                <div className={styles.redirection}>
                    <Redirection />
                </div>
            </div>
            <div className={styles.components}>
                {ComponentToRender &&
                    <ComponentToRender
                        option={option}
                        setOption={setOption}
                        setProductId={setProductId}
                        productId={productId}
                        setOrderId={setOrderId}
                        orderId={orderId}
                        />
                }
            </div>
        </div>
    );
};

export { Menu };